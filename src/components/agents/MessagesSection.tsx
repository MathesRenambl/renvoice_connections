import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Trash2, Plus } from "lucide-react";

interface MessagesSectionProps {
  schema: any;
  value: any[];
  onChange: (val: any[]) => void;
  validationErrors?: any;
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ schema, value = [], onChange, validationErrors }) => {
  function handleMsgChange(idx: number, field: string, val: any) {
    const updated = value.map((msg, i) => (i === idx ? { ...msg, [field]: val } : msg));
    onChange(updated);
  }
  function handleAdd() {
    const defaultMessage = schema.find((template: any) => template.msg_type === 'text');
    onChange([...value, defaultMessage]);
  }
  function handleRemove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Agent Messages
        </CardTitle>
        <CardDescription>Customize the agent's agent messages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {value.map((msg, idx) => (
          <div key={msg.msg_id || idx} className="border p-4 rounded-md mb-2 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => handleRemove(idx)}
              aria-label="Remove message"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="mb-2">
              <Label htmlFor={`msg_id_${idx}`}>Message ID</Label>
              <Input
                id={`msg_id_${idx}`}
                placeholder="greeting_msg"
                value={msg.msg_id}
                onChange={e => handleMsgChange(idx, 'msg_id', e.target.value)}
                className={validationErrors?.[idx]?.msg_id ? "border-red-500" : ""}
                disabled
              />
              {validationErrors?.[idx]?.msg_id && (
                <div className="text-red-500 text-xs mt-1">{validationErrors[idx].msg_id}</div>
              )}
            </div>
            <div className="mb-2">
              <Label htmlFor={`msg_text_${idx}`}>Message Text</Label>
              <Input
                id={`msg_text_${idx}`}
                placeholder="Enter message text"
                value={msg.msg_text}
                onChange={e => handleMsgChange(idx, 'msg_text', e.target.value)}
                className={validationErrors?.[idx]?.msg_text ? "border-red-500" : ""}
                maxLength={msg.max_length}
              />
              {validationErrors?.[idx]?.msg_text && (
                <div className="text-red-500 text-xs mt-1">{validationErrors[idx].msg_text}</div>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" /> Add Message
        </button>
      </CardContent>
    </Card>
  );
};

export default MessagesSection;
