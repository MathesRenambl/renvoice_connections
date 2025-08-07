'use client';
import React, { useState, useEffect } from "react";
import { Check, Users, Zap, Shield, Star, XCircle, Loader2, CheckCircle2, Bolt, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

// Credit configuration
const creditConfig = {
    // Credit to INR conversion rate (1 credit = 0.10 INR)
    creditToInr: 0.10,
    gst: 18,
    // Recommended credit packages
    recommendations: [
        { 
            credits: 1000, 
            title: "Starter Pack", 
            description: "Perfect for small businesses", 
            popular: false,
            bonus: 0
        },
        { 
            credits: 5000, 
            title: "Business Pack", 
            description: "Most popular choice", 
            popular: true,
            bonus: 500
        },
        { 
            credits: 10000, 
            title: "Enterprise Pack", 
            description: "For growing businesses", 
            popular: false,
            bonus: 1500
        },
        { 
            credits: 25000, 
            title: "Premium Pack", 
            description: "Maximum value", 
            popular: false,
            bonus: 5000
        }
    ],
    // Bonus credits based on purchase amount
    bonusRules: [
        { minCredits: 1000, bonusCredits: 100 },
        { minCredits: 5000, bonusCredits: 500 },
        { minCredits: 10000, bonusCredits: 1500 },
        { minCredits: 25000, bonusCredits: 5000 },
        { minCredits: 50000, bonusCredits: 12500 }
    ]
};

const PurchaseCredits = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [isCustomMode, setIsCustomMode] = useState(false);

    // State for the modal's multi-step payment flow
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle');

    // Calculate credits and pricing
    const calculateCreditsAndPricing = (inputCredits) => {
        const credits = parseInt(inputCredits) || 0;
        
        // Find applicable bonus
        const bonusRule = creditConfig.bonusRules
            .sort((a, b) => b.minCredits - a.minCredits)
            .find(rule => credits >= rule.minCredits);
        
        const bonusCredits = bonusRule ? bonusRule.bonusCredits : 0;
        const totalCredits = credits + bonusCredits;
        
        // Calculate pricing
        const baseAmount = credits * creditConfig.creditToInr;
        const gstAmount = Math.round((baseAmount * creditConfig.gst) / 100);
        const finalAmount = baseAmount + gstAmount;

        return {
            purchaseCredits: credits,
            bonusCredits,
            totalCredits,
            baseAmount: Math.round(baseAmount),
            gstAmount,
            finalAmount: Math.round(finalAmount)
        };
    };

    // Get current purchase details
    const getCurrentPurchase = () => {
        if (isCustomMode && customAmount) {
            return calculateCreditsAndPricing(customAmount);
        } else if (selectedPackage) {
            return calculateCreditsAndPricing(selectedPackage.credits);
        }
        return null;
    };

    const currentPurchase = getCurrentPurchase();

    // Handle package selection
    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setIsCustomMode(false);
        setCustomAmount("");
    };

    // Handle custom amount input
    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 1000000)) {
            setCustomAmount(value);
            setSelectedPackage(null);
        }
    };

    // Toggle custom mode
    const toggleCustomMode = () => {
        setIsCustomMode(!isCustomMode);
        if (!isCustomMode) {
            setSelectedPackage(null);
        } else {
            setCustomAmount("");
        }
    };

    // Reset modal to its initial state whenever it's closed
    useEffect(() => {
        if (!isModalOpen) {
            setTimeout(() => {
                setPaymentStatus('idle');
            }, 300);
        }
    }, [isModalOpen]);

    // Simulate payment verification
    const handlePaymentConfirmation = () => {
        setPaymentStatus('processing');
        setTimeout(() => {
            const didSucceed = Math.random() > 0.3;
            if (didSucceed) {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('failed');
            }
        }, 3000);
    };

    // Helper component for info rows in modal
    const InfoRow = ({ label, value }) => (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );

    // Renders the content inside the payment modal
    const renderModalContent = () => {
        switch (paymentStatus) {
            case 'processing':
                return (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-64">
                        <Loader2 className="w-16 h-16 animate-spin text-gray-500" />
                        <h3 className="text-xl font-semibold">Verifying Payment...</h3>
                        <p className="text-muted-foreground">Please wait while we confirm your transaction. Do not close this window.</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-64">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
                        <p className="text-muted-foreground">
                            Your credits have been added to your account. Thank you for your purchase!
                        </p>
                        <DialogClose asChild>
                            <Button className="mt-4">Close</Button>
                        </DialogClose>
                    </div>
                );
            case 'failed':
                return (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-64">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h3 className="text-xl font-semibold text-red-600">Payment Failed</h3>
                        <p className="text-muted-foreground">
                            We could not confirm your payment. Please try again or contact support.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Button variant="outline" onClick={() => setPaymentStatus('idle')}>Try Again</Button>
                            <DialogClose asChild>
                                <Button>Close</Button>
                            </DialogClose>
                        </div>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center">Confirm Your Payment</DialogTitle>
                            <DialogDescription className="text-center">
                                Transfer the total amount to complete your credit purchase
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-3 rounded-lg border p-4">
                                <InfoRow 
                                    label="Credits to Purchase" 
                                    value={`${currentPurchase.purchaseCredits.toLocaleString()} credits`} 
                                />
                                {currentPurchase.bonusCredits > 0 && (
                                    <InfoRow 
                                        label="Bonus Credits" 
                                        value={`${currentPurchase.bonusCredits.toLocaleString()} credits`} 
                                    />
                                )}
                                <InfoRow 
                                    label="Total Credits" 
                                    value={`${currentPurchase.totalCredits.toLocaleString()} credits`} 
                                />
                                <InfoRow label="Amount to be Paid" value={`₹${currentPurchase.finalAmount.toLocaleString()}`} />
                                <hr />
                                <InfoRow label="Beneficiary Name" value="Renambl Company Pvt. Ltd." />
                                <InfoRow label="Bank Name" value="KVB BANK" />
                                <InfoRow label="Account Number" value="123456789012" />
                                <InfoRow label="IFSC Code" value="KVBB0001234" />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="w-full sm:w-auto h-12 text-lg">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="button" className="w-full sm:w-auto h-12 text-lg" onClick={handlePaymentConfirmation}>
                                Confirm Payment
                            </Button>
                        </DialogFooter>
                    </>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Purchase Credits</h1>
                <p className="text-gray-600 mt-1">Top up your account with credits to power your business operations</p>
            </div>

            {/* <div className="text-left space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Purchase Credits</h1>
                <p className="text-xl text-gray-600">
                    Top up your account with credits to power your business operations
                </p>
            </div> */}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side - Credit Packages */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Toggle between packages and custom */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {isCustomMode ? "Custom Amount" : "Recommended Packages"}
                        </h2>
                        <Button 
                            variant="outline" 
                            onClick={toggleCustomMode}
                            className="text-sm"
                        >
                            {isCustomMode ? "View Packages" : "Enter Custom Amount"}
                        </Button>
                    </div>

                    {/* Custom Amount Input */}
                    {isCustomMode ? (
                        <Card className="p-6">
                            <div className="space-y-4">
                                <Label htmlFor="custom-credits" className="text-lg font-medium">
                                    Enter Credit Amount
                                </Label>
                                <Input
                                    id="custom-credits"
                                    type="number"
                                    placeholder="e.g., 3000"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    className="text-lg p-4"
                                    min="1"
                                    max="1000000"
                                />
                                <p className="text-sm text-gray-500">
                                    Enter any amount between 1 and 1,000,000 credits
                                </p>
                                
                                {customAmount && currentPurchase && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
                                        <h4 className="font-semibold text-blue-900 mb-2">Your Purchase Preview</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Credits:</span>
                                                <span className="font-medium">{currentPurchase.purchaseCredits.toLocaleString()}</span>
                                            </div>
                                            {currentPurchase.bonusCredits > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>Bonus Credits:</span>
                                                    <span className="font-medium">+{currentPurchase.bonusCredits.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-semibold">
                                                <span>Total Credits:</span>
                                                <span>{currentPurchase.totalCredits.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                                <span>Amount:</span>
                                                <span>₹{currentPurchase.finalAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ) : (
                        /* Recommended Packages */
                        <div className="grid md:grid-cols-2 gap-4">
                            {creditConfig.recommendations.map((pkg, index) => {
                                const pricing = calculateCreditsAndPricing(pkg.credits);
                                const isSelected = selectedPackage?.credits === pkg.credits;
                                
                                return (
                                    <Card 
                                        key={index}
                                        className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                                            isSelected 
                                                ? 'ring-2 ring-blue-500 shadow-lg' 
                                                : 'hover:ring-1 hover:ring-gray-300'
                                        } ${pkg.popular ? 'border-blue-500' : ''}`}
                                        onClick={() => handlePackageSelect(pkg)}
                                    >
                                        {pkg.popular && (
                                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-black">
                                                Most Popular
                                            </Badge>
                                        )}
                                        
                                        <CardHeader className="text-center pb-2">
                                            <CardTitle className="text-xl font-bold text-gray-900">
                                                {pkg.title}
                                            </CardTitle>
                                            <p className="text-gray-600 text-sm">{pkg.description}</p>
                                        </CardHeader>
                                        
                                        <CardContent className="text-center space-y-3">
                                            <div className="space-y-1">
                                                <div className="text-3xl font-bold text-black">
                                                    {pkg.credits.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-500">Credits</div>
                                            </div>
                                            
                                            {pricing.bonusCredits > 0 && (
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                                    <div className="text-green-600 font-semibold text-sm">
                                                        +{pricing.bonusCredits.toLocaleString()} Bonus Credits
                                                    </div>
                                                    <div className="text-xs text-green-700">
                                                        Total: {pricing.totalCredits.toLocaleString()} credits
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="space-y-1">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    ₹{pricing.finalAmount.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ₹{(pricing.finalAmount / pricing.totalCredits).toFixed(3)} per credit
                                                </div>
                                            </div>
                                        </CardContent>
                                        
                                        {isSelected && (
                                            <div className="absolute top-4 right-4">
                                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right Side - Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-8">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                            {currentPurchase ? (
                                <>
                                    <div className="space-y-3">
                                        <InfoRow 
                                            label="Credits" 
                                            value={`${currentPurchase.purchaseCredits.toLocaleString()}`} 
                                        />
                                        
                                        {currentPurchase.bonusCredits > 0 && (
                                            <InfoRow 
                                                label="Bonus Credits" 
                                                value={`+${currentPurchase.bonusCredits.toLocaleString()}`} 
                                            />
                                        )}
                                        
                                        <InfoRow 
                                            label="Total Credits" 
                                            value={`${currentPurchase.totalCredits.toLocaleString()}`} 
                                        />
                                        
                                        <hr />
                                        
                                        <InfoRow 
                                            label="Base Amount" 
                                            value={`₹${currentPurchase.baseAmount.toLocaleString()}`} 
                                        />
                                        
                                        <InfoRow 
                                            label={`GST (${creditConfig.gst}%)`} 
                                            value={`₹${currentPurchase.gstAmount.toLocaleString()}`} 
                                        />
                                        
                                        <hr />
                                        
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>Total Amount</span>
                                            <span className="text-2xl">₹{currentPurchase.finalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                                                Proceed to Checkout
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-2xl">
                                            {renderModalContent()}
                                        </DialogContent>
                                    </Dialog>
                                </>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>Select a package or enter a custom amount to see pricing</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Benefits Section */}
            <Card className="border-2 border-gray-200">
                <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        Why Purchase Credits?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Instant Access</h4>
                            <p className="text-gray-600">
                                Credits are added to your account immediately after payment confirmation
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Bonus Credits</h4>
                            <p className="text-gray-600">
                                Get bonus credits on bulk purchases - more credits, better value
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
                            <p className="text-gray-600">
                                Bank transfer ensures secure and verified transactions
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PurchaseCredits;