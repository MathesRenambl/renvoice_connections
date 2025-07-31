'use client';

// import { useState, useEffect } from "react";
// import Container from '@/components/ui/container'
// import PageTitle from '@/components/ui/pageTitle'
// import PlanCard from '@/components/ui/planCard';
// import { ConfirmDialog } from '@/components/ui/confirmDialog';
// import { getFromLocalStorage } from "@/components/encryption/encryption";

// const plans = [
//     {
//       "planId": "plan_001",
//       "planName": "Basic",
//       "planDescription": "Ideal for beginners exploring AI voice automation",
//       "planInternationalPrice": 10,
//       "showPrice": true,
//       "planCredits": 500,
//       "contactForm": false,
//       "planDomesticPrice": 799,
//       "planDuration": "1 month",
//       "maxAgents": 1,
//       "maxWorkflows": 1,
//       "maxPhoneNumbers": 1,
//       "planFeatures": [
//         {
//           "category": "credits",
//           "text": "500 Total Credits"
//         },
//         {
//           "category": "agents",
//           "text": "1 Agent"
//         },
//         {
//           "category": "workflows",
//           "text": "1 Workflow"
//         },
//         {
//           "category": "phoneNumbers",
//           "text": "Max 1 Phone Number"
//         },
//         {
//           "category": "call",
//           "text": "10 Per minute"
//         },
//         {
//           "category": "call",
//           "text": "3 Per minute / Self API"
//         },
//         {
//           "category": "sdk",
//           "text": "3 Per minute"
//         },
//         {
//           "category": "sdk",
//           "text": "2 Per Conversation"
//         }
//       ]
//     },
//     {
//       "planId": "plan_002",
//       "planName": "Standard",
//       "planDescription": "Ideal for small businesses scaling their communication",
//       "planInternationalPrice": 199,
//       "showPrice": true,
//       "planCredits": 1000,
//       "contactForm": false,
//       "planDomesticPrice": 2499,
//       "planDuration": "1 month",
//       "maxAgents": 2,
//       "maxWorkflows": 2,
//       "maxPhoneNumbers": 2,
//       "planFeatures": [
//         {
//           "category": "credits",
//           "text": "1000 Total Credits"
//         },
//         {
//           "category": "agents",
//           "text": "2 Agents"
//         },
//         {
//           "category": "workflows",
//           "text": "2 Workflows"
//         },
//         {
//           "category": "phoneNumbers",
//           "text": "Max 3 Phone Numbers"
//         },
//         {
//           "category": "call",
//           "text": "10 Per minute"
//         },
//         {
//           "category": "call",
//           "text": "3 Per minute / Self API"
//         },
//         {
//           "category": "sdk",
//           "text": "3 Per minute"
//         },
//         {
//           "category": "sdk",
//           "text": "2 Per Conversation"
//         }
//       ]
//     },
//     {
//       "planId": "plan_003",
//       "planName": "Premium",
//       "planDescription": "Advanced features built for growing, complex businesses",
//       "planInternationalPrice": 299,
//       "showPrice": true,
//       "contactForm": false,
//       "planDomesticPrice": 9999,
//       "planCredits": 1000,
//       "planDuration": "1 month",
//       "maxAgents": 3,
//       "maxWorkflows": 3,
//       "maxPhoneNumbers": 3,
//       "planFeatures": [
//         {
//           "category": "credits",
//           "text": "1000 Total Credits"
//         },
//         {
//           "category": "agents",
//           "text": "3 Agents"
//         },
//         {
//           "category": "workflows",
//           "text": "3 Workflows"
//         },
//         {
//           "category": "phoneNumbers",
//           "text": "Max 10 Phone Numbers"
//         },
//         {
//           "category": "call",
//           "text": "10 Per minute"
//         },
//         {
//           "category": "call",
//           "text": "3 Per minute / Self API"
//         },
//         {
//           "category": "sdk",
//           "text": "3 Per minute"
//         },
//         {
//           "category": "sdk",
//           "text": "2 Per Conversation"
//         }
//       ]
//     },
//     {
//       "planId": "plan_004",
//       "planName": "Enterprise",
//       "planDescription": "Scalable enterprise platform for limitless growth potential",
//       "planInternationalPrice": 999,
//       "showPrice": true,
//       "contactForm": false,
//       "planDomesticPrice": 50000,
//       "planCredits": 1000,
//       "planDuration": "1 month",
//       "maxAgents": 4,
//       "maxWorkflows": 4,
//       "maxPhoneNumbers": 4,
//       "planFeatures": [
//         {
//           "category": "credits",
//           "text": "1000 Total Credits"
//         },
//         {
//           "category": "agents",
//           "text": "4 Agents"
//         },
//         {
//           "category": "workflows",
//           "text": "4 Workflows"
//         },
//         {
//           "category": "phoneNumbers",
//           "text": "Min 20 Phone Numbers"
//         },
//         {
//           "category": "call",
//           "text": "10 Per minute"
//         },
//         {
//           "category": "call",
//           "text": "3 Per minute / Self API"
//         },
//         {
//           "category": "sdk",
//           "text": "3 Per minute"
//         },
//         {
//           "category": "sdk",
//           "text": "2 Per Conversation"
//         }
//       ]
//     }
// ];

