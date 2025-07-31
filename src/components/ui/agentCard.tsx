import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Plus, Edit, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function AgentCard({
  agent,
  handleViewClick,
  children=null,
}: {
  agent: any;
  handleViewClick?: (arg: any) => void;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              agent.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {agent.status === "active" ? "Active" : "Inactive"}
          </div>
        </div>
        <CardDescription>Type: {agent.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{agent.phoneNumber}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Last used: {agent.lastUsed}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 ml:auto">
        {/* <Button
          variant="outline"
          size="sm"
          className="w-20 ml-auto hover:text-gray-100 hover:bg-black/80"
          onClick={() => handleViewClick(agent)}
        >
          Use
        </Button> */}
        {children &&
          React.Children.map(children, (child) => (
            <div>{child}</div>
          ))}
      </CardFooter>
    </Card>
  );
}

export default AgentCard;