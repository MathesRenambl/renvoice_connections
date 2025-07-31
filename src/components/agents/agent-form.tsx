"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Save, Play } from "lucide-react";

// Types for agent configuration
interface AgentConfig {
  name: string;
  type: string;
  phoneNumber: string;
  prompt: string;
  apiModel: string;
}

// Default agent configuration
const defaultAgentConfig: AgentConfig = {
  name: "",
  type: "custom",
  phoneNumber: "",
  prompt: "",
  apiModel: "gpt-4",
};

// Available agent types
const agentTypes = [
  { id: "appointment", name: "Appointment Booking Bot" },
  { id: "support", name: "Customer Support" },
  { id: "assistant", name: "Personal Assistant" },
  { id: "friend", name: "AI Friend" },
  { id: "news", name: "News Summarizer" },
  { id: "gk", name: "GK Question Bot" },
  { id: "english", name: "English Speaking Tutor" },
  { id: "custom", name: "Custom User-Defined Agent" },
];

// Available API models
const apiModels = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-3", name: "Claude 3" },
  { id: "llama-3", name: "Llama 3" },
];

// Template prompts for different agent types
const templatePrompts: Record<string, string> = {
  appointment: "You are an AI assistant that helps users book appointments. Be friendly and efficient. Ask for the date, time, and purpose of the appointment.",
  support: "You are a customer support agent. Help users troubleshoot issues with our products and services. Be patient and thorough in your explanations.",
  assistant: "You are a personal assistant. Help users manage their tasks, schedule, and provide helpful information when asked.",
  friend: "You are a friendly AI companion. Engage in casual conversation, show empathy, and be supportive.",
  news: "You are a news summarizer. When users ask about current events, provide concise summaries of relevant news stories.",
  gk: "You are a general knowledge question bot. Answer users' questions about various topics with accurate and informative responses.",
  english: "You are an English language tutor. Help users improve their English speaking skills through conversation practice and feedback.",
  custom: "You are an AI assistant. [Define your custom behavior here]",
};

interface AgentFormProps {
  initialConfig?: AgentConfig;
  onSave?: (config: AgentConfig) => void;
}

export function AgentForm({ initialConfig, onSave }: AgentFormProps) {
  const [config, setConfig] = useState<AgentConfig>(initialConfig || defaultAgentConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Handle form input changes
  const handleChange = (field: keyof AgentConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));

    // Update prompt template when agent type changes
    if (field === "type" && value !== "custom") {
      setConfig((prev) => ({ ...prev, prompt: templatePrompts[value] }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call to save agent configuration
    setTimeout(() => {
      setIsSaving(false);
      if (onSave) {
        onSave(config);
      }
      alert("Agent configuration saved successfully!");
    }, 1000);
  };

  // Handle test call
  const handleTestCall = () => {
    setIsTesting(true);

    // Simulate API call to test agent
    setTimeout(() => {
      setIsTesting(false);
      alert("Test call initiated! Your phone will ring shortly.");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Configure your AI agent&apos;s basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Agent Name
              </label>
              <input
                id="name"
                value={config.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="My AI Agent"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium leading-none">
                Agent Type
              </label>
              <select
                id="type"
                value={config.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {agentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium leading-none">
                Phone Number
              </label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <input
                  id="phoneNumber"
                  value={config.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter the phone number to assign to this agent
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
            <CardDescription>Configure your AI agent&apos;s behavior and model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiModel" className="text-sm font-medium leading-none">
                AI Model
              </label>
              <select
                id="apiModel"
                value={config.apiModel}
                onChange={(e) => handleChange("apiModel", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {apiModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium leading-none">
                Agent Prompt
              </label>
              <textarea
                id="prompt"
                value={config.prompt}
                onChange={(e) => handleChange("prompt", e.target.value)}
                className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter the prompt that defines your agent's behavior..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                This prompt will guide your agent&apos;s behavior and responses
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button type="button" variant="outline" onClick={handleTestCall} disabled={isTesting}>
          <Play className="h-4 w-4 mr-2" />
          {isTesting ? "Initiating Call..." : "Test Call"}
        </Button>
        <Button type="submit" disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </form>
  );
}
