"use client";

import React, { useState ,useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RingSettingsSection from "./RingSettingsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  FileText, 
  Plus, 
  Trash2, 
  Phone, 
  MessageSquare, 
  Shield, 
  BarChart3,
  Wrench,
  Globe
} from "lucide-react";

import AgentInfoSection from "./AgentInfoSection";
import LanguageSection from "./LanguageSection";
import TagsSection from "./TagsSection";
import LLMConfigSection from "./LLMConfigSection";
import TTSConfigSection from "./TTSConfigSection";
import S2TTConfigSection from "./S2TTConfigSection";
import IVRConfigSection from "./IVRConfigSection";
import MessagesSection from "./MessagesSection";
import ToolSection from "./ToolSection";
import KnowledgeSection from "./KnowledgeSection";
import { useAppContext } from "@/hooks/context";
import { useParams } from "next/navigation";
import { getFromLocalStorage } from "@/components/encryption/encryption";
// Define types for props (simplified, expand as needed)
type MyAgentsFormProps = {
  formData?: any;
  agentData?: any;
};

export function MyAgentsForm({  }: MyAgentsFormProps) {
  // Separate state for schema/options (formData) and user values (agentData)
  const{URL}=useAppContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<any>(null); // schema/options, static
  const [agentData, setAgentData] = useState<any>(null); // user values, editable
  const [validationErrors, setValidationErrors] = useState<any>({});

  // Accept via props, fallback to dummy data for local dev
  const fallbackFormData = {};
  const fallbackAgentData = {};

  const {id}=useParams()
  console.log("id :",id);

  useEffect(() => {
    async function fetchData() {
      console.log("id :",id);
      if(!id){
        return;
      }
      setLoading(true);
      setError("");
      try {
        let token = getFromLocalStorage("token");
        // Simulate fetching both schema and user data
        const response = await fetch(`${URL}/agents/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const apiJson = await response.json();
        // Expecting { formData: {...}, agentData: {...} }
        setFormData(apiJson.formData || fallbackFormData);
        setAgentData((apiJson.agentData && apiJson.agentData.agentConfig) || fallbackAgentData);
        console.log("formData :", apiJson.formData);
        console.log("agentData :", apiJson.agentData);
      } catch (err) {
        setError("Failed to fetch agent data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleSectionChange(section: string, value: any) {
    setAgentData((prev: any) => ({ ...prev, [section]: value }));
  }

  function handleFieldChange(field: string, value: any) {
    setAgentData((prev: any) => ({ ...prev, [field]: value }));
  }

  function validateForm() {
    // Use formData for validation rules
    // (Stubbed for now)
    return {};
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Transform agentData to backend format
      const transformed = {
        workflowId: agentData.workflowId,
        languages: agentData.languages?.defaultLang || '',
        additionalLanguages: agentData.languages?.additionalLangs || [],
        callNumbers: agentData.callNumbers,
        ringSettings: agentData.ringSettings,
        agentMessages: agentData.agentMessages,
        llmConfig: agentData.llmConfig,
        s2ttConfig: agentData.s2ttConfig,
        ttsConfig: agentData.ttsConfig,
        ivrConfig: agentData.ivrConfig,
        // Map knowledge section to knBase array (id list)
        knBase: Array.isArray(agentData.knowledge)
          ? agentData.knowledge.map((k: any) => k.knowledgeBase)
          : Array.isArray(agentData.knBase)
            ? agentData.knBase.map((k: any) => typeof k === 'string' ? k : k.knowledgeBase)
            : [],
        // Map tool section to toolCalls array (id list)
        toolCalls: Array.isArray(agentData.tools)
          ? agentData.tools.map((t: any) => t.toolName)
          : Array.isArray(agentData.toolCalls)
            ? agentData.toolCalls.map((t: any) => typeof t === 'string' ? t : t.toolName)
            : [],
      };
      console.log("Submitting transformed agentData:", transformed);
      console.log("Submitting transformed JSON:", JSON.stringify(transformed));
      // TODO: send `transformed` to backend
      submitAgentData(transformed);
    }
  }

  async function submitAgentData(transformedData: any) {
    try{
      transformedData["agentId"] = '65c8ab3a-4221-4ec1-b4d7-a62cc1461d72';
      let response = await fetch("http://localhost:8000/agents/save", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZTJiZTdkOC1jOTQ0LTRhNjItOTA2Yy00MjdjZjlmNDg2MTQiLCJ1c2VybmFtZSI6Ik15S2Fhc3UgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsInJvbGVzIjpbInVzZXIiXSwiZXhwIjoxNzQ4MzE5OTc3fQ.wpeWOYl40hMaS8tfCFKshv-EfksL240vRjKsfVrkXwg`
        },
        body: JSON.stringify(transformedData)
      });
      let data = await response.json();
      console.log("Response:", data);
    }catch(err){
      console.log(err);
    }
    
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!formData || !agentData) return null;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <AgentInfoSection
        schema={formData}
        value={agentData}
        onChange={handleFieldChange}
        validationErrors={validationErrors}
      />
      <LanguageSection
        schema={formData.languages}
        value={agentData.languages}
        onChange={val => handleSectionChange('languages', val)}
        validationErrors={validationErrors.languages}
      />
      <LLMConfigSection
        schema={formData.llmConfig}
        value={agentData.llmConfig}
        onChange={val => handleSectionChange('llmConfig', val)}
        validationErrors={validationErrors.llmConfig}
      />
      {/* <RingSettingsSection
        value={agentData.ringSettings}
        onChange={val => handleSectionChange('ringSettings', val)}
        validationErrors={validationErrors.ringSettings}
      /> */}
      <TTSConfigSection
        schema={formData.ttsConfig}
        value={agentData.ttsConfig}
        onChange={val => handleSectionChange('ttsConfig', val)}
        validationErrors={validationErrors.ttsConfig}
      />
      <S2TTConfigSection
        schema={formData.s2ttConfig}
        value={agentData.s2ttConfig}
        onChange={val => handleSectionChange('s2ttConfig', val)}
        validationErrors={validationErrors.s2ttConfig}
      />
      <IVRConfigSection
        schema={formData.ivrConfig}
        value={agentData.ivrConfig}
        onChange={val => handleSectionChange('ivrConfig', val)}
        validationErrors={validationErrors.ivrConfig}
      />
      <MessagesSection
        schema={formData.agentMessages}
        value={agentData.agentMessages}
        onChange={val => handleSectionChange('agentMessages', val)}
        validationErrors={validationErrors.agentMessages}
      />
      <ToolSection
        schema={formData?.toolCalls}
        value={agentData?.toolCalls || []}
        onChange={val => handleSectionChange("toolCalls", val)}
        validationErrors={validationErrors?.toolCalls}
      />
      <KnowledgeSection
        schema={formData?.knBase}
        value={agentData?.knBase || []}
        onChange={val => handleSectionChange('knBase', val)}
        validationErrors={validationErrors.knBase}
      />
      <div className="flex justify-end">
        <Button type="submit" className="mt-4">
          Save Agent
        </Button>
      </div>
    </form>
  );
}