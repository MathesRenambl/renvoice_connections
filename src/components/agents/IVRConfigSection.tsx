import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Shield } from "lucide-react";

interface IVRConfigSectionProps {
  schema: any;
  value: any;
  onChange: (val: any) => void;
  validationErrors: any;
}

const IVRConfigSection: React.FC<IVRConfigSectionProps> = ({ schema, value, onChange, validationErrors }) => {
  if (!value) return null;
  type PinAction = "add" | "delete";
  interface PinObj { pin: string; toolName: string; action: PinAction; }
  interface PinResult extends PinObj { success: boolean; message: string; }
  interface PhoneResult { success: boolean; message: string; }

  // Local state synced with parent value
  const [ivrType, setIvrType] = React.useState<string>(value.ivrType || "phone");
  const [phoneDigits, setPhoneDigits] = React.useState<string>(value.phoneDigits || "");
  const [pins, setPins] = React.useState<PinObj[]>(value.pins || []);

  // Keep local state in sync with parent value
  React.useEffect(() => {
    setIvrType(value.ivrType || "phone");
    setPhoneDigits(value.phoneDigits || "");
    setPins(value.pins || []);
  }, [value]);

  // Handlers that update both local state and parent
  const handleIvrTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIvrType(e.target.value);
    onChange({ ...value, ivrType: e.target.value, phoneDigits, pins });
  };
  const handlePhoneDigitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneDigits(e.target.value);
    onChange({ ...value, phoneDigits: e.target.value, ivrType, pins });
  };
  const handleAddPin = () => {
    if (!pinInput || !toolName) return;
    const newPins = [...pins, { pin: pinInput, toolName, action: pinAction }];
    setPins(newPins);
    setPinInput("");
    setToolName("");
    onChange({ ...value, pins: newPins, ivrType, phoneDigits });
  };
  const handleDeletePin = (idx: number) => {
    const newPins = pins.filter((_, i) => i !== idx);
    setPins(newPins);
    onChange({ ...value, pins: newPins, ivrType, phoneDigits });
  };
  const handleEditPin = (idx: number, field: "pin" | "toolName", newValue: string) => {
    const newPins = [...pins];
    newPins[idx] = { ...newPins[idx], [field]: newValue };
    setPins(newPins);
    onChange({ ...value, pins: newPins, ivrType, phoneDigits });
  };

  const [phoneResult, setPhoneResult] = React.useState<PhoneResult | null>(null);
  const [pinInput, setPinInput] = React.useState<string>("");
  const [toolName, setToolName] = React.useState<string>("");
  const [pinAction, setPinAction] = React.useState<PinAction>("add");
  const [pinResults, setPinResults] = React.useState<PinResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  // For tool call select
  const [selectedToolName, setSelectedToolName] = React.useState<string>("");
  const [toolCalls, setToolCalls] = React.useState<Array<{
    toolName: string;
    digits: string;
    result: string;
    message: string;
    timestamp: string;
  }>>([]);


  // Simulate tool call API
  const callToolAPI = async (payload: any) => {
    await new Promise(res => setTimeout(res, 500));
    // Mock: succeed if digits/pin/toolName present
    if (payload.type === "phone") {
      return { success: !!payload.digits, message: payload.digits ? "Phone validated" : "No digits" };
    } else {
      return { success: !!payload.pin && !!payload.toolName, message: payload.pin ? "Pin action done" : "No pin/toolName" };
    }
  };

  const handlePhoneSubmit = async () => {
    setLoading(true);
    const res = await callToolAPI({ type: "phone", digits: phoneDigits });
    setPhoneResult(res);
    setLoading(false);
  };

  const handlePinSubmit = async () => {
    setLoading(true);
    const results: PinResult[] = [];
    for (const p of pins) {
      // Call tool for each pin
      const res = await callToolAPI({ type: "pin", pin: p.pin, toolName: p.toolName, action: p.action });
      results.push({ ...p, ...res });
    }
    setPinResults(results);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          IVR Configuration
        </CardTitle>
        <CardDescription>Configure Interactive Voice Response (IVR) settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6" data-component-name="IVRConfigSection">
          <div className="flex flex-col gap-1 w-full max-w-xs">
            <Label className="mb-1 text-sm font-medium" htmlFor="ivrType">IVR Type</Label>
            <select
              id="ivrType"
              value={ivrType}
              onChange={handleIvrTypeChange}
              className="border rounded px-3 py-2 bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
              data-component-name="IVRConfigSection"
            >
              <option value="phone">Phone Number</option>
              <option value="pin">Pin</option>
            </select>
          </div>
        </div>
        {ivrType === "phone" && (
          <div className="flex flex-col gap-3 mt-4" data-component-name="IVRConfigSection">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default">Tool Call</Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-md w-full">
                <SheetHeader>
                  <SheetTitle>Tool Call: Validate Phone Number</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="block mb-1">Select Tool Call</Label>
                    <Select value={selectedToolName} onValueChange={setSelectedToolName}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tool" />
                      </SelectTrigger>
                      <SelectContent>
                        {(Array.isArray(schema?.tools) && schema.tools.length > 0
                          ? schema.tools
                          : [{ toolName: 'ValidatePhone', description: 'Validate phone digits' }]
                        ).map((tool: any) => (
                          <SelectItem key={tool.toolName} value={tool.toolName}>{tool.toolName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block mb-1">Total Digits</Label>
                    <Input
                      id="phoneDigits"
                      placeholder="Phone digits"
                      value={phoneDigits}
                      onChange={handlePhoneDigitsChange}
                      className="w-full"
                    />
                  </div>
                </div>
                <SheetFooter className="mt-6 flex gap-2">
                  <Button onClick={async () => {
                    setLoading(true);
                    const res = await callToolAPI({ type: "phone", digits: phoneDigits, toolName: selectedToolName });
                    setPhoneResult(res);
                    setLoading(false);
                    // Add tool call to UI table
                    setToolCalls((prev: any[]) => [
                      ...prev,
                      {
                        toolName: selectedToolName,
                        digits: phoneDigits,
                        result: res.success ? 'Success' : 'Error',
                        message: res.message,
                        timestamp: new Date().toLocaleString()
                      }
                    ]);
                  }} disabled={loading || !phoneDigits || !selectedToolName}>Call Tool</Button>
                  <SheetClose asChild>
                    <Button type="button" variant="outline" className="w-full">Close</Button>
                  </SheetClose>
                </SheetFooter>
                {phoneResult && (
                  <div className={phoneResult.success ? "text-green-600 mt-2" : "text-red-600 mt-2"}>{phoneResult.message}</div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        )}
        {ivrType === "phone" && toolCalls.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border text-sm bg-white rounded shadow">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-medium">Tool Name</th>
                  <th className="px-3 py-2 text-left font-medium">Digits</th>
                  <th className="px-3 py-2 text-left font-medium">Result</th>
                  <th className="px-3 py-2 text-left font-medium">Message</th>
                  <th className="px-3 py-2 text-left font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {toolCalls.map((call, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{call.toolName}</td>
                    <td className="px-3 py-2">{call.digits}</td>
                    <td className="px-3 py-2">{call.result}</td>
                    <td className="px-3 py-2">{call.message}</td>
                    <td className="px-3 py-2">{call.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {ivrType === "pin" && (
          <div className="space-y-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full mt-4" variant="default">Add IVR</Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-md w-full">
                <SheetHeader>
                  <SheetTitle>Add IVR Pin</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Enter Pin"
                    value={pinInput}
                    onChange={e => setPinInput(e.target.value)}
                  />
                  <Input
                    placeholder="Tool Name"
                    value={toolName}
                    onChange={e => setToolName(e.target.value)}
                  />
                </div>
                <SheetFooter className="mt-4">
                  <Button onClick={handleAddPin} disabled={!pinInput || !toolName}>Add IVR</Button>
                  <SheetClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <span className="text-sm text-muted-foreground">Add Pin via Tool Call</span>
            {/* List pins as table, editable via Sheet */}
            {pins.length > 0 && (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm bg-white rounded shadow">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-3 py-2 text-left font-medium">Pin</th>
                      <th className="px-3 py-2 text-left font-medium">Tool Name</th>
                      <th className="px-3 py-2 text-left font-medium">Action</th>
                      <th className="px-3 py-2 text-left font-medium">Edit</th>
                      <th className="px-3 py-2 text-left font-medium">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pins.map((p, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">{p.pin}</td>
                        <td className="px-3 py-2">{p.toolName}</td>
                        <td className="px-3 py-2">{p.action}</td>
                        <td className="px-3 py-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button size="sm" variant="outline">Edit</Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                              <SheetHeader>
                                <SheetTitle>Edit Pin</SheetTitle>
                              </SheetHeader>
                              <div className="space-y-2 mt-4">
                                <Input
                                  placeholder="Pin"
                                  value={p.pin}
                                  onChange={e => handleEditPin(idx, "pin", e.target.value)}
                                />
                                <Input
                                  placeholder="Tool Name"
                                  value={p.toolName}
                                  onChange={e => handleEditPin(idx, "toolName", e.target.value)}
                                />
                              </div>
                              <SheetFooter className="mt-4">
                                <SheetClose asChild>
                                  <Button type="button" variant="outline">Close</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </td>
                        <td className="px-3 py-2">
                          <Button size="sm" variant="destructive" onClick={() => handleDeletePin(idx)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IVRConfigSection;
