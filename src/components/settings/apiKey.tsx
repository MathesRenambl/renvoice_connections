"use client";
import React, { useState, useEffect } from 'react';
import {
  
  Copy, Trash2, Plus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {
  TabsContent} from "@/components/ui/tabs";



import Alert from "@/components/alert/alert";
import { useAlert } from '@/hooks/alertHook';
import { apiHeader } from "@/lib/utils";
import { useAppContext } from "@/hooks/context";
import { getFromLocalStorage } from "@/components/encryption/encryption";
import Modal from '@/components/Modal/modal';
import APIForm from '@/components/settings/apiForm';
import { useLogOut } from '@/hooks/useLogout';

type ApiKey = {
  apiName: string;
  apiKey: string;
  updated_at: string;
  apiExpiry: string;
  apiDescription: string;
};

function ApiKeyPage() {
  const { URL } = useAppContext();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [tabsValue, setTabsValue] = useState("account");
  const [formData, setFormData] = useState({
    apiName: "",
    apiDescription: "",
    apiExpiry: ""
  });
  const header = apiHeader();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ApiKey | null>(null);
  const [createdApiName, setCreatedApiName] = useState<string | null>(null);
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);
  const logOut = useLogOut();

  const handleDelete = async (apiKey: string) => {
    if (!header) {
      logOut();
      return;
    }

    setApiKeys(prevKeys => prevKeys.filter(k => k.apiKey !== apiKey));

    try {
      const orgId = getFromLocalStorage("orgId");
      const response = await fetch(`${URL}/users/deleteAPI`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({ orgId, apiKey }),
      });

      if (!response.ok) {
        showAlert(`Failed to delete API Key: ${response.statusText}`, "error");
        await fetchApiKeys();
        return;
      }

      if (response.status === 204) {
        showAlert("API Key deleted successfully.", "success");
        await fetchApiKeys();
        return;
      }

      if (response.status === 404) {
        showAlert("API Key not found.", "error");
        return;
      }

      if (response.status === 401) {
        logOut();
        return;
      }
    } catch (err: any) {
      showAlert(err.message || "Error deleting API key.", "error");
      await fetchApiKeys();
    }
  };


