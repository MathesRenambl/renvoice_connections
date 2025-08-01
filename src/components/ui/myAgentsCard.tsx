import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function MyAgentsCard({
  agent,
  children = null,
}: {
  agent: any;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{agent.agentName}</CardTitle>
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              agent.agentStatus === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {agent.agentStatus === "active" ? "Active" : "Inactive"}
          </div>
        </div>
        <CardDescription>Type: {agent.agentCategory}</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">+91 987654321</span>
          </div>
        </div>
      </CardContent> */}
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
          React.Children.map(children, (child) => <div>{child}</div>)}
      </CardFooter>
    </Card>
  );
}

export default MyAgentsCard;
