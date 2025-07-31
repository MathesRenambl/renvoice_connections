// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";

// import Alert from "@/components/alert/alert";
// import { useAlert } from '@/hooks/alertHook';
// import { apiHeader } from "@/lib/utils";
// import { useAppContext } from "@/hooks/context";
// import { getFromLocalStorage } from "@/components/encryption/encryption";
// import { useLogOut } from '@/hooks/useLogout';

// const Notification = () => {
  
//     const header = apiHeader();// Replace with actual orgId (can be from context or props)
//   const preferenceKeys = [
//     "emailNotifications",
//     "agentStatusAlerts",
//     "weeklyReports",
//     "usageAlerts",
//     "callRecordings",
//   ];

//   const preferenceLabels = [
//     "Email Notifications",
//     "Agent Status Alerts",
//     "Weekly Reports",
//     "Usage Alerts",
//     "Call Recordings",
//   ];
// const { URL } = useAppContext();
//   const [activeTab, setActiveTab] = useState("notifications");
//   const [preferences, setPreferences] = useState<Record<string, boolean>>({});
//    const { alert, showAlert, hideAlert } = useAlert();
//    const [isLoading, setIsLoading] = useState(true);
//     const logOut = useLogOut();
   

//   const fetchPreferences = async () => {
//     try {
//          const orgId = getFromLocalStorage("orgId");
//       const res = await fetch(`${URL}/users/getNotification`,{
//         method: "POST",
//         headers: header,
//         body: JSON.stringify({ orgId}),
//       });
//       const data = await res.json();
//       setPreferences(data?.notifications || {});
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "notifications") {
//       fetchPreferences();
//     }
//   }, [activeTab]);

//   return (
//     <Tabs
//       defaultValue="notifications"
//       className="w-full"
//       onValueChange={(value) => setActiveTab(value)}
//     >
//       <TabsList className="mb-4">
//         <TabsTrigger value="notifications">Notifications</TabsTrigger>
//         {/* Add other tabs here */}
//       </TabsList>

//       <TabsContent value="notifications" className="space-y-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Notification Preferences</CardTitle>
//             <CardDescription>
//               Configure how you receive notifications
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {preferenceLabels.map((label, i) => {
//               const key = preferenceKeys[i];
//               return (
//                 <div className="flex items-center justify-between" key={key}>
//                   <div className="space-y-0.5">
//                     <Label>{label}</Label>
//                     <p className="text-sm text-muted-foreground">
//                       {`Receive ${label.toLowerCase()}`}
//                     </p>
//                   </div>
//                   <Switch checked={preferences?.[key] || false} />
//                 </div>
//               );
//             })}
//           </CardContent>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default Notification;


"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import Alert from "@/components/alert/alert";
import { useAlert } from '@/hooks/alertHook';
import { apiHeader } from "@/lib/utils";
import { useAppContext } from "@/hooks/context";
import { getFromLocalStorage } from "@/components/encryption/encryption";
import { useLogOut } from '@/hooks/useLogout';

const Notification = () => {
  const header = apiHeader();
  const { URL } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const [activeTab, setActiveTab] = useState("notifications");
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const logOut = useLogOut();

  const orgId = getFromLocalStorage("orgId");

  const preferenceKeys = [
    "emailNotifications",
    "agentStatusAlerts",
    "weeklyReports",
    "usageAlerts",
    "callRecordings",
  ];

  const preferenceLabels = [
    "Email Notifications",
    "Agent Status Alerts",
    "Weekly Reports",
    "Usage Alerts",
    "Call Recordings",
  ];

  const keyMapping: Record<string, string> = {
    emailNotifications: "emailNotification",
    agentStatusAlerts: "agentAlerts",
    weeklyReports: "weeklyReports",
    usageAlerts: "usageAlerts",
    callRecordings: "callRecordings",
  };

  const fetchPreferences = async () => {
     if (!header) {
      logOut();
      return;
    }
    try {
      const res = await fetch(`${URL}/users/getNotification`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({ orgId }),
      });
      const data = await res.json();
      setPreferences(data?.notifications || {});
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const updatePreference = async (key: string, value: boolean) => {
     if (!header) {
      logOut();
      return;
    }
    if (!orgId) {
      showAlert("Organization ID not found", "error");
      return;
    }
    try {
      const updatedPreferences = {
        emailNotification: preferences.emailNotifications ?? false,
        smsNotification: false, // optional: include if used by your backend
        agentAlerts: preferences.agentStatusAlerts ?? false,
        weeklyReports: preferences.weeklyReports ?? false,
        usageAlerts: preferences.usageAlerts ?? false,
        callRecordings: preferences.callRecordings ?? false,
        [keyMapping[key]]: value, // override only the changed key
        orgId,
      };

      const res = await fetch(`${URL}/users/updateNotification`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(updatedPreferences),
      });

      if (!res.ok) {
        throw new Error("Failed to update preference");
      }

      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));

      showAlert("Notification preference updated", "success");
    } catch (error) {
      console.error("Update failed:", error);
      showAlert("Failed to update preference", "error");
    }
  };

  useEffect(() => {
    if (activeTab === "notifications") {
      fetchPreferences();
    }
  }, [activeTab]);

  return (
    <>
      {/* {alert && <Alert {...alert} onClose={hideAlert} />} */}
      <Tabs
        defaultValue="notifications"
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {preferenceLabels.map((label, i) => {
                const key = preferenceKeys[i];
                return (
                  <div className="flex items-center justify-between" key={key}>
                    <div className="space-y-0.5">
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {`Receive ${label.toLowerCase()}`}
                      </p>
                    </div>
                    <Switch
                      checked={preferences?.[key] || false}
                      onCheckedChange={(checked) => updatePreference(key, checked)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Notification;
