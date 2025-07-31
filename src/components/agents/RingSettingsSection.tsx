import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RingSettingsSectionProps {
  value: {
    noOfRings: number;
    callTimeout: number;
    callException: string;
    callDuration: number;
    sileneceDuration: number;
  };
  onChange: (val: any) => void;
  validationErrors?: any;
}

const RingSettingsSection: React.FC<RingSettingsSectionProps> = ({ value, onChange, validationErrors }) => {
  console.log("RingSettingsSection value:", value);
  console.log("RingSettingsSection onChange:", onChange);
  function handleChange(field: string, val: any) {
    onChange({ ...value, [field]: val });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ring & Call Settings</CardTitle>
        <CardDescription>Configure ring and call-related settings for the agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>No. of Rings</Label>
          <Input
            type="number"
            min={1}
            value={value.noOfRings}
            onChange={e => handleChange('noOfRings', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Call Timeout (seconds)</Label>
          <Input
            type="number"
            min={1}
            value={value.callTimeout}
            onChange={e => handleChange('callTimeout', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Call Exception Message</Label>
          <Input
            type="text"
            value={value.callException}
            onChange={e => handleChange('callException', e.target.value)}
          />
        </div>
        <div>
          <Label>Call Duration (seconds)</Label>
          <Input
            type="number"
            min={1}
            value={value.callDuration}
            onChange={e => handleChange('callDuration', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Silence Duration (ms)</Label>
          <Input
            type="number"
            min={0}
            value={value.sileneceDuration}
            onChange={e => handleChange('sileneceDuration', Number(e.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RingSettingsSection;
