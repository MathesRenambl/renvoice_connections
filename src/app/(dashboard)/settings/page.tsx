"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Save, Key, Shield, CreditCard, BarChart, Download, HelpCircle } from "lucide-react";
import { useAppContext } from "@/hooks/context";
import { apiHeader } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert/alert";
import { useAlert } from "@/hooks/alertHook";
import { getFromLocalStorage} from "@/components/encryption/encryption";
import ApiKeyPage from '@/components/settings/apiKey';
import { useLogOut } from "@/hooks/useLogout";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import Notification from "@/components/settings/notification";

function getStatusVariant(status: string): BadgeProps["variant"] {
  switch (status.toLowerCase()) {
    case "paid":
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
    case "declined":
      return "destructive";
    default:
      return "secondary"; 
  }
}

interface PlanDetail {
  plan: {
    planName?: string;
    planId?: string;
    planPrice?: string;
    planDuration?: string;
    planStatus?: string;
    planFeatures?: string[];
    planCreatedAt?: string;
    planUpdatedAt?: string;
  };

}

interface Payment {
  paymentId: string;
  orgId: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentDate: string;
  paymentStatus:string;
}



export default function SettingsPage() {
  const { URL, setUserData } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const logOut = useLogOut();
  const header = useMemo(() => apiHeader(), []);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [planDet, setPlanDet] = useState<PlanDetail | null>(null);
  const [tabsValue, setTabsValue] = useState("account");
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const orgId = getFromLocalStorage("orgId");
  const token = getFromLocalStorage("token");

const [enabled, setEnabled] = useState(false);
const [secret, setSecret] = useState('');
const [qrCode, setQrCode] = useState('');
const [otp, setOtp] = useState('');
const [verified, setVerified] = useState(false);

  const handleClick = () => {
    router.push('/plan');
  };

  useEffect(() => {
    const fetchPlanDetails = async () => {
      const token = getFromLocalStorage("token");
      if (!token) {
        throw new Error('Token not found');
      }
      try {
        const orgId = getFromLocalStorage("orgId");
        const response = await fetch(`${URL}/users/${orgId}`, {
          method: 'GET',
          headers: {
            ...header,
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setPlanDet(data);
        if (response.status === 200) {
          setApiSuccess(true);
        } else {
          if (response.status === 401) logOut();
          showAlert(`Server responded with ${response.status}: ${response.statusText}`, "error");
        }
      } catch (error) {
        console.error("API call error:", error);
        showAlert("Something went wrong", "error");
      }
    };
    fetchPlanDetails();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${URL}/payment/getAllPayments`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ orgId: orgId, page, limit })
        });
        if (response.ok) {
          const data = await response.json();
          setPayments(data.payments);
        }
      } catch (err: any) {
        console.error("Error fetching payments:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (tabsValue === "history") {
      fetchPayments();
    }
  }, [tabsValue, URL, orgId, token, page, limit]);

  // const handleToggle = async (value: boolean) => {
  //   setEnabled(value);

  //   if (value) {
  //     // Enable flow — generate secret and QR
  //     const newSecret = speakeasy.generateSecret({ name: 'MyAppName' });
  //     const qr = await QRCode.toDataURL(newSecret.otpauth_url || '');
  //     setSecret(newSecret.base32);
  //     setQrCode(qr);
  //     setVerified(false);
  //   } else {
  //     // Disable flow
  //     setSecret('');
  //     setQrCode('');
  //     setOtp('');
  //     setVerified(false);
  //   }
  // };

  // const handleVerify = () => {
  //   if (!secret) {
  //     showAlert("Secret not generated. Please toggle on 2FA first.", "error");
  //     return;
  //   }

  //   const isValid = speakeasy.totp.verify({
  //     secret,
  //     encoding: 'base32',
  //     token: otp,
  //     window: 1,
  //   });

  //   if (isValid) {
  //     setVerified(true);
  //     showAlert('✅ 2FA enabled and verified', "success");
  //   } else {
  //     showAlert('❌ Invalid OTP', "error");
  //   }
  // };

  const handleToggle = async (checked: boolean) => {
  setEnabled(checked);

  if (checked) {
    const newSecret = speakeasy.generateSecret({ name: 'MyApp' });
    const qr = await QRCode.toDataURL(newSecret.otpauth_url || '');

    console.log("Generated secret:", newSecret.base32);

    setSecret(newSecret.base32);
    setQrCode(qr);
    setOtp('');
    setVerified(false);
  } else {
    setSecret('');
    setQrCode('');
    setOtp('');
    setVerified(false);
  }
};

const handleVerify = () => {
  if (!secret || typeof secret !== 'string') {
    console.error(" Secret is invalid or not set:", secret);
    showAlert("Secret not set. Enable 2FA first.", "error");
    return;
  }

  const isValid = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp,
    window: 1,
  });

  if (isValid) {
    setVerified(true);
    showAlert(" 2FA enabled and verified", "success");
  } else {
    showAlert(" Invalid OTP", "error");
  }
};



  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Alert alert={alert} hideAlert={hideAlert} />
      <Tabs value={tabsValue} onValueChange={setTabsValue} defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing & Usage</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiName">Name</Label>
                  <Input id="apiName" defaultValue="User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc+5:30">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc+0">UTC+0 (London)</SelectItem>
                    <SelectItem value="utc-5">UTC-5 (New York)</SelectItem>
                    <SelectItem value="utc-8">UTC-8 (San Francisco)</SelectItem>
                    <SelectItem value="utc+1">UTC+1 (Paris)</SelectItem>
                    <SelectItem value="utc+5:30">UTC+5:30 (India)</SelectItem>
                    <SelectItem value="utc+8">UTC+8 (Singapore)</SelectItem>
                    <SelectItem value="utc+9">UTC+9 (Tokyo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-4">
          <ApiKeyPage />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Notification />
          {/* <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Email Notifications", "Agent Status Alerts", "Weekly Reports", "Usage Alerts", "Call Recordings"].map((label, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="space-y-0.5">
                    <Label>{label}</Label>
                    <p className="text-sm text-muted-foreground">{`Receive ${label.toLowerCase()}`}</p>
                  </div>
                  <Switch defaultChecked={i !== 2} />
                </div>
              ))}
            </CardContent>
          </Card> */}
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div> */}



           
          {/* Toggle Switch */}
           <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
             <Switch checked={enabled} onCheckedChange={handleToggle} />

            </div>

            {enabled && !verified && (
              <div className="p-4 bg-muted/30 border rounded space-y-4">
                <p className="text-sm font-medium">Scan this QR code:</p>
                {qrCode && <img src={qrCode} alt="QR Code" className="w-40" />}
                <p className="text-sm">Manual code: <code>{secret}</code></p>

                <input
                  className="w-full p-2 border rounded"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white w-full p-2 rounded"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>
            )}


                {/* Verified Message */}
                {verified && (
                  <p className="text-green-600 text-sm font-medium">✅ Two-Factor Authentication is enabled</p>
                )}
      
          
              {/* <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div> */}


              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {planDet && planDet.plan ? (
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{planDet.plan.planName || 'No Plan'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {planDet.plan.planPrice ? `${planDet.plan.planPrice}/${planDet.plan.planDuration}` : '—'}
                      </p>
                    </div>
                    <Badge variant={planDet.plan.planStatus === 'Active' ? 'success' : 'secondary'}>
                      {planDet.plan.planStatus || 'Inactive'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next billing date:</span>
                      <span className="font-medium">
                        {planDet.plan.planUpdatedAt
                          ? new Date(planDet.plan.planUpdatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment method:</span>
                      <span className="font-medium">Visa ending in 4242</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground mb-4">Loading plan details...</div>
              )}

              <div className="flex gap-2 mb-6">
                <Button variant="outline" className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleClick}>
                  Change Plan
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage & Limits</CardTitle>
                  <CardDescription>Monitor your current usage and limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[{
                    label: "Phone Minutes",
                    usage: "350/500 minutes",
                    percent: 70
                  }, {
                    label: "API Calls",
                    usage: "8,540/10,000 calls",
                    percent: 85
                  }, {
                    label: "Storage",
                    usage: "2.1/5 GB",
                    percent: 42
                  }, {
                    label: "Active Agents",
                    usage: "3/5 agents",
                    percent: 60
                  }].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <Label>{item.label}</Label>
                        <span className="text-sm font-medium">{item.usage}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Detailed Usage
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <HelpCircle className="h-4 w-4" />
                    <span>Need more resources?</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto">Contact Support</Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View a record of all your past payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(!payments || payments.length === 0) ? (
                <p className="text-gray-600 mt-6">No payment history available.</p>
              ) : (
                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 w-48">Payment ID</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Method</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.paymentId}>
                          <td className="py-2 px-4 w-48 truncate">{payment.paymentId}</td>
                          <td className="py-2 px-4">₹{payment.paymentAmount}</td>
                          <td className="py-2 px-4 capitalize">{payment.paymentMethod}</td>
                          <td className="py-2 px-4 text-red-600">
                            <Badge variant={getStatusVariant(payment.paymentStatus)}>
                              {payment.paymentStatus}
                            </Badge>
                          </td>
                          <td className="py-2 px-4">
                            {new Date(payment.paymentDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      
        <Alert
          alert={alert}
          hideAlert={hideAlert}
        />
    </div>
  );
}

