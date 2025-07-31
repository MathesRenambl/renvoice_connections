import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Trash2, Plus } from "lucide-react";

interface KnowledgeSectionProps {
  schema: any;
  value: any[];
  onChange: (val: any[]) => void;
  validationErrors?: any;
}

const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ schema, value = [], onChange, validationErrors }) => {
  // Inject mock data if schema.knowledgeBases is missing or empty
  const mockKnowledgeBases = [
    { label: "Product Docs", value: "product-docs" },
    { label: "FAQ", value: "faq" },
    { label: "Support Guide", value: "support-guide" },
  ];
  const knowledgeBaseOptions = (schema?.knowledgeBases && schema.knowledgeBases.length > 0)
    ? schema.knowledgeBases
    : mockKnowledgeBases;

  const [showModal, setShowModal] = React.useState(false);
  const [selectedKb, setSelectedKb] = React.useState<string[]>([]);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [editDesc, setEditDesc] = React.useState<string>("");
  function handleRemove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
 
  function handleChange(idx: number, field: string, val: any) {
    const updated = value.map((item, i) => (i === idx ? { ...item, [field]: val } : item));
    onChange(updated);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Knowledge Base
        </CardTitle>
        <CardDescription>Configure knowledge base documents for the agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((item, idx) => (
            <Card key={item.title || idx} className="relative p-4 flex flex-col justify-between h-32">
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 z-10"
                onClick={() => handleRemove(idx)}
                aria-label="Remove knowledge"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center">
                <span className="font-semibold text-lg text-center w-full truncate">{item.title || "Untitled"}</span>
              </div>
              <button
                type="button"
                className="absolute bottom-2 right-2 text-blue-600 hover:underline text-xs bg-white px-2 py-1 rounded border border-blue-100"
                onClick={() => {
                  setEditIdx(idx);
                  setEditDesc(item.description || "");
                  setEditModalOpen(true);
                }}
                aria-label="Edit knowledge description"
              >Edit</button>
            </Card>
          ))} 
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" /> Add Knowledge Base
          </button>
        </div>
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
              <h2 className="text-lg font-semibold mb-4">Select Knowledge Base Documents</h2>
              <div className="max-h-64 overflow-y-auto mb-4 grid grid-cols-1 gap-3">
                {knowledgeBaseOptions.map((kb: any) => (
                  <Card key={kb.value} className={"border p-3 flex items-center gap-3 " + (selectedKb.includes(kb.value) ? 'ring-2 ring-blue-500' : '')}>
                    <input
                      type="checkbox"
                      checked={selectedKb.includes(kb.value)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedKb([...selectedKb, kb.value]);
                        } else {
                          setSelectedKb(selectedKb.filter((v) => v !== kb.value));
                        }
                      }}
                      className="mr-2 accent-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-base">{kb.label || kb.value}</div>
                    </div>
                  </Card>
                ))}
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  const toAdd = knowledgeBaseOptions.filter((kb: any) => selectedKb.includes(kb.value));
                  const newItems = toAdd.filter((kb:any) => !value.some((item:any) => item.knowledgeBase === kb.value)).map((kb:any) => ({ title: kb.label || '', url: '', knowledgeBase: kb.value }));
                  onChange([...value, ...newItems]);
                  setShowModal(false);
                  setSelectedKb([]);
                }}
                disabled={selectedKb.length === 0}
              >
                Add Selected
              </button>
            </div>
          </div>
        )}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Knowledge Description"
        size="lg"
        btnName="Save"
        onSave={() => {
          if (editIdx !== null) {
            const updated = value.map((item, i) => i === editIdx ? { ...item, description: editDesc } : item);
            onChange(updated);
            setEditModalOpen(false);
          }
        }}
      >
        {editIdx !== null && (
          <>
            <div className="mb-4">
              <Label className="mb-1 block">Knowledge Title</Label>
              <Input value={value[editIdx].title} disabled className="bg-gray-100" />
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

export default KnowledgeSection;
