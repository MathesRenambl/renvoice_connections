"use client";
import React, { useState, useEffect, useMemo } from "react";
import Container from "@/components/ui/container";
import PageTitle from "@/components/ui/pageTitle";
import { useAppContext } from "@/hooks/context";
import { apiHeader } from "@/lib/utils";
import { getFromLocalStorage } from "@/components/encryption/encryption";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert/alert";
import { useAlert } from "@/hooks/alertHook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Edit3, Save, X, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLogOut } from "@/hooks/useLogout";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Page = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const { URL } = useAppContext();
  const logOut = useLogOut();
  const router = useRouter();
//   const header = useMemo(() => apiHeader(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>({
    firstName: "Gokul",
    lastName: "Technology",
    email: "gokulTech@gt.com",
    organization: "Gokul Technology"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Form states
  const [editForm, setEditForm] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    organization: ""
  });

  const [passwordForm, setPasswordForm] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    // const fetchProfile = async () => {
    //   if (!header) {
    //     logOut();
    //     return;
    //   }
    //   const userId = getFromLocalStorage("userId"); // Assuming you store userId
    //   try {
    //     const response = await fetch(`${URL}/users/profile/${userId}`, {
    //       method: "GET",
    //       headers: header,
    //     });
    //     if (!response.ok) {
    //       if (response.status === 401) {
    //         logOut();
    //       }
    //       showAlert(`Server responded with ${response.status}: ${response.statusText}`, "error");
    //       return;
    //     }
    //     const data: UserProfile = await response.json();
    //     setUser(data);
    //     setEditForm(data);
    //   } catch (err: any) {
    //     showAlert(err.message || "Something went wrong.", "error");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchProfile();
  }, []);

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

  const validatePasswordForm = () => {
    const errors: typeof formErrors = {};
    
    if (!passwordForm.newPassword) {
      errors.password = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
          ...header,
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

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    setIsSaving(true);
    const userId = getFromLocalStorage("userId");
    
    try {
      const response = await fetch(`${URL}/users/change-password/${userId}`, {
        method: "PUT",
        headers: {
          ...header,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to change password: ${response.statusText}`);
      }

      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      showAlert("Password changed successfully!", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to change password", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(user || { firstName: "", lastName: "", email: "", organization: "" });
    setFormErrors({});
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setFormErrors({});
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="border border-gray-300 shadow-sm bg-transparent px-10 min-h-screen py-10">
      <Container>
        <PageTitle title="Profile" description="Manage your account information" />
        {isLoading ? (
          <div className="text-center py-10 text-black animate-pulse">Loading profile...</div>
        ) : (
          user && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
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
                        value="password"
                        className="flex-1 py-2 rounded-md text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200 transition"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </TabsTrigger>
                    </TabsList>

                    {/* Profile Info Tab */}
                    <TabsContent value="profile" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-black">Personal Information</h3>
                          {!isEditing && (
                            <button
                              onClick={() => setIsEditing(true)}
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

                    {/* Change Password Tab */}
                    <TabsContent value="password" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-black">Bank Details</h3>
                          {!isChangingPassword && (
                            <button
                              onClick={() => setIsChangingPassword(true)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
                            >
                              <Lock className="w-4 h-4" />
                              Bank Details
                            </button>
                          )}
                        </div>

                        {isChangingPassword ? (
                          <div className="space-y-4 max-w-md">
                            <div>
                              <label className="text-sm font-medium text-black">Current Password</label>
                              <div className="relative mt-1">
                                <input
                                  type={showPasswords.current ? "text" : "password"}
                                  value={passwordForm.currentPassword}
                                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                  className="w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 pr-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter current password"
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('current')}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showPasswords.current ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium text-black">New Password</label>
                              <div className="relative mt-1">
                                <input
                                  type={showPasswords.new ? "text" : "password"}
                                  value={passwordForm.newPassword}
                                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                  className="w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 pr-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('new')}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showPasswords.new ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                </button>
                              </div>
                              {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                              )}
                            </div>

                            <div>
                              <label className="text-sm font-medium text-black">Confirm New Password</label>
                              <div className="relative mt-1">
                                <input
                                  type={showPasswords.confirm ? "text" : "password"}
                                  value={passwordForm.confirmPassword}
                                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                  className="w-full text-sm text-gray-900 bg-white border border-gray-300 p-3 pr-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Re-enter new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('confirm')}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showPasswords.confirm ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                </button>
                              </div>
                              {formErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                              )}
                            </div>

                            <div className="flex gap-3 pt-4">
                              <button
                                onClick={handleChangePassword}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
                              >
                                <Save className="w-4 h-4" />
                                {isSaving ? "Changing..." : "Change Password"}
                              </button>
                              <button
                                onClick={cancelPasswordChange}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                              <Lock className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="mt-3 text-sm font-medium text-gray-900">Password Security</h3>
                            <p className="mt-1 text-sm text-black">Keep your account secure by changing your password regularly.</p>
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

