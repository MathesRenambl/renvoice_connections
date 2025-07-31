'use client';
import React, { useState, useEffect } from "react";
import { Check, Users, Zap, Shield, Star, XCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PageTitle from "@/components/ui/pageTitle";
import { Slider } from "@/components/ui/slider";
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

// Pricing calculator function (no changes)
const calculatePrice = (connections: number, isYearly: boolean = false) => {
    let pricePerConnection;
    if (connections <= 10) pricePerConnection = 22;
    else if (connections <= 50) pricePerConnection = 16;
    else if (connections <= 100) pricePerConnection = 14;
    else if (connections <= 250) pricePerConnection = 12;
    else if (connections <= 500) pricePerConnection = 11;
    else if (connections <= 1000) pricePerConnection = 9.5;
    else if (connections <= 2000) pricePerConnection = 8.5;
    else pricePerConnection = 7.5;
    
    const monthlyPrice = Math.round(connections * pricePerConnection);
    const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
    return isYearly ? yearlyPrice : monthlyPrice;
};

const PurchaseConnections = () => {
    const [sliderConnections, setSliderConnections] = useState([100]);
    const [customConnections, setCustomConnections] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [isYearly, setIsYearly] = useState(false);
    
    // State for the modal's multi-step payment flow
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
    const [transactionId, setTransactionId] = useState(''); // New state for transaction ID

    // Determine current connections from slider or custom input
    const currentConnections = showCustomInput && customConnections && parseInt(customConnections) >= 1
        ? parseInt(customConnections)
        : sliderConnections[0];

    const currentPrice = calculatePrice(currentConnections, isYearly);
    const monthlyPriceForYearly = calculatePrice(currentConnections, false);

    const handleCustomConnectionToggle = () => {
        setShowCustomInput(!showCustomInput);
        if (showCustomInput) {
            setCustomConnections("");
        }
    };
    
    // Reset modal to its initial state whenever it's closed
    useEffect(() => {
        if (!isModalOpen) {
            // Add a small delay to allow the closing animation to finish
            setTimeout(() => {
                setPaymentStatus('idle');
                setTransactionId(''); // Clear transaction ID on close
            }, 300);
        }
    }, [isModalOpen]);

    // Simulate payment verification
    const handlePaymentConfirmation = () => {
        if (!transactionId) {
            alert('Please enter a Transaction ID.');
            return;
        }
        setPaymentStatus('processing');
        setTimeout(() => {
            // Randomly determine if payment was successful or failed
            const didSucceed = Math.random() > 0.3; // 70% chance of success
            if (didSucceed) {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('failed');
            }
        }, 3000); // 3-second delay to simulate processing
    };

    // Helper component for styling feature items
    const FeatureItem = ({ icon: Icon, color, children }: { icon: React.ElementType, color: string, children: React.ReactNode }) => (
        <div className="flex items-center justify-center">
            <Icon className={`w-4 h-4 mr-2 ${color}`} />
            {children}
        </div>
    );
    
    // Helper for styling info rows in the modal
    const InfoRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
    
    // Renders the content inside the payment modal based on the current status
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
                        <p className="text-muted-foreground">Your plan has been activated. Thank you for your purchase!</p>
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
                        <p className="text-muted-foreground">We could not confirm your payment. Please try again or contact support if the issue persists.</p>
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
                                To activate your plan, please transfer the total amount to the bank details below and enter the transaction ID.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-3 rounded-lg border p-4">
                               <InfoRow label="Plan" value={`${currentConnections.toLocaleString()} Connections (${isYearly ? 'Yearly' : 'Monthly'})`} />
                               <InfoRow label="Amount to be Paid" value={`₹${currentPrice.toLocaleString()}`} />
                               <hr/>
                               <InfoRow label="Beneficiary Name" value="Our Company Pvt. Ltd." />
                               <InfoRow label="Bank Name" value="Global Trust Bank" />
                               <InfoRow label="Account Number" value="123456789012" />
                               <InfoRow label="IFSC Code" value="GTB0001234" />
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="transaction-id" className="font-medium text-gray-700">Transaction ID</Label>
                                <Input 
                                    id="transaction-id" 
                                    placeholder="Enter your transaction ID" 
                                    value={transactionId} 
                                    onChange={(e) => setTransactionId(e.target.value)} 
                                    className="text-lg"
                                />
                            </div> */}
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
        <div>
            <PageTitle
                title="Purchase Connections"
                description="Scale your business with our flexible connection plans. Choose the perfect package for your needs."
            />
            
            <Card className="border-2 border-gray-300 mb-8">
                <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-black mb-6 text-center">Why Choose Our Connection Plans?</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                       <div className="text-center"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Zap className="w-6 h-6 text-black" /></div><h4 className="font-semibold text-black mb-2">Lightning Fast</h4><p className="text-gray-600 text-sm">Connect and sync your data in real-time.</p></div>
                       <div className="text-center"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Shield className="w-6 h-6 text-black" /></div><h4 className="font-semibold text-black mb-2">Secure & Reliable</h4><p className="text-gray-600 text-sm">Enterprise-grade security with 99.9% uptime.</p></div>
                       <div className="text-center"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4"><Users className="w-6 h-6 text-black" /></div><h4 className="font-semibold text-black mb-2">Scalable</h4><p className="text-gray-600 text-sm">Upgrade or downgrade as your business grows.</p></div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="monthly" className="w-full" onValueChange={(value) => setIsYearly(value === 'yearly')}>
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12 mb-8">
                    <TabsTrigger value="monthly" className="text-base font-medium">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly" className="text-base font-medium">Yearly <Badge variant="secondary" className="ml-2 bg-green-600 text-white text-xs hover:bg-green-700">Save 20%</Badge></TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* LEFT SIDE (Plan selection) */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-2 border-gray-200">
                            <CardHeader className="text-center pb-4"><CardTitle className="text-2xl font-bold text-gray-900">Choose Your Connections</CardTitle><p className="text-gray-600">Adjust the slider or enter a custom amount</p></CardHeader>
                            <CardContent className="space-y-6 p-6">
                                {!showCustomInput ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center"><Label className="text-lg font-medium text-gray-900">Connections: {sliderConnections[0].toLocaleString()}</Label><Button variant="link" onClick={handleCustomConnectionToggle}>Enter Custom Amount</Button></div>
                                        <Slider value={sliderConnections} onValueChange={setSliderConnections} max={10000} min={1} step={1} />
                                        <div className="flex justify-between text-sm text-gray-500"><span>1</span><span>10,000</span></div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center"><Label htmlFor="custom-connections" className="text-lg font-medium text-gray-900">Custom Connections</Label><Button variant="link" onClick={handleCustomConnectionToggle}>Use Slider</Button></div>
                                        <Input id="custom-connections" type="number" placeholder="Enter connections (e.g., 5000)" value={customConnections} onChange={(e) => setCustomConnections(e.target.value)} min="1" className="text-center text-lg" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="relative border-2 border-gray-500 shadow-md">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2"><Badge className="bg-gray-800 text-white px-4 py-1 text-sm"><Star className="w-4 h-4 mr-2" />Your Selected Plan</Badge></div>
                            <CardHeader className="text-center pt-8 pb-2"><CardTitle className="text-3xl font-bold text-gray-900">{currentConnections.toLocaleString()} Connections</CardTitle><p className="text-sm text-gray-600">{isYearly ? "Annual plan with maximum savings" : "Flexible monthly plan"}</p></CardHeader>
                            <CardContent className="text-center space-y-4 py-6">
                                <div className="space-y-2 text-sm text-gray-700">
                                    <FeatureItem icon={Check} color="text-green-500">Up to {currentConnections.toLocaleString()} active connections</FeatureItem>
                                    <FeatureItem icon={Shield} color="text-blue-500">Enterprise security {isYearly && '& compliance'}</FeatureItem>
                                    <FeatureItem icon={Zap} color="text-yellow-500">{isYearly ? "Dedicated infrastructure & SLA" : "Real-time sync"}</FeatureItem>
                                    <FeatureItem icon={Users} color="text-purple-500">{isYearly ? "Dedicated success manager" : "24/7 priority support"}</FeatureItem>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT SIDE (Order Summary) */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8 border-2 border-gray-300 shadow-lg">
                            <CardHeader><CardTitle className="text-xl font-semibold">Order Summary</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <InfoRow label="Plan Type" value={isYearly ? "Yearly" : "Monthly"} />
                                <InfoRow label="Connections" value={currentConnections.toLocaleString()} />
                                {isYearly && (
                                    <>
                                        <hr/><div className="flex justify-between"><span className="text-gray-600">Original Price</span><span className="line-through">₹{(monthlyPriceForYearly * 12).toLocaleString()}</span></div>
                                        <div className="flex justify-between text-green-600"><span className="font-semibold">Discount (20%)</span><span className="font-semibold">- ₹{((monthlyPriceForYearly * 12) - currentPrice).toLocaleString()}</span></div>
                                    </>
                                )}
                                <hr/>
                                <div className="flex justify-between items-center text-lg"><span className="font-bold">Total</span><span className="font-bold text-2xl">₹{currentPrice.toLocaleString()}</span></div>
                                <p className="text-xs text-gray-500 text-center pt-2">Prices are in INR and inclusive of all applicable taxes.</p>
                            </CardContent>
                            <CardFooter>
                                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-gray-800 text-white h-12 text-lg hover:bg-gray-700">Proceed to Checkout</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl">
                                        {renderModalContent()}
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default PurchaseConnections;