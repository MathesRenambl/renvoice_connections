"use client";
import React, { useState } from "react";
import Container from "@/components/ui/container";
import PageTitle from "@/components/ui/pageTitle";
import { useAppContext } from "@/hooks/context";
import { getFromLocalStorage } from "@/components/encryption/encryption";
import Alert from "@/components/alert/alert";
import { useAlert } from "@/hooks/alertHook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Edit3, Save, X, Coins, DollarSign, Bolt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
}

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountName: string;
  bankName?: string;
}

const Page = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const { URL } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>({
    firstName: "Gokul",
    lastName: "Technology",
    email: "gokulTech@gt.com",
    organization: "Gokul Technology"
  });
  const [creditPoints, setCreditPoints] = useState<number>(1250); // Sample credit points
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "1234567890123456",
    ifscCode: "HDFC0001234",
    accountName: "Gokul Technology",
    bankName: "HDFC Bank"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    organization: ""
  });

  const [bankForm, setBankForm] = useState<BankDetails>({
    accountNumber: "",
    ifscCode: "",
    accountName: "",
    bankName: ""
  });

  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountName?: string;
  }>({});

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const validateForm = () => {
    const errors: typeof formErrors = {};
    
    if (!editForm.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!editForm.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBankForm = () => {
    const errors: typeof formErrors = {};
    
    if (!bankForm.accountNumber.trim()) {
      errors.accountNumber = "Account number is required";
    } else if (bankForm.accountNumber.length < 9 || bankForm.accountNumber.length > 18) {
      errors.accountNumber = "Account number must be between 9-18 digits";
    }
    
    if (!bankForm.ifscCode.trim()) {
      errors.ifscCode = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankForm.ifscCode)) {
      errors.ifscCode = "Invalid IFSC code format";
    }

    if (!bankForm.accountName.trim()) {
      errors.accountName = "Account name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditProfile = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    const userId = getFromLocalStorage("userId");
    
    try {
      const response = await fetch(`${URL}/users/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: editForm.firstName,
          lastName: editForm.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      showAlert("Profile updated successfully!", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBankDetails = async () => {
    if (!validateBankForm()) return;

    setIsSaving(true);
    const userId = getFromLocalStorage("userId");
    
    try {
      const response = await fetch(`${URL}/users/bank-details/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankForm),
      });

      if (!response.ok) {
        throw new Error(`Failed to update bank details: ${response.statusText}`);
      }

      const updatedBankDetails = await response.json();
      setBankDetails(updatedBankDetails);
      setIsEditingBank(false);
      showAlert("Bank details updated successfully!", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to update bank details", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(user || { firstName: "", lastName: "", email: "", organization: "" });
    setFormErrors({});
  };

  const cancelBankEdit = () => {
    setIsEditingBank(false);
    setBankForm(bankDetails);
    setFormErrors({});
  };

  const startEditingProfile = () => {
    setIsEditing(true);
    setEditForm(user || { firstName: "", lastName: "", email: "", organization: "" });
  };

  const startEditingBank = () => {
    setIsEditingBank(true);
    setBankForm(bankDetails);
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    const lastFour = accountNumber.slice(-4);
    const masked = '*'.repeat(accountNumber.length - 4);
    return masked + lastFour;
  };

  return (
    <div className="border border-gray-300 shadow-sm bg-transparent px-10 min-h-screen py-10 rounded-md">
      <Container>
        <PageTitle title="Profile" description="Manage your account information" />
        {isLoading ? (
          <div className="text-center py-10 text-black animate-pulse">Loading profile...</div>
        ) : (
          user && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-extrabold text-white drop-shadow">
                      {getInitials(user.firstName, user.lastName)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-black">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-400">{user.organization}</p>
                  </div>
                </div>
                
                {/* Credit Points Display */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-4 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-20 rounded-full p-2">
                      <Coins className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90">Credit Points</p>
                      <p className="text-2xl font-bold">{creditPoints.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mt-2">Use points to buy new connections</p>
                </div>
              </div>

              {/* Profile Content */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="flex w-full justify-between bg-gray-100 p-1.5 rounded-lg gap-2">
                      <TabsTrigger
                        value="profile"
                        className="flex-1 py-2 rounded-md text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200 transition"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="bank"
                        className="flex-1 py-2 rounded-md text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200 transition"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Bank Details
                      </TabsTrigger>
                    </TabsList>

                    {/* Profile Info Tab */}
                    <TabsContent value="profile" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-black">Personal Information</h3>
                          {!isEditing && (
                            <button
                              onClick={startEditingProfile}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit Profile
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-black">First Name</label>
                            {isEditing ? (
                              <div>
                                <input
                                  type="text"
                                  value={editForm.firstName}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                                  className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter first name"
                                />
                                {formErrors.firstName && (
                                  <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.firstName}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">Last Name</label>
                            {isEditing ? (
                              <div>
                                <input
                                  type="text"
                                  value={editForm.lastName}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                                  className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter last name"
                                />
                                {formErrors.lastName && (
                                  <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.lastName}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">Email</label>
                            <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.email}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">Organization</label>
                            <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.organization}</p>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleEditProfile}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
                            >
                              <Save className="w-4 h-4" />
                              {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Bank Details Tab */}
                    <TabsContent value="bank" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-black">Bank Account Information</h3>
                          {!isEditingBank && (
                            <button
                              onClick={startEditingBank}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit Bank Details
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-black">Account Number</label>
                            {isEditingBank ? (
                              <div>
                                <input
                                  type="text"
                                  value={bankForm.accountNumber}
                                  onChange={(e) => setBankForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                                  className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter account number"
                                />
                                {formErrors.accountNumber && (
                                  <p className="mt-1 text-sm text-red-600">{formErrors.accountNumber}</p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md font-mono">
                                {maskAccountNumber(bankDetails.accountNumber)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">IFSC Code</label>
                            {isEditingBank ? (
                              <div>
                                <input
                                  type="text"
                                  value={bankForm.ifscCode}
                                  onChange={(e) => setBankForm(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                                  className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter IFSC code"
                                />
                                {formErrors.ifscCode && (
                                  <p className="mt-1 text-sm text-red-600">{formErrors.ifscCode}</p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md font-mono">
                                {bankDetails.ifscCode}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">Account Name</label>
                            {isEditingBank ? (
                              <div>
                                <input
                                  type="text"
                                  value={bankForm.accountName}
                                  onChange={(e) => setBankForm(prev => ({ ...prev, accountName: e.target.value }))}
                                  className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter account holder name"
                                />
                                {formErrors.accountName && (
                                  <p className="mt-1 text-sm text-red-600">{formErrors.accountName}</p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">
                                {bankDetails.accountName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-black">Bank Name</label>
                            {isEditingBank ? (
                              <input
                                type="text"
                                value={bankForm.bankName}
                                onChange={(e) => setBankForm(prev => ({ ...prev, bankName: e.target.value }))}
                                className="mt-1 w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter bank name (optional)"
                              />
                            ) : (
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">
                                {bankDetails.bankName || "Not specified"}
                              </p>
                            )}
                          </div>
                        </div>

                        {isEditingBank && (
                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleEditBankDetails}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
                            >
                              <Save className="w-4 h-4" />
                              {isSaving ? "Saving..." : "Save Bank Details"}
                            </button>
                            <button
                              onClick={cancelBankEdit}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        )}

                        {!isEditingBank && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                <Bolt className="w-5 h-5 text-blue-600 mt-0.5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-blue-900">About Credit Points</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                  Your credit points can be used to purchase new connections on the platform. 
                                  Each connection purchase will deduct points from your balance. You can buy more 
                                  credit points through purchase them directly.
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-sm">
                                  <span className="text-blue-600 font-medium">Current Balance:</span>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                                    {creditPoints.toLocaleString()} points
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )
        )}
        <Alert alert={alert} hideAlert={hideAlert} />
      </Container>
    </div>
  );
};

export default Page;