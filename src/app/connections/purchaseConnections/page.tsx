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
import { Checkbox } from "@/components/ui/checkbox";
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

// Service configuration
const serviceConfig = {
    discount: [
        { minConnection: 1000, discount: 10 },
        { minConnection: 2000, discount: 20 }
    ],
    service: [
        { name: "calls", duration: 12, credit: 10000, amount: 100 },
        { name: "analysis", duration: 12, amount: 150 },
        { name: "f1", duration: 12, amount: 50 },
        { name: "f2", duration: 12, amount: 99 },
        { name: "f3", duration: 12, amount: 199 }
    ],
    activateConnection: 900,
    gst: 18
};

// Pricing calculator function based on calls service
const calculatePrice = (connections: number, isYearly: boolean = false) => {
    const callsService = serviceConfig.service.find(s => s.name === 'calls');
    const baseAmount = callsService ? callsService.amount : 100;
    
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
    const [selectedServices, setSelectedServices] = useState({ calls: true }); // calls is always checked

    // State for the modal's multi-step payment flow
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle');
    const [transactionId, setTransactionId] = useState('');

    // Determine current connections from slider or custom input
    const currentConnections = showCustomInput && customConnections && parseInt(customConnections) >= 1
        ? parseInt(customConnections)
        : sliderConnections[0];

    const currentPrice = calculatePrice(currentConnections, isYearly);
    const monthlyPriceForYearly = calculatePrice(currentConnections, false);
    
    // Calculate services total (excluding calls which is included in base price)
    const calculateServicesTotal = () => {
        let total = 0;
        Object.keys(selectedServices).forEach(serviceName => {
            if (selectedServices[serviceName] && serviceName !== 'calls') {
                const service = serviceConfig.service.find(s => s.name === serviceName);
                if (service) {
                    total += service.amount;
                }
            }
        });
        return total;
    };

    // Calculate discount based on active connections + new connections
    const calculateDiscount = () => {
        const totalConnections = serviceConfig.activateConnection + currentConnections;
        const applicableDiscount = serviceConfig.discount
            .sort((a, b) => b.minConnection - a.minConnection)
            .find(d => totalConnections >= d.minConnection);
        return applicableDiscount ? applicableDiscount.discount : 0;
    };

    const servicesTotal = calculateServicesTotal();
    const discountPercentage = calculateDiscount();
    const discountAmount = Math.round((servicesTotal * discountPercentage) / 100);
    const servicesAfterDiscount = servicesTotal - discountAmount;
    
    // Fixed GST calculation
    const gstAmount = Math.round((currentPrice * serviceConfig.gst) / 100);
    const finalTotal = currentPrice + servicesAfterDiscount + gstAmount;

    const handleServiceToggle = (serviceName) => {
        if (serviceName === 'calls') {
            return; // Calls service cannot be unchecked
        }
        setSelectedServices(prev => ({
            ...prev,
            [serviceName]: !prev[serviceName]
        }));
    };
    const handleCustomConnectionToggle = () => {
        setShowCustomInput(!showCustomInput);
        if (showCustomInput) {
            setCustomConnections("");
        }
    };

    const handleCustomConnectionChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value <= 100000) {
            setCustomConnections(e.target.value);
        }
    };

    // Reset modal to its initial state whenever it's closed
    useEffect(() => {
        if (!isModalOpen) {
            setTimeout(() => {
                setPaymentStatus('idle');
                setTransactionId('');
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
            const didSucceed = Math.random() > 0.3;
            if (didSucceed) {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('failed');
            }
        }, 3000);
    };

    // Helper component for styling feature items
    const FeatureItem = ({ icon: Icon, color, children }) => (
        <div className="flex items-center justify-center">
            <Icon className={`w-4 h-4 mr-2 ${color}`} />
            {children}
        </div>
    );

    // Helper for styling info rows in the modal
    const InfoRow = ({ label, value }) => (
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
                                <InfoRow label="Amount to be Paid" value={`₹${finalTotal.toLocaleString()}`} />
                                <hr />
                                <InfoRow label="Beneficiary Name" value="Our Company Pvt. Ltd." />
                                <InfoRow label="Bank Name" value="Global Trust Bank" />
                                <InfoRow label="Account Number" value="123456789012" />
                                <InfoRow label="IFSC Code" value="GTB0001234" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transaction-id" className="font-medium text-gray-700">Transaction ID</Label>
                                <Input
                                    id="transaction-id"
                                    placeholder="Enter your transaction ID"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="text-lg"
                                />
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

    const totalConnections = serviceConfig.activateConnection + currentConnections;

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

                <Card className="border-2 border-gray-200">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900">Choose Your Connections</CardTitle>
                        <p className="text-gray-600">Adjust the slider or enter a custom amount</p>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        {!showCustomInput ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-lg font-medium text-gray-900">New Connections: {sliderConnections[0].toLocaleString()}</Label>
                                    <Button variant="link" onClick={handleCustomConnectionToggle}>Enter Custom Amount</Button>
                                </div>
                                <Slider value={sliderConnections} onValueChange={setSliderConnections} max={10000} min={1} step={1} />
                                <div className="flex justify-between text-sm text-gray-500"><span>1</span><span>10,000</span></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="custom-connections" className="text-lg font-medium text-gray-900">Custom New Connections</Label>
                                    <Button variant="link" onClick={handleCustomConnectionToggle}>Use Slider</Button>
                                </div>
                                <Input id="custom-connections" type="number" placeholder="Enter connections (e.g., 5000 upto 100000)" value={customConnections} onChange={handleCustomConnectionChange} min="1" max="10000000" className="text-center text-lg" />
                            </div>
                        )}
                        
                        {/* Active Connections Display */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-blue-900">Current Active Connections</h4>
                                    <p className="text-blue-700 text-sm">Your existing connection count</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-blue-900">{serviceConfig.activateConnection.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Total Connections Display */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-green-900">Total Connections After Purchase</h4>
                                    <p className="text-green-700 text-sm">Active + New connections</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-green-900">{totalConnections.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                
                <div className="mt-4">
                    {/* LEFT SIDE (Plan selection) */}
                    <div className="grid grid-flow-col h-full gap-4">
                        {/* Services Table */}
                        <Card className="border-2 border-gray-200 w-full h-full">
                            <CardHeader className="p-6 pb-2">
                                <CardTitle className="text-xl font-bold text-gray-900">Services & Add-ons</CardTitle>
                                <p className="text-gray-600">Calls service is included by default. Select additional services to enhance your plan</p>
                                <h3 className="text-2xl font-bold text-gray-900">New Connections: {currentConnections.toLocaleString()}</h3>
                                <p className="text-sm text-gray-600">{isYearly ? "Annual plan with maximum savings" : "Flexible monthly plan"}</p>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    {discountPercentage > 0 && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                                            <p className="text-green-700 text-sm font-medium">
                                                🎉 You qualify for {discountPercentage}% discount on add-on services with {totalConnections.toLocaleString()} total connections!
                                            </p>
                                        </div>
                                    )}
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200">
                                                <th className="text-left py-3 px-4 font-semibold">Select</th>
                                                <th className="text-left py-3 px-4 font-semibold">Service</th>
                                                <th className="text-left py-3 px-4 font-semibold">Minutes</th>
                                                <th className="text-left py-3 px-4 font-semibold">Amount (₹)</th>
                                                <th className="text-left py-3 px-4 font-semibold">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceConfig.service.map((service) => (
                                                <tr key={service.name} className={`border-b border-gray-100 hover:bg-gray-50 ${service.name === 'calls' ? 'bg-blue-50' : ''}`}>
                                                    <td className="py-3 px-4">
                                                        <Checkbox
                                                            checked={selectedServices[service.name] || false}
                                                            onCheckedChange={() => handleServiceToggle(service.name)}
                                                            disabled={service.name === 'calls'}
                                                        />
                                                        {service.name === 'calls' && (
                                                            <Badge variant="secondary" className="ml-2 text-xs bg-blue-600 text-white">
                                                                Included
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 font-medium capitalize">
                                                        {service.name === 'analysis' ? 'AI Analysis' : 
                                                         service.name === 'calls' ? 'Calls (Base Service)' : service.name}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {service.credit ? service.credit.toLocaleString() : '-'}
                                                    </td>
                                                    <td className="py-3 px-4 font-semibold">
                                                        {service.name === 'calls' ? (
                                                            <span className="text-blue-600">Included in base price</span>
                                                        ) : (
                                                            `₹${service.amount}`
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {service.duration} months
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </CardContent>
                        </Card>

                        {/* RIGHT SIDE (Order Summary) */}
                        <div className=" h-full">
                            <Card className="sticky top-8 border-2 border-gray-300 shadow-lg">
                                <CardHeader><CardTitle className="text-xl font-semibold">Order Summary</CardTitle></CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <InfoRow label="Plan Type" value={isYearly ? "Yearly" : "Monthly"} />
                                    <InfoRow label="New Connections" value={currentConnections.toLocaleString()} />
                                    <InfoRow label="Active Connections" value={serviceConfig.activateConnection.toLocaleString()} />
                                    <InfoRow label="Total Connections" value={totalConnections.toLocaleString()} />
                                    
                                    <hr />
                                    
                                    {isYearly && (
                                        <>
                                            <div className="flex justify-between"><span className="text-gray-600">Original Price</span><span className="line-through">₹{(monthlyPriceForYearly * 12).toLocaleString()}</span></div>
                                            <div className="flex justify-between text-green-600"><span className="font-semibold">Yearly Discount (20%)</span><span className="font-semibold">- ₹{((monthlyPriceForYearly * 12) - currentPrice).toLocaleString()}</span></div>
                                        </>
                                    )}
                                    <InfoRow label="Base Connection Cost (incl. Calls)" value={`₹${currentPrice.toLocaleString()}`} />
                                    
                                    {servicesTotal > 0 && (
                                        <>
                                            <InfoRow label="Add-on Services" value={`₹${servicesTotal.toLocaleString()}`} />
                                            {discountPercentage > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span className="font-semibold">Service Discount ({discountPercentage}%)</span>
                                                    <span className="font-semibold">- ₹{discountAmount.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <InfoRow label="Services After Discount" value={`₹${servicesAfterDiscount.toLocaleString()}`} />
                                        </>
                                    )}
                                    
                                    <InfoRow label={`GST (${serviceConfig.gst}%)`} value={`₹${gstAmount.toLocaleString()}`} />

                                    <hr />
                                    <div className="flex justify-between items-center text-lg"><span className="font-bold">Total</span><span className="font-bold text-2xl">₹{finalTotal.toLocaleString()}</span></div>
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


                </div>
            </Tabs>
        </div>
    );
};

export default PurchaseConnections;