import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Volume2 } from "lucide-react";

interface TTSConfigSectionProps {
  schema: any;
  value: any;
  onChange: (val: any) => void;
  validationErrors?: any;
}

const TTSConfigSection: React.FC<TTSConfigSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  // value is an array of TTS configs
  // Providers array from schema
  const providerOptions = Array.isArray(schema) ? schema.map((tts: any) => tts.provider) : [];
  const selectedProvider = value?.provider || providerOptions[0] || "";
  const modelOptions = (Array.isArray(schema)
    ? schema.find((tts: any) => tts.provider === selectedProvider)?.model || []
    : []);
  const selectedModel = value?.model || modelOptions[0] || "";
  const languageOptions = (Array.isArray(schema)
    ? schema.find((tts: any) => tts.provider === selectedProvider)?.languages || []
    : []);
  const selectedLanguage = value?.language || (languageOptions[0]?.voiceId ?? "");
  const selectedVoice = value?.selectedVoice || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          TTS Configuration
        </CardTitle>
        <CardDescription>Configure Text-to-Speech provider and voice.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="ttsProvider">Provider</Label>
          <Select
            value={selectedProvider}
            onValueChange={prov => {
              const provSchema = Array.isArray(schema)
                ? schema.find((tts: any) => tts.provider === prov)
                : null;
              onChange({
                provider: prov,
                model: provSchema?.modelId || "",
                selectedVoice: provSchema?.languages?.[0]?.voiceId || ""
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select TTS provider" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(schema)
                ? schema.map((tts: any) => (
                    <SelectItem key={tts.provider} value={tts.provider}>{tts.provider}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="ttsModel">Model</Label>
          <Select
            value={selectedModel}
            onValueChange={modelId => {
              const provSchema = Array.isArray(schema)
                ? schema.find((tts: any) => tts.provider === selectedProvider && tts.modelId === modelId)
                : null;
              onChange({
                ...value,
                model: modelId,
                selectedVoice: provSchema?.languages?.[0]?.voiceId || ""
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select TTS model" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(schema)
                ? schema.filter((tts: any) => tts.provider === selectedProvider).map((tts: any) => (
                    <SelectItem key={tts.modelId} value={tts.modelId}>{tts.modelName}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="ttsVoice">Voice</Label>
          <Select
            value={selectedVoice}
            onValueChange={voiceId => onChange({ ...value, selectedVoice: voiceId })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select TTS voice" />
            </SelectTrigger>
            <SelectContent>
              {(() => {
                const provSchema = Array.isArray(schema)
                  ? schema.find((tts: any) => tts.provider === selectedProvider)
                  : null;
                return provSchema && Array.isArray(provSchema.languages)
                  ? provSchema.languages.map((voice: any) => (
                      <SelectItem key={voice.voiceId} value={voice.voiceId}>
                        <div className="flex items-center gap-2">
                          <span>{voice.charName} ({voice.voiceId})</span>
                          {voice.sampleFile && (
                            <button
                              type="button"
                              className="ml-2 text-blue-600 hover:underline"
                              tabIndex={-1}
                              onClick={e => {
                                e.stopPropagation();
                                const audio = new Audio(voice.sampleFile);
                                audio.play();
                              }}
                            >
                              ▶️
                            </button>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  : null;
              })()}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TTSConfigSection;