const handleCopy = (apiKey: string) => {
  console.log("Copying API Key:", apiKey);
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(apiKey).then(() => {
      showAlert("API Key copied to clipboard.", "success");
    }).catch((err) => {
      console.error("Clipboard copy failed:", err);
      showAlert("Failed to copy API Key.", "error");
    });
  } else {
    // Fallback method
    const textArea = document.createElement("textarea");
    textArea.value = apiKey;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showAlert("API Key copied to clipboard (fallback).", "success");
  }
};


  const handleCreateApiKey = async (formValue: any) => {
    setDialogOpen(false);
    if (!header) {
      logOut();
      return;
    }

    const orgId = getFromLocalStorage("orgId");

    try {
      const response = await fetch(`${URL}/users/createAPI`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({ orgId, ...formValue }),
      });

      if (response.status === 401 || response.status === 403) {
        logOut();
        return;
      }

      const data = await response.json();
console.log("Create API Response:", data); // ✅ Check if data.apiKey exists

      if (response.status === 200 || response.status === 201) {
        setApiKeys(data.apiKeys || []);
        await fetchApiKeys();
        setCreatedApiName(formValue.apiName);
        setCreatedApiKey(data.apiKey);
      }
    } catch (error: any) {
      console.error("API creation failed:", error);
      showAlert(error.message || "Failed to create API Key.", "error");
    }
  };

  async function fetchApiKeys() {
    if (!header) {
      logOut();
      return;
    }

    const orgId = getFromLocalStorage("orgId");

    try {
      const response = await fetch(`${URL}/users/getAPI/${orgId}`, {
        method: "GET",
        headers: header,
      });

      if (!response.ok) {
        if (response.status === 401) {
          logOut();
        }
        showAlert(`Server responded with ${response.status}: ${response.statusText}`, "error");
        return;
      }

      const data = await response.json();
      if (response.status === 200) {
        setApiKeys(data.apiKeys || []);
        console.log("Fetched API Keys:", data);
      } else {
        showAlert(`Unexpected response status: ${response.status}`, "error");
      }
    } catch (err: any) {
      showAlert(err.message || "Something went wrong.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApiKeys();
  }, []);

  function maskApiKey(key: string): string {
    if (key.length <= 8) return key;
    const start = key.slice(0, 4);
    const end = key.slice(-4);
    return `${start}•••${end}`;
  }

  return (
    <div className="p-6">
      {/* Tabs trigger can be outside depending on usage */}
       

        <TabsContent value="api" className="space-y-4">
          <div className="flex justify-end py-4 -mt-20">
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create API Key
            </Button>
          </div>

          {/* Success Modal */}
         

          <Modal
  open={!!createdApiKey}
  onClose={() => {
    setCreatedApiKey(null);
    setCreatedApiName(null);
  }}
  title="API Key Created"
  description="Your API Key was created successfully."
>
  {createdApiKey ? (
    <div className="max-w-xl w-full space-y-4">
      <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-md text-green-800 text-sm">
        <div className="flex items-center justify-between font-mono bg-white border border-green-200 rounded px-3 py-2">
          <span className="truncate">{createdApiKey}</span>
          <Button
            size="sm"
            variant="outline"
            className="ml-4"
            onClick={() => {
              navigator.clipboard.writeText(createdApiKey || "");
              showAlert("API Key copied to clipboard.", "success");
            }}
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">
          This key will only be shown once. Please copy and store it securely.
        </span>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setCreatedApiKey(null);
            setCreatedApiName(null);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  ) : (
    <div className="text-sm text-muted-foreground p-4">
      No API key returned.
    </div>
  )}
</Modal>


          {/* Create Modal */}
          <Modal
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Create API Key"
            description="Generate a new API key for your account"
          >
            <APIForm
              defaultValues={formData}
              onSubmit={handleCreateApiKey}
            />
          </Modal>

          {/* Delete Modal */}
          <Modal
            open={!!deleteTarget}
            onClose={() => setDeleteTarget(null)}
            title="Delete API Key"
            description={`Are you sure you want to delete "${deleteTarget?.apiName}"? This action cannot be undone.`}
          >
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteTarget) {
                    handleDelete(deleteTarget.apiKey);
                    setDeleteTarget(null);
                  }
                }}
              >
                Confirm Delete
              </Button>
            </div>
          </Modal>

          {/* API Keys Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for external services
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <div className="overflow-x-auto px-4 pb-4">
              <table className="min-w-full text-sm text-left">
                <thead className="text-xs uppercase text-muted-foreground border-b">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Secret Key</th>
                    <th className="py-2 px-4">Created</th>
                    <th className="py-2 px-4">Expiry Date</th>
                    <th className="py-2 px-4 text-right">Actions</th>
                  </tr>
                </thead>
              
                <tbody>
  {apiKeys.length === 0 ? (
    <tr>
      <td colSpan={5} className="py-6 text-center text-muted-foreground">
        No API keys found.
      </td>
    </tr>
  ) : (
    apiKeys.map((key) => (
      <tr key={key.apiKey} className="border-b hover:bg-muted/50 transition">
        <td className="py-2 px-4 font-medium">{key.apiName}</td>
        <td className="py-2 px-4">{maskApiKey(key.apiKey)}</td>
        <td className="py-2 px-4">
          {new Date(key.updated_at).toISOString().split("T")[0]}
        </td>
        <td className="py-2 px-4">{key.apiExpiry}</td>
        <td className="py-2 px-4 text-right space-x-2">
        
          <Button variant="ghost" size="icon" onClick={() => handleCopy(key.apiKey)}>
  <Copy className="h-4 w-4" />
</Button>

          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(key)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </td>
      </tr>
    ))
  )}
</tbody>

              </table>
            </div>
          </Card>
        </TabsContent>
      <Alert alert={alert} hideAlert={hideAlert} />
    </div>
  );
}

export default ApiKeyPage;