// interface PricingPlan {
//   id: string;
//   plan: string;
//   planType: string;
//   planDes: string;
//   credits: string;
//   price: number;
//   additionalRate: string;
//   hosting: string;
//   benefits: string[];
// }

// function Plan() {
//   const [orgId, setOrgId] = useState<string | null>(null);  
//   const [showDialog, setShowDialog] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
//   const [billingHistory, setBillingHistory] = useState<any[]>([]);
//   const [region, setRegion] = useState<"domestic" | "international">("domestic");

//   useEffect(() => {
//     const storedOrgId = getFromLocalStorage("orgId");  
//     const storedRegion = getFromLocalStorage("region") || "domestic";
//     setOrgId(storedOrgId);
//     setRegion(storedRegion as "domestic" | "international");
//   }, []);

//   // Transform plans data to match PlanCard expected format
//   const transformedPlans = plans.map(plan => ({
//     id: plan.planId,
//     plan: plan.planName,
//     planType: plan.planName === "Enterprise" ? "Popular" : "Standard",
//     planDes: plan.planDescription,
//     credits: plan.planCredits.toString(),
//     price: region === "domestic" ? plan.planDomesticPrice : plan.planInternationalPrice,
//     additionalRate: "",
//     hosting: "",
//     benefits: plan.planFeatures.map(feature => feature.text)
//   }));

//   return (
//     <Container>
//       <>
//         <PageTitle
//           title="Pricing"
//           description="Plans built for individuals and businesses of all sizes"
//         />
        
//         {/* Region Toggle */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-gray-100 p-1 rounded-lg">
//             <button
//               onClick={() => setRegion("domestic")}
//               className={`px-4 py-2 rounded-md transition-all ${
//                 region === "domestic" 
//                   ? "bg-white shadow-sm text-gray-900" 
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Domestic (₹)
//             </button>
//             <button
//               onClick={() => setRegion("international")}
//               className={`px-4 py-2 rounded-md transition-all ${
//                 region === "international" 
//                   ? "bg-white shadow-sm text-gray-900" 
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               International ($)
//             </button>
//           </div>
//         </div>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
//           {plans?.map((item) => (
//             <PlanCard
//                 key={item.planId}
//                 planData={item}
//                 orgId={orgId || ""}
//                 region={region}
//                 onPaymentSuccess={(paymentData) => {
//                   console.log("Payment successful:", paymentData);
//                   setBillingHistory(prev => [...prev, paymentData]);
//                 }}
//             />
//           ))}
//         </div>
//       </>
//     </Container>
//   );
// }

// export default Plan;

import React, { useState } from "react";
import { Check, X } from "lucide-react";

