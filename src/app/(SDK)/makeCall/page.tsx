"use client";

import React, { useState } from "react";
import { Phone, PhoneCall, Info, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAlert } from "@/hooks/alertHook";
import AlertMsg from "@/components/alert/alert";
import { useAppContext } from "@/hooks/context";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { set } from "react-hook-form";

export default function PhoneCallInterface() {
  const { URL } = useAppContext();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { alert, showAlert, hideAlert } = useAlert();

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\+?[1-9]\d{9}$/;

    return phoneRegex.test(number.replace(/[\s\-\(\)]/g, ""));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValidPhone(validatePhoneNumber(value) || value === "");
  };

  // const handleMakeCall = async () => {
  //   if (phoneNumber && topic && isValidPhone) {
  //     setIsLoading(true);
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     setIsLoading(false);
  //     alert(`Call initiated to ${phoneNumber} regarding: ${topic}`);
  //   }
  const handleMakeCall = async () => {
    if (phoneNumber && topic && isValidPhone) {
      setIsLoading(true);
      // Simulate API call
      try {
        const response = await fetch(`${URL}/internal/makeCall`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: "0" + phoneNumber,
            topic: parseInt(353931 + topic),
            language: "tamil",
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Call started:", data);
          setIsLoading(false);
          setPhoneNumber("");
          setTopic("");
          setIsValidPhone(true);
          showAlert(`Call initiated to ${phoneNumber}`, "success");
          return data;
        } else {
          showAlert("Failed to start call. Please try again.", "error");
          return null;
        }
      } catch (error: any) {
        showAlert("Failed to start call. Please try again.", "error");
        return null;
      }
    }
  };

  const isFormValid = phoneNumber && topic && isValidPhone;

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 w-screen">
      <div className="w-full max-w-lg">
        {/* Header */}

        {/* Main Card */}
        <Card className="border-0 shadow-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-center">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />

                <span>Initiate Call</span>
              </div>
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter details to connect with your contact
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Instructions */}
            <Alert className="border-l-4 border-l-black bg-gray-50 border-gray-200">
              <Info className="h-5 w-5 text-black" />
              <AlertDescription className="text-gray-700">
                <div className="space-y-1">
                  <div className="font-medium">Quick Instructions:</div>
                  <div className="text-sm">
                    • Enter phone number with country code (e.g., 9876543210)
                    <br />
                    • Add topic or reference ID for call context
                    <br />• Click the call button to connect instantly
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {/* Phone Number Input */}
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-800 flex items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`h-12 text-lg border-2 transition-all duration-200 ${
                    !isValidPhone
                      ? "border-red-400 focus:border-red-500"
                      : phoneNumber && isValidPhone
                      ? "border-green-400 focus:border-green-500"
                      : "border-gray-300 focus:border-black"
                  } focus:ring-0 text-gray-900 placeholder:text-gray-400`}
                />
                {phoneNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidPhone ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {!isValidPhone && phoneNumber && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Please enter a valid phone number
                </p>
              )}
            </div>

            {/* Topic Input */}
            <div className="space-y-3">
              <Label
                htmlFor="topic"
                className="text-sm font-semibold text-gray-800 flex items-center"
              >
                <Info className="h-4 w-4 mr-2" />
                Topic / Reference ID
              </Label>
              <Input
                id="topic"
                type="text"
                placeholder="e.g., 01 or Support Request"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-12 text-lg border-2 border-gray-300 focus:border-black focus:ring-0 text-gray-900 placeholder:text-gray-400 transition-all duration-200"
              />
            </div>

            {/* Call Button */}
            <div className="pt-4">
              <Button
                onClick={handleMakeCall}
                disabled={!isFormValid || isLoading}
                className={`w-full h-14 text-lg font-semibold transition-all duration-300 transform ${
                  isFormValid && !isLoading
                    ? "bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PhoneCall className="mr-3 h-6 w-6" />
                    Make Call
                  </div>
                )}
              </Button>
            </div>

            {/* Status Indicator */}
            <div className="text-center py-2">
              {isFormValid ? (
                <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Ready to connect
                </div>
              ) : (
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Complete all fields to continue
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {alert && <AlertMsg alert={alert} hideAlert={hideAlert} />}
    </div>
  );
}
