import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Tag } from "lucide-react";

interface AgentInfoSectionProps {
  schema: any;
  value: any;
  onChange: (field: string, value: any) => void;
  validationErrors: any;
}

const AgentInfoSection: React.FC<AgentInfoSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Agent Info
        </CardTitle>
        <CardDescription>Basic information about your agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="agentName">Agent Name</Label>
          <Input
            id="agentName"
            placeholder={schema?.agentName?.placeholder || "Enter agent name"}
            value={value.agentName}
            onChange={e => onChange("agentName", e.target.value)}
            className={validationErrors?.agentName ? "border-red-500" : ""}
          />
          {validationErrors?.agentName && (
            <div className="text-red-500 text-xs mt-1">{validationErrors.agentName}</div>
          )}
          {schema?.agentName?.helpText && (
            <div className="text-xs mt-1">{schema.agentName.helpText}</div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your agent"
            value={value.description || ""}
            onChange={e => onChange("description", e.target.value)}
            className={validationErrors?.description ? "border-red-500" : ""}
          />
          {validationErrors?.description && (
            <div className="text-red-500 text-xs mt-1">{validationErrors.description}</div>
          )}
        </div>
        <div>
          <Label htmlFor="agentCategory">Category</Label>
          <Input
            id="agentCategory"
            placeholder="e.g. conversational, support, sales"
            value={value.agentCategory || ""}
            onChange={e => onChange("agentCategory", e.target.value)}
            className={validationErrors?.agentCategory ? "border-red-500" : ""}
          />
          {validationErrors?.agentCategory && (
            <div className="text-red-500 text-xs mt-1">{validationErrors.agentCategory}</div>
          )}
        </div>
        <div>
          <Label htmlFor="agentTags">Tags</Label>
          <Input
            id="agentTags"
            placeholder="Comma separated tags (AI, chatbot, ... )"
            value={Array.isArray(value.agentTags) ? value.agentTags.join(", ") : value.agentTags || ""}
            onChange={e => onChange("agentTags", e.target.value.split(",").map((t: string) => t.trim()))}
            className={validationErrors?.agentTags ? "border-red-500" : ""}
          />
          {validationErrors?.agentTags && (
            <div className="text-red-500 text-xs mt-1">{validationErrors.agentTags}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentInfoSection;
