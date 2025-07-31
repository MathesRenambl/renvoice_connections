import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

interface LLMConfigSectionProps {
  schema: any;
  value: any;
  onChange: (val: any) => void;
  validationErrors?: any;
}

const LLMConfigSection: React.FC<LLMConfigSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  console.log("schema :", schema);
  console.log("value :", value);
  // Extract provider options from schema
  const providerOptions = Array.isArray(schema?.model) ? schema.model.map((prov: any) => prov.provider) : [];
  const selectedProvider = value?.provider && providerOptions.includes(value.provider)
    ? value.provider
    : providerOptions[0] || "";
  const providerSchema = Array.isArray(schema?.model)
    ? schema.model.find((prov: any) => prov.provider === selectedProvider)
    : null;
  const modelOptions = providerSchema ? providerSchema.models : [];
  const selectedModel = value?.model && modelOptions.some((m: any) => m.modelId === value.model)
    ? value.model
    : (modelOptions[0]?.modelId ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          LLM Configuration
        </CardTitle>
        <CardDescription>Configure the language model for your agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="provider">Provider</Label>
          <Select
            value={selectedProvider}
            onValueChange={prov => {
              const provSchema = Array.isArray(schema?.model)
                ? schema.model.find((p: any) => p.provider === prov)
                : null;
              onChange({
                ...value,
                provider: prov,
                model: provSchema?.models[0]?.modelId || ""
              });
            }}
          >
            <SelectTrigger id="provider" className="w-full">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providerOptions.map((prov: string) => (
                <SelectItem key={prov} value={prov}>{prov}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Select
            value={selectedModel}
            onValueChange={modelId => onChange({ ...value, model: modelId })}
          >
            <SelectTrigger id="model" className="w-full">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model: any) => (
                <SelectItem key={model.modelId} value={model.modelId}>{model.modelName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="temperature">Temperature</Label>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.01}
            value={[value?.temperature ?? 0.7]}
            onValueChange={arr => onChange({ ...value, temperature: arr[0] })}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">{value?.temperature ?? 0.7}</div>
        </div>
        <div>
          <Label htmlFor="max_tokens">Max Tokens</Label>
          <Input
            id="max_tokens"
            type="number"
            min={1}
            value={value?.max_tokens || 150}
            onChange={e => onChange({ ...value, max_tokens: parseInt(e.target.value, 10) })}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="system_prompt">System Prompt</Label>
          <Textarea
            id="system_prompt"
            placeholder="System prompt for the agent"
            value={value?.system_prompt || ""}
            onChange={e => onChange({ ...value, system_prompt: e.target.value })}
            className="w-full min-h-[150px] border rounded px-3 py-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMConfigSection;
