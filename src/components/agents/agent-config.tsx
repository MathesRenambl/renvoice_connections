"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  Trash2, 
  Wrench} from "lucide-react";

export function AgentConfig() {
  const [activeTab, setActiveTab] = useState("agent");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.");
  const [temperature, setTemperature] = useState(0.7);
  const [tokenLimit, setTokenLimit] = useState(-1);
  const [useRag, setUseRag] = useState(false);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="agent" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="agent">Agent</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agent" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Language</CardTitle>
              <CardDescription>Choose the default language the agent will communicate in.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="en">
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center">
                      <span className="mr-2">🇺🇸</span>
                      <span>English</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center">
                      <span className="mr-2">🇺🇸</span>
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="es">
                    <div className="flex items-center">
                      <span className="mr-2">🇪🇸</span>
                      <span>Spanish</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="fr">
                    <div className="flex items-center">
                      <span className="mr-2">🇫🇷</span>
                      <span>French</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Additional Languages</CardTitle>
              <CardDescription>Specify additional languages which callers can choose from.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add additional languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>First message</CardTitle>
              <CardDescription>The first message the agent will say. If empty, the agent will wait for the user to start the conversation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Hello, how can I help you today?"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voice" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice Settings</CardTitle>
              <CardDescription>Configure the voice of your AI agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Voice Type</Label>
                <Select defaultValue="female">
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Voice Style</Label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Speaking Rate</Label>
                  <span className="text-sm text-muted-foreground">Normal</span>
                </div>
                <Slider defaultValue={[1]} min={0.5} max={2} step={0.1} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Pitch</Label>
                  <span className="text-sm text-muted-foreground">Normal</span>
                </div>
                <Slider defaultValue={[1]} min={0.5} max={2} step={0.1} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Analysis</CardTitle>
              <CardDescription>Configure how calls are analyzed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Sentiment Analysis</Label>
                  <p className="text-sm text-muted-foreground">Analyze the sentiment of conversations</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Topic Detection</Label>
                  <p className="text-sm text-muted-foreground">Automatically detect conversation topics</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Call Transcription</Label>
                  <p className="text-sm text-muted-foreground">Save transcripts of all calls</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Content Filtering</Label>
                  <p className="text-sm text-muted-foreground">Filter inappropriate content</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">PII Redaction</Label>
                  <p className="text-sm text-muted-foreground">Redact personally identifiable information</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Call Recording Consent</Label>
                  <p className="text-sm text-muted-foreground">Require consent before recording calls</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System prompt</CardTitle>
              <CardDescription>The system prompt is used to determine the persona of the agent and the context of the conversation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>LLM</CardTitle>
              <CardDescription>Select which provider and model to use for the LLM.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="gemini">
                <SelectTrigger>
                  <SelectValue placeholder="Select LLM model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Gemini 2.0 Flash</SelectItem>
                  <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude">Claude 3 Opus</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                If your chosen LLM is not available at the moment or something goes wrong, we will redirect the conversation to another LLM.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Temperature</CardTitle>
              <CardDescription>Temperature is a parameter that controls the creativity or randomness of the responses generated by the LLM.</CardDescription>
            </CardHeader>
            <CardContent>
              <Slider 
                defaultValue={[0.7]} 
                min={0} 
                max={1} 
                step={0.1}
                onValueChange={(value) => setTemperature(value[0])}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Limit token usage</CardTitle>
              <CardDescription>Configure the maximum number of tokens that the LLM can predict. A limit will be applied if the value is greater than 0.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                type="number" 
                value={tokenLimit}
                onChange={(e) => setTokenLimit(parseInt(e.target.value))}
                min="-1"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge base</CardTitle>
              <CardDescription>Provide the LLM with domain-specific information to help it answer questions more accurately.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="block">Use RAG</Label>
                  <p className="text-sm text-muted-foreground">
                    Retrieval-Augmented Generation (RAG) increases the agent&apos;s maximum Knowledge Base size. The agent will have access to relevant pieces of attached Knowledge Base during answer generation.
                  </p>
                </div>
                <Switch 
                  checked={useRag}
                  onCheckedChange={setUseRag}
                />
              </div>
              
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add document
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Provide the agent with tools it can use to help users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">end_call</p>
                      <p className="text-sm text-muted-foreground">Gives agent the ability to end the call with the user.</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add tool
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Workspace Secrets</CardTitle>
              <CardDescription>Create and manage secure secrets that can be accessed across your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add secret
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="widget" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Widget Settings</CardTitle>
              <CardDescription>Configure how your agent appears on websites.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Widget Title</Label>
                <Input defaultValue="Chat with our AI Assistant" />
              </div>
              
              <div className="space-y-2">
                <Label>Widget Color</Label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500 cursor-pointer"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Widget Position</Label>
                <Select defaultValue="bottom-right">
                  <SelectTrigger>
                    <SelectValue placeholder="Select widget position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block">Show on Mobile</Label>
                  <p className="text-sm text-muted-foreground">Display widget on mobile devices</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>Add this code to your website to display the chat widget.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-xs">
                  &lt;{`script src="https://renvoice.ai/widget/cx58dgnxA5evM7ChJZE5.js"`}&gt;&lt;/script&gt;
                </code>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Copy Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