const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState('Cloud');
  const [region, setRegion] = useState('domestic');

  const plans = {
    Developer: {
      priceInr: "₹500",
      priceUsd: "$6",
      billing: "/month",
      description: "Perfect for individual developers and projects",
      isPopular: false,
      buttonText: "Subscribe",
      credits: "50 credits included",
      features: {
        "Monthly credits included": {
          inr: "50 credits",
          usd: "50 credits"
        },
        "Base model cost": {
          inr: "₹500",
          usd: "$6"
        },
        "Incoming calls": {
          inr: "₹10 per minute",
          usd: "$0.12 per minute"
        },
        "Outgoing calls": {
          inr: "₹10 per minute",
          usd: "$0.12 per minute"
        },
        "Call recording": {
          inr: "₹5 per minute",
          usd: "$0.06 per minute"
        },
        "Sentiment analysis": {
          inr: "₹5 per minute",
          usd: "$0.06 per minute"
        },
        "Gender detection": {
          inr: "₹5 per minute",
          usd: "$0.06 per minute"
        },
        "Estimated total": {
          inr: "₹535",
          usd: "$6.50"
        }
      }
    },
    Cloud: {
      priceInr: "₹1000",
      priceUsd: "$12",
      billing: "/month",
      description: "Ideal for growing businesses, remote teams, and startups",
      isPopular: true,
      buttonText: "Subscribe",
      credits: "150 credits included",
      features: {
        "Monthly credits included": {
          inr: "150 credits",
          usd: "150 credits"
        },
        "Base model cost": {
          inr: "₹1000",
          usd: "$12"
        },
        "Incoming calls": {
          inr: "₹8 per minute",
          usd: "$0.10 per minute"
        },
        "Outgoing calls": {
          inr: "₹8 per minute",
          usd: "$0.10 per minute"
        },
        "Call recording": {
          inr: "₹4 per minute",
          usd: "$0.05 per minute"
        },
        "Sentiment analysis": {
          inr: "₹4 per minute",
          usd: "$0.05 per minute"
        },
        "Gender detection": {
          inr: "₹4 per minute",
          usd: "$0.05 per minute"
        },
        "Estimated total": {
          inr: "₹1028",
          usd: "$12.30"
        }
      }
    },
    Enterprise: {
      priceInr: "₹2000",
      priceUsd: "$24",
      billing: "/month",
      description: "For large organizations with high volume needs",
      isPopular: false,
      buttonText: "Contact Sales",
      credits: "500 credits included",
      features: {
        "Monthly credits included": {
          inr: "500 credits",
          usd: "500 credits"
        },
        "Base model cost": {
          inr: "₹2000",
          usd: "$24"
        },
        "Incoming calls": {
          inr: "₹5 per minute",
          usd: "$0.06 per minute"
        },
        "Outgoing calls": {
          inr: "₹5 per minute",
          usd: "$0.06 per minute"
        },
        "Call recording": {
          inr: "₹2 per minute",
          usd: "$0.025 per minute"
        },
        "Sentiment analysis": {
          inr: "₹2 per minute",
          usd: "$0.025 per minute"
        },
        "Gender detection": {
          inr: "₹2 per minute",
          usd: "$0.025 per minute"
        },
        "Estimated total": {
          inr: "₹2016",
          usd: "$24.20"
        }
      }
    }
  };

  const featureGroups = [
    {
      title: "Base Package",
      features: ["Monthly credits included", "Base model cost"]
    },
    {
      title: "Call Services",
      features: ["Incoming calls", "Outgoing calls"]
    },
    {
      title: "Advanced Features",
      features: ["Call recording", "Sentiment analysis", "Gender detection"]
    },
  ];

  const planNames = Object.keys(plans);

  const getFeatureValue = (plan, feature) => {
    const featureData = plan.features[feature];
    if (typeof featureData === 'object' && featureData.inr && featureData.usd) {
      return region === 'domestic' ? featureData.inr : featureData.usd;
    }
    return featureData;
  };

  const getPlanPrice = (plan) => {
    return region === 'domestic' ? plan.priceInr : plan.priceUsd;
  };

  const renderFeatureValue = (value) => {
    if (value !== undefined && value !== null) {
      return typeof value === 'boolean' ? (
        value ? (
          <Check className="w-5 h-5 text-green-600 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-gray-400 mx-auto" />
        )
      ) : (
        <div className="flex items-center justify-center gap-2">
          <div className="text-center">
            <span className="text-sm text-gray-700 font-medium">{value}</span>
          </div>
        </div>
      );
    }
    return <X className="w-5 h-5 text-gray-400 mx-auto" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your communication needs. Transparent pricing with no hidden fees.
        </p>
      </div>

      {/* Region Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setRegion("domestic")}
            className={`px-4 py-2 rounded-md transition-all ${
              region === "domestic" 
                ? "bg-white shadow-sm text-gray-900" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Domestic (₹)
          </button>
          <button
            onClick={() => setRegion("international")}
            className={`px-4 py-2 rounded-md transition-all ${
              region === "international" 
                ? "bg-white shadow-sm text-gray-900" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            International ($)
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Tabbed Interface */}
      <div className="block lg:hidden mb-8">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {planNames.map((planName) => (
            <button
              key={planName}
              onClick={() => setSelectedPlan(planName)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all relative ${
                selectedPlan === planName
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {planName}
            </button>
          ))}
        </div>

        {/* Selected Plan Details */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
          {/* Plan Header */}
          <div className="text-center p-6 bg-gray-100 border-b-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan}</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-4xl font-bold text-gray-900">
                {getPlanPrice(plans[selectedPlan])}
              </span>
              <span className="text-gray-600 text-lg">
                {plans[selectedPlan].billing}
              </span>
            </div>
            <p className="text-blue-600 font-semibold text-sm mb-2">
              {plans[selectedPlan].credits}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {plans[selectedPlan].description}
            </p>
            <button 
              className="w-full py-3 px-3 rounded-xl font-semibold text-lg transition-all bg-slate-800 text-white hover:bg-gray-800 "
            >
              {plans[selectedPlan].buttonText}
            </button>
          </div>

          {/* Features Table */}
          <div className="p-0">
            {featureGroups.map((group, groupIndex) => (
              <div key={group.title}>
                {/* Group Header */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    {group.title}
                  </h4>
                </div>
                
                {/* Group Features */}
                {group.features.map((feature, featureIndex) => (
                  <div 
                    key={feature}
                    className={`flex items-center justify-between px-4 py-4 border-b border-gray-100 ${
                      feature === "Estimated total" ? "bg-green-50" : "bg-white"
                    } ${
                      featureIndex === group.features.length - 1 && groupIndex === featureGroups.length - 1 
                        ? 'border-b-0' 
                        : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700 flex-1">
                      {feature}
                    </span>
                    <div className="text-sm font-semibold text-gray-900 min-w-0 flex-shrink-0 ml-4">
                      {typeof getFeatureValue(plans[selectedPlan], feature) === "boolean" ? (
                        getFeatureValue(plans[selectedPlan], feature) ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400" />
                        )
                      ) : (
                        getFeatureValue(plans[selectedPlan], feature)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 flex gap-6">
            <div className="space-y-0 w-[20%]">

              <div className="h-40 mb-4"></div>
              
              {featureGroups.map((group, groupIndex) => (
                <div key={group.title} className="space-y-0">
                  <div className="py-4 h-12 flex items-center">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                      {group.title}
                    </h4>
                  </div>
                  {group.features.map((feature, featureIndex) => (
                    <div key={feature} className="py-3 h-12 flex items-center border-b border-gray-200 last:border-b-0">
                      <span className="text-sm text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {groupIndex < featureGroups.length - 1 && <div className=" h-4"></div>}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planNames.map((planName) => {
                const plan = plans[planName];
                return (
                  <div 
                    key={planName}
                    className=" relative bg-white rounded-2xl border-2 p-6 shadow-lg hover:shadow-xl transition-all border-gray-200 hover:border-gray-200"
                  >

                    <div className="text-center -mb-4 ">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{planName}</h3>
                      <div className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="text-4xl font-bold text-gray-900">
                          {getPlanPrice(plan)}
                        </span>
                        <span className="text-gray-600 text-lg">
                          {plan.billing}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold text-sm mb-2">
                        {plan.credits}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-0">
                      {featureGroups.map((group, groupIndex) => (
                        <div key={group.title} className="space-y-0">
                          <div className="py-2 h-10  flex items-center justify-center">
                            <div className="text-sm font-semibold text-transparent">
                              {group.title}
                            </div>
                          </div>
                          {group.features.map((feature, featureIndex) => (
                            <div key={feature} className={`py-3 border-b border-gray-200 last:border-b-0 flex items-center justify-center ${
                              feature === "Estimated total" ? "bg-green-50 rounded-lg" : ""
                            }`}>
                              {renderFeatureValue(getFeatureValue(plan, feature))}
                            </div>
                          ))}
                          {groupIndex < featureGroups.length - 1 && <div className=" h-5"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button 
                        className="w-full py-2 px-2 rounded-xl font-medium text-lg transition-all  bg-slate-800 text-white hover:bg-gray-800"
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingTable;