// components/ui/multiselect.tsx
"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}) => {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
        <span className="truncate">
          {selected.length > 0 ? selected.join(", ") : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 mt-2 w-[200px] rounded-md border bg-white p-2 shadow-lg"
          align="start"
        >
          {options.map((opt) => (
            <div
              key={opt}
              className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => toggleOption(opt)}
            >
              <div className="h-4 w-4 border rounded flex items-center justify-center bg-white">
                {selected.includes(opt) && <Check className="h-3 w-3" />}
              </div>
              <span className="text-sm">{opt}</span>
            </div>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
