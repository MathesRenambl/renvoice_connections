

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
import { Facebook, Twitter, Linkedin, Instagram, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLogOut } from "@/hooks/useLogout";

interface UserProfile {
  name: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  volumeCount: number;
  companySize: string;
  companyType: string;
  companyAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    area: string;
  };
  directorName: string;
  directorPhone: string;
  directorEmail: string;
  directorProof: string;
  companyProof: string;
  taxRegistration: string;
  certOfIncorporation: string;
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

const Page = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const { URL } = useAppContext();
  const logOut = useLogOut();
  const router = useRouter();
  const header = useMemo(() => apiHeader(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!header) {
        logOut();
        return;
      }
      const orgId = getFromLocalStorage("orgId");
      try {
        const response = await fetch(`${URL}/users/${orgId}`, {
          method: "GET",
          headers: header,
        });
        if (!response.status || response.status !== 200) {
          if (response.status === 401) {
            logOut();
          }
          showAlert(`Server responded with ${response.status}: ${response.statusText}`, "error");
          return;
        }
        const data: UserProfile = await response.json();
        setUser(data);
      } catch (err: any) {
        showAlert(err.message || "Something went wrong.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    // fetchProfile();
  }, []);

  const getInitial = (name: string) => name?.charAt(0).toUpperCase();


  const renderFileLink = (label: string, url?: string) => (
    url ? (
      <div className="text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex flex-col items-center justify-center gap-2 text-sm text-gray-800 hover:text-indigo-600"
        >
          <FileText className="w-8 h-8 text-gray-700" />
          {label}
        </a>
      </div>
    ) : (
      <div className="text-center text-sm text-gray-400">{label} not available</div>
    )
  );

  return (
    <div className="border border-gray-300 shadow-sm bg-transparent px-10 min-h-screen py-10">
      <Container>
        <PageTitle title="Profile" description="Information about the user" />
        {/* {isLoading ? (
          <div className="text-center py-10 text-black animate-pulse">Loading profile...</div>
        ) : ( */}
          user && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-indigo-300">
                    <span className="text-3xl font-extrabold text-white drop-shadow">
                      {getInitial(user.companyName)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-black">{user.companyName}</h2>
                    <h2 className="text-sm text-gray-500">{user.companyEmail}</h2>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </a>
                  ))}
                </div>
              </div>
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <Tabs defaultValue="company" className="w-full">
                    <TabsList className="flex w-full justify-between bg-gray-100 p-1.5 rounded-lg gap-2">
                      {[
                        { tab: "company", label: "Company Info" },
                        { tab: "director", label: "Director Info" },
                        { tab: "plan", label: "Plan Details" },
                        { tab: "documents", label: "Documentation" },
                      ].map(({ tab, label }) => (
                        <TabsTrigger
                          key={tab}
                          value={tab}
                          className="flex-1 py-2 rounded-md text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-200 transition"
                        >
                          {label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                     <TabsContent value="company" className="mt-6">
                       <div className="grid md:grid-cols-2 gap-6 mb-8">
                         <div>
                           <h3 className="text-sm font-medium text-black">Company Name</h3>
                           <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.companyName}</p>
                         </div>
                         <div>
                           <h3 className="text-sm font-medium text-black">Company Email</h3>
                         <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.companyEmail}</p>
                         </div>
                         <div>
                           <h3 className="text-sm font-medium text-black">Phone</h3>
                           <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.companyPhone}</p>
                         </div>
                           <div>
                           <h3 className="text-sm font-medium text-black">Company Type</h3>
                           <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.companyType}</p>
                         </div>
                           <div>
                           <h3 className="text-sm font-medium text-black">Company Size</h3>
                           <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.companySize}</p>
                         </div>
                           <div>
                           <h3 className="text-sm font-medium text-black">Company Count</h3>
                           <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.volumeCount}</p>
                         </div>
                         <div>
                          <h3 className="text-sm font-medium text-black">Website</h3>
                           <a
                            href={user.companyWebsite}
                            target="_blank"
                            className="mt-1 text-sm text-indigo-600 hover:underline block"
                          >
                            {user.companyWebsite}
                          </a>
                        </div>
                      </div>
                      <div className="border rounded-md p-4 bg-gray-200">
                        <h3 className="text-md font-semibold text-black mb-3">Company Address</h3>
                        <p className="text-sm text-gray-800">
                          {user.companyAddress.street}, {user.companyAddress.area},<br />
                          {user.companyAddress.city} - {user.companyAddress.zipCode},<br />
                          {user.companyAddress.state}, {user.companyAddress.country}
                        </p>
                      </div>
                    </TabsContent>

                     <TabsContent value="director" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-black">Director Name</h3>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.directorName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black">Director Email</h3>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.directorEmail}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black">Director Phone</h3>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.directorPhone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black">Director Proof</h3>
                          {renderFileLink("Director Proof", user.directorProof)}</div>
                      </div>
                    </TabsContent>

                    
<TabsContent value="plan" className="mt-6">
                       {user.plan && Object.keys(user.plan).length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-black">Plan Name</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.plan.planName || "N/A"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Plan ID</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.plan.planId || "N/A"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Price</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.plan.planPrice || "N/A"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Duration</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.plan.planDuration || "N/A"}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-black">Status</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">{user.plan.planStatus || "N/A"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Features</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">
                                {user.plan.planFeatures?.length ? user.plan.planFeatures.join(", ") : "N/A"}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Created At</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">
                                {new Date(user.plan.planCreatedAt).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-black">Updated At</h3>
                              <p className="mt-1 text-sm text-gray-900 bg-gray-200 p-3 rounded-md">
                                {new Date(user.plan.planUpdatedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="mt-3 text-sm font-medium text-gray-900">No active plan</h3>
                          <p className="mt-1 text-sm text-black">Get started by selecting a plan that fits your needs.</p>
                        </div>
                      )}
                    </TabsContent>
<TabsContent value="documents" className="mt-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>{renderFileLink("Company Proof", user.companyProof)}</div>
                        <div>{renderFileLink("Tax Registration", user.taxRegistration)}</div>
                        <div>{renderFileLink("Certificate of Incorporation", user.certOfIncorporation)}</div>
                       
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )
        {/* )} */}
        <Alert alert={alert} hideAlert={hideAlert} />
      </Container>
    </div>
  );
};

export default Page;
