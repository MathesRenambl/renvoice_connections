import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";

interface TagsSectionProps {
  value: string[];
  onChange: (val: string[]) => void;
  validationErrors?: any;
}

const TagsSection: React.FC<TagsSectionProps> = ({ value = [], onChange, validationErrors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Agent Tags
        </CardTitle>
        <CardDescription>Comma separated tags to help categorize your agent.</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="agentTags">Tags</Label>
        <Input
          id="agentTags"
          placeholder="AI, chatbot, conversation"
          value={value.join(", ")}
          onChange={e => onChange(e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
          className={validationErrors ? "border-red-500" : ""}
        />
        {validationErrors && (
          <div className="text-red-500 text-xs mt-1">{validationErrors}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default TagsSection;
