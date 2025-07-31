import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench, Trash2, Plus } from "lucide-react";

interface ToolSectionProps {
  schema: any;
  value: any[];
  onChange: (val: any[]) => void;
  validationErrors?: any;
}

const ToolSection: React.FC<ToolSectionProps> = ({ schema, value = [], onChange, validationErrors }) => {
  console.log("validationErrors :", validationErrors);
  console.log("value :", value);
  console.log("schema :", schema);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTools, setSelectedTools] = React.useState<string[]>([]);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [editDesc, setEditDesc] = React.useState<string>("");
  const toolOptions: { toolName: string; description?: string }[] = Array.isArray(schema?.tools) && schema.tools.length > 0
    ? schema.tools
    : [
        { toolName: 'Search', description: 'Web search tool' },
        { toolName: 'Calculator', description: 'Basic calculator tool' },
        { toolName: 'Weather', description: 'Weather info tool' }
      ];

  function handleRemove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function handleAdd() {
    onChange([
      ...value,
      { toolName: '', description: '' }
    ]);
  }
  function handleChange(idx: number, field: string, val: any) {
    const updated = value.map((tool, i) => (i === idx ? { ...tool, [field]: val } : tool));
    onChange(updated);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Agent Tools
        </CardTitle>
        <CardDescription>Configure tools available to the agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {value?.map((tool, idx) => (
            <Card key={tool.toolName || idx} className="relative p-4 flex flex-col justify-between h-32">
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 z-10"
                onClick={() => handleRemove(idx)}
                aria-label="Remove tool"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center" data-component-name="ToolSection">
                <span className="font-semibold text-lg text-center w-full truncate">{tool.toolName || "Untitled"}</span>
              </div>
              <button
                type="button"
                className="absolute bottom-2 right-2 text-blue-600 hover:underline text-xs bg-white px-2 py-1 rounded border border-blue-100"
                onClick={() => {
                  setEditIdx(idx);
                  setEditDesc(tool.description || "");
                  setEditModalOpen(true);
                }}
                aria-label="Edit tool description"
              >Edit</button>
            </Card>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" /> Add Tool
        </button>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold mb-4">Select Tools</h2>
              <div className="max-h-64 overflow-y-auto mb-4 grid grid-cols-1 gap-3">
                {toolOptions.map((tool: any) => (
                  <Card key={tool.toolName} className={"border p-3 flex items-center gap-3 " + (selectedTools.includes(tool.toolName) ? 'ring-2 ring-blue-500' : '')}>
                    <input
                      type="checkbox"
                      checked={selectedTools.includes(tool.toolName)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedTools([...selectedTools, tool.toolName]);
                        } else {
                          setSelectedTools(selectedTools.filter((v) => v !== tool.toolName));
                        }
                      }}
                      className="mr-2 accent-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-base">{tool.toolName}</div>
                    </div>
                  </Card>
                ))}
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  const toAdd = toolOptions.filter((tool: any) => selectedTools.includes(tool.toolName));
                  const newItems = toAdd.filter(tool => !value.some(item => item.toolName === tool.toolName)).map(tool => ({ toolName: tool.toolName, description: tool.description || '' }));
                  onChange([...value, ...newItems]);
                  setShowModal(false);
                  setSelectedTools([]);
                }}
                disabled={selectedTools.length === 0}
              >
                Add Selected
              </button>
            </div>
          </div>
        )}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Tool Description"
        size="lg"
        btnName="Save"
        onSave={() => {
          if (editIdx !== null) {
            const updated = value.map((tool, i) => i === editIdx ? { ...tool, description: editDesc } : tool);
            onChange(updated);
            setEditModalOpen(false);
          }
        }}
      >
        {editIdx !== null && (
          <>
            <div className="mb-4">
              <Label className="mb-1 block">Tool Name</Label>
              <Input value={value[editIdx].toolName} disabled className="bg-gray-100" />
            </div>
            <div className="mb-4">
              <Label className="mb-1 block">Description</Label>
              <textarea
                className="w-full border rounded px-2 py-1 min-h-[140px]"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />
            </div>
          </>
        )}
      </Modal>
      </CardContent>
    </Card>
  );
};

export default ToolSection;
