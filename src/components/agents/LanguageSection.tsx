import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import {MultiSelect} from "@/components/ui/mutliSelect";

interface LanguageSectionProps {
  schema: any;
  value: any;
  onChange: (val: any) => void;
  validationErrors: any;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  // Ensure value is always a flat object
  const availableLanguages = schema?.avlLang || [];
  const defaultLang = typeof value?.defaultLang === 'string' ? value.defaultLang : (schema?.defaultLang || "");
  const additionalFlag = typeof value?.additionalFlag === 'boolean' ? value.additionalFlag : (schema?.additionalFlag ?? false);
  const additionalLangs = Array.isArray(value?.additionalLangs) ? value.additionalLangs : [];
  const selectableAdditionalLangs = availableLanguages.filter((lang: string) => lang !== defaultLang);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Languages
        </CardTitle>
        <CardDescription>Select default and additional languages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="defaultLang">Default Language</Label>
          <Select
            value={defaultLang}
            onValueChange={val => onChange({
              ...value,
              defaultLang: val,
              // Remove from additionalLangs if present
              additionalLangs: (value.additionalLangs || []).filter((l: string) => l !== val)
            })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select default language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang: string) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors?.defaultLang && (
            <div className="text-red-500 text-xs mt-1">{validationErrors.defaultLang}</div>
          )}
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <input
              id="additionalFlag"
              type="checkbox"
              checked={additionalFlag}
              onChange={e => onChange({ ...value, additionalFlag: e.target.checked })}
            />
            <Label htmlFor="additionalFlag">Allow additional languages</Label>
          </div>
          {additionalFlag && (
            <div className="mt-3">
              <Label htmlFor="additionalLangs">Additional Languages</Label>
              <MultiSelect
                options={selectableAdditionalLangs}
                selected={additionalLangs}
                onChange={langs => onChange({ ...value, additionalLangs: Array.isArray(langs) ? langs : [langs] })}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
