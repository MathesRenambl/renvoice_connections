"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { getFromLocalStorage } from "../encryption/encryption";
import { useAppContext } from "@/hooks/context";

function PlanCard({
  planData,
  handleViewClick,
  onStart,
  children = null,
  orgId,
  region,
  onPaymentSuccess,
}: {
  planData: any;
  handleViewClick?: (arg: any) => void;
  onStart?: () => any;
  children?: React.ReactNode;
  orgId: string;
  region?: string;
  onPaymentSuccess: (paymentData: any) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { URL } = useAppContext();
  const [orgid, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = getFromLocalStorage("orgId");
    setOrgId(storedOrgId);
  }, []);

  const getPrice = () => {
    if (region === "domestic") {
      return planData.planDomesticPrice;
    }
    return planData.planInternationalPrice;
  };

  const handleConfirm = async () => {
    const orgId = getFromLocalStorage("orgId");
    const token = getFromLocalStorage("token");
    const price = getPrice();

    const payload = {
      paymentAmount: price,
      paymentMethod: "card",
      orgId,
      planId: planData.planId,
    };

    try {
      const res = await fetch(`${URL}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        onPaymentSuccess({
          ...payload,
          status: "Paid",
          date: new Date().toISOString(),
          planName: planData.planName,
        });
      }
    } catch (err) {
      console.error("Payment failed", err);
    }

    setOpenDialog(false);
  };

  return (
    <>
      <Card className="border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl font-semibold">
            {planData.planName}
          </CardTitle>
          {planData.showPrice && (
            <div className="mt-2">
              {planData.discount && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {planData.discount}
                </span>
              )}
              <div className="text-3xl font-bold mt-1">
                {region === "domestic" ? "₹" : "$"}
                {getPrice()}
              </div>
              {planData.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {region === "domestic" ? "₹" : "$"}
                  {planData.originalPrice}
                </div>
              )}
              <div className="text-sm text-gray-500 mt-1">
                per {planData.planDuration}
              </div>
            </div>
          )}
          <CardDescription className="text-sm text-gray-600 mt-3">
            {planData.planDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex items-center justify-center mb-4">
            <span className="bg-blue-100 text-xs font-medium px-3 py-1 rounded-full">
              {planData.planCredits} credits
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {planData.planFeatures?.map((feature: any, index: number) => (
              <div key={index} className="flex items-start text-sm text-gray-700">
                <Check className="text-green-600 w-4 h-4 mt-0.5 mr-2" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600 space-y-1 border-t pt-4">
            <div>Max Agents: {planData.maxAgents}</div>
            <div>Max Workflows: {planData.maxWorkflows}</div>
            <div>Max Phone Numbers: {planData.maxPhoneNumbers}</div>
          </div>

          {!planData.contactForm ? (
            <Button
              className="mt-6 w-full font-medium py-2 rounded-md transition hover:shadow-md"
              onClick={() => setOpenDialog(true)}
            >
              GET STARTED
            </Button>
          ) : (
            <Button
              className="mt-6 w-full font-medium py-2 rounded-md transition hover:shadow-md"
              onClick={handleViewClick}
            >
              CONTACT US
            </Button>
          )}
        </CardContent>

        {children && (
          <CardFooter className="flex justify-between pt-4 border-t mt-6">
            {React.Children.map(children, (child) => (
              <div>{child}</div>
            ))}
          </CardFooter>
        )}
      </Card>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        planName={planData.planName}
        paymentAmount={getPrice()}
      />
    </>
  );
}

export default PlanCard;
