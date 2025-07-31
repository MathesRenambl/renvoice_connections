import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Mic } from "lucide-react";

interface S2TTConfigSectionProps {
  schema: any;
  value: any;
  onChange: (val: any) => void;
  validationErrors?: any;
}

const S2TTConfigSection: React.FC<S2TTConfigSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  // value is an array of S2TT configs
  // Providers array from schema
  const providerOptions = Array.isArray(schema) ? schema.map((s2tt: any) => s2tt.provider) : [];
  const selectedProvider = value?.provider || providerOptions[0] || "";
  const modelOptions = (Array.isArray(schema)
    ? schema.find((s2tt: any) => s2tt.provider === selectedProvider)?.model || []
    : []);
  const selectedModel = value?.model || modelOptions[0] || "";
  const languages = value?.languages || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Speech-to-Text Configuration
        </CardTitle>
        <CardDescription>Configure Speech-to-Text provider and supported languages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="s2ttProvider">Provider</Label>
          <Select
            value={selectedProvider}
            onValueChange={prov => {
              const providerModels = Array.isArray(schema)
                ? schema.filter((item: any) => item.provider === prov)
                : [];
              const firstModel = providerModels[0];
              onChange({
                provider: prov,
                model: firstModel?.modelId || "",
                languages: firstModel?.languages || []
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select S2TT provider" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(schema)
                ? Array.from(new Set(schema.map((item: any) => item.provider))).map((prov: string) => (
                    <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="s2ttModel">Model</Label>
          <Select
            value={selectedModel}
            onValueChange={modelId => {
              const modelObj = Array.isArray(schema)
                ? schema.find((item: any) => item.modelId === modelId)
                : null;
              onChange({
                ...value,
                model: modelId,
                languages: modelObj?.languages || []
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select S2TT model" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(schema)
                ? schema.filter((item: any) => item.provider === selectedProvider).map((item: any) => (
                    <SelectItem key={item.modelId} value={item.modelId}>{item.modelName}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Supported Languages</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((lang: string) => (
              <span key={lang} className="bg-gray-200 px-2 py-1 rounded text-xs">{lang}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default S2TTConfigSection;
