// "use client";

// import {Slider} from "@/components/ui/slider";
// import datas from "@/components/data/pricecalc.json";
// import { useEffect, useState } from "react";

// function PricingList({title,price}:{title:string,price:number}){
//     return (
//     <div className="flex flex-row justify-between">
//       <h4 className="text-left">{title}</h4>
//     <h4 className="text-right">₹ {price}</h4>
//   </div>)
// }

// export  function PricingCalculator(){
//     const [minutesSelected,setMinuteSelected] = useState<number[]>([60]);
//     const [totalPrice,setTotalPrice] = useState(0)
//     const [active,setActive] = useState<Record<string, string>>({
//       "LLM Agent":"",
//         "Voice Engine":"Elevenlabs Voices",
//         "Telephony":"Custom Telephony"
//     })
//     const [selectedChoicePrice,setChoice] =useState<Record<string, number>>({
//         LLM_Agent:9,
//         Voice_Engine:10,
//         Telephony:10
//     });

//     useEffect(()=>{

//       let cost = selectedChoicePrice.LLM_Agent+selectedChoicePrice.Voice_Engine + selectedChoicePrice.Telephony +(Math.round(10 * minutesSelected[0]))
//       setTotalPrice(cost)
//     },[minutesSelected,selectedChoicePrice])

//     function CategoryList({name,price,selectedAgent}:{name:string,price:number,selectedAgent:string}){
//          return(
//               <button
//                  onClick={() => handleSelectedOptions({name:name,price:price,selectedAgent:selectedAgent})}
//                  className={`p-3 border-black border-2 rounded-full m-1 text-sm hover:bg-black
//                  hover:text-white ${active[name] === selectedAgent ? `text-white border-white bg-black` :  `bg-white` }`}
//                >
//         {selectedAgent}
//       </button>
//   )
// }

//     function handleSelectedOptions({name , price, selectedAgent}:{name:string,price:number,selectedAgent:string}){
//        setActive(prev =>({
//           ...prev,
//           [name]:selectedAgent
//         }))
//         name = name.replace(/\s+/g, "_");
//         console.log(name)

//         setChoice(prev => ({
//     ...prev,
//     [name]: price,
//   }));

//     }

//     return (
//        <div className="flex flex-col p-2 md:flex-col lg:flex-row bg-zinc-100 m-10 w-full gap-4 md:p-4 lg:p-6 border-2 rounded-lg">
//   <div className="w-full p-4 rounded  lg:w-2/3">

//   <div className="flex flex-row justify-between sm:text-base md:text-lg lg:text-xl">
//         <h4 >How Many minutes of call do you require per month?</h4>
//         <h4>{minutesSelected}</h4>
//   </div>

//   <Slider
//   defaultValue={[60]}
//   max={43800}
//   min={30}
//   step={1}
//   value={minutesSelected}
//   onValueChange={setMinuteSelected}
//   className="mt-5 [&_.bg-secondary]:bg-gray-300 "
// />
//    <div>
//     <div>
//       {datas.map((data, i) => (
//         <div key={i} className="text-left flex flex-col items-start mt-5">
//   <h5 className="text-lg">{data.name}</h5>
//   <div className="flex flex-wrap items-start">
//     {data.options.map((category, index) => (
//       <CategoryList key={index} name={data.name} price={category.price} selectedAgent={category.name}/>
//     ))}
//   </div>
// </div>
//       ))}
//     </div>

//    </div>
//   </div>
//   <div className=" sm:w-full bg-transparent  md:bg-slate-100 p-4 rounded-lg md:border-2 lg:h-2/3 md:mx-auto md:w-3/4 lg:w-1/3">
//   <PricingList title="Cost per minute" price={0.1}/>
//   <PricingList title="LLM Cost" price={selectedChoicePrice.LLM_Agent}/>
//   <PricingList title="Voice Engine Cost" price={selectedChoicePrice.Voice_Engine}/>
//   <PricingList title="telephony Cost" price={selectedChoicePrice.Telephony}/>
//       <hr className="my-4 border-t border-gray-500" />
//     <div className="mt-5 flex flex-row justify-between ">
//       <h4 className="text-left text-3xl">Total Price</h4>
//     <h4 className="text-right text-3xl">₹ {totalPrice}</h4>
//   </div>

//   </div>
// </div>
//     )
// }

"use client";

import { useState, useEffect } from "react";
import { IndianRupee, DollarSign, Info } from "lucide-react";
import { Slider } from "../ui/slider";
import datas from "@/components/data/pricecalc.json";
import { set } from "zod";

// Mock data structure - replace with your actual data
// const datas = [
//   {
//     name: "LLM Agent",
//     options: [
//       { name: "GPT-4", price: 9 },
//       { name: "Claude", price: 8 },
//       { name: "Gemini", price: 7 }
//     ]
//   },
//   {
//     name: "Voice Engine",
//     options: [
//       { name: "Elevenlabs Voices", price: 10 },
//       { name: "Azure Voices", price: 8 },
//       { name: "Google Voices", price: 6 }
//     ]
//   },
//   {
//     name: "Telephony",
//     options: [
//       { name: "Custom Telephony", price: 10 },
//       { name: "Twilio", price: 12 },
//       { name: "Basic", price: 8 }
//     ]
//   }
// ];

// Currency configuration
const currencies = {
  INR: {
    symbol: "₹",
    name: "INDIA",
    icon: IndianRupee,
    rate: 1,
  },
  USD: {
    symbol: "$",
    name: "INTERNATIONAL",
    icon: DollarSign,
    rate: 0.02, // 1 INR = 0.012 USD (approximate)
  },
};

// Custom Slider Component
// function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }) {
//   const handleChange = (e) => {
//     onValueChange([parseInt(e.target.value)]);
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value[0]}
//         onChange={handleChange}
//         className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
//       />
//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #000;
//           cursor: pointer;
//         }
//         .slider::-moz-range-thumb {
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #000;
//           cursor: pointer;
//           border: none;
//         }
//       `}</style>
//     </div>
//   );
// }

function PricingList({ title, price, currency,minutesSelected }) {


  const currencyData = currencies[currency];
  const convertedPrice = title==="phone"?minutesSelected * 799:price * currencyData.rate * minutesSelected;
  const minPrice = title==="phone"?799: price * currencyData.rate;  

  const priceName=title==="Phone"?{name:"Phone"}:title==="dialogue"?{name:"Dialog"}:datas.find((data)=>data.keyName===title)
  
  return (
    <div className="flex flex-row justify-between py-[0.3rem]">
      <h4 className="text-left text-sm md:text-base">
        {priceName.name}{" "}
        <span className="text-xs text-gray-500">
          {`(${currencyData.symbol}${minPrice}${title==="Phone"?"/con":"/min"})`}
          </span>
      </h4>
      <h4 className="text-right text-sm md:text-base font-semibold">
        {currencyData.symbol} {convertedPrice}
      </h4>
    </div>
  );
}

function CurrencyToggle({ currency, onCurrencyChange,setPhoneConnections }) {
  return (
    <div className="flex items-center justify-center mb-6 mt-4">
      <div className="flex bg-gray-200 rounded-full p-1">
        {Object.entries(currencies).map(([code, data]) => {
          return (
            <button
              key={code}
              onClick={() => {
               if(code === "USD") setPhoneConnections([0]);
                onCurrencyChange(code)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                currency === code
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {/* <Icon size={16} /> */}
              <span className="font-medium text-sm md:text-base">{data.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PricingCalculator() {
  const [minutesSelected, setMinuteSelected] = useState([100]);
  const [phoneConnections, setPhoneConnections] = useState([1]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [pricePerMin, setPricePerMin] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [active, setActive] = useState({
    AIModel: "Default AI Model",
    speechRecognition: "Default",
    hosted: "cloud hosted",
    speechSynthesis: "Default",
    dialogue: "",
  });
  const [selectedChoicePrice, setChoice] = useState({
   AIModel: 0.5,
   speechRecognition:0.5,
   hosted:1,
   speechSynthesis:0.5,
   dialogue:0,

  });

  useEffect(() => {
    let cost =(selectedChoicePrice.AIModel +
      selectedChoicePrice.speechRecognition +
      selectedChoicePrice.hosted +
      selectedChoicePrice.speechSynthesis +
      selectedChoicePrice.dialogue ) * minutesSelected[0] 

      if(currencyData.name==="INDIA"){
        
        cost=cost +  (phoneConnections[0] *  799 )
        cost=cost - (phoneConnections[0] *  100);
      }

     
      const minCost=selectedChoicePrice.AIModel +
      selectedChoicePrice.speechRecognition +
      selectedChoicePrice.hosted +
      selectedChoicePrice.speechSynthesis + 
      selectedChoicePrice.dialogue 
    setTotalPrice(cost);
    setPricePerMin(minCost);
  }, [minutesSelected, selectedChoicePrice, phoneConnections]);

  function CategoryList({ keyName, price, selectedAgent }) {

    return (
      <button
        onClick={() => handleSelectedOptions({ keyName, price, selectedAgent })}
        className={`px-3   py-2 md:px-4 border-2 border-gray-300 rounded-full m-1 text-[12px] md:text-sm font-medium transition-all duration-200 hover:border-black hover:shadow-md ${
          active[keyName] === selectedAgent
            ? "text-white bg-black border-black shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        {selectedAgent}
      </button>
    );
  }

  function handleSelectedOptions({ keyName, price, selectedAgent }) {
    // console.log(keyName, "keyName",price);
    // const isSameSelection = active[keyName] === selectedAgent;

    // // If already selected, deselect it
    // if (isSameSelection) {
    //   setActive((prev) => ({
    //     ...prev,
    //     [keyName]: "",
    //   }));
    //   return;
    // }

    // New active state based on selection logic
    const updatedActive = { ...active };
    const updatedPrice={...selectedChoicePrice};

    if (keyName === "dialogue") {
      updatedActive[keyName] = selectedAgent;
      updatedActive["AIModel"] = "";
      updatedActive["speechSynthesis"] = "";

      updatedPrice[keyName] = price;
      updatedPrice["AIModel"] = 0;
      updatedPrice["speechSynthesis"] = 0;
      
    } else if (keyName === "AIModel" || keyName === "speechSynthesis") {
      updatedActive[keyName] = selectedAgent;
      updatedActive["dialogue"] = "";

      updatedPrice[keyName] = price;
      updatedPrice["dialogue"] = 0;
    } else {
      updatedActive[keyName] = selectedAgent;
      updatedPrice[keyName] = price;
    }

    if(keyName==="hosted" && selectedAgent==="Web socket"){
      setPhoneConnections([0]);
      
    }

    setActive(updatedActive);

    // console.log(updatedPrice, "updatedPrice");

    // Update price choice only if selection is changed
    const formattedKeyName = keyName.replace(/\s+/g, "_");
    setChoice(updatedPrice);
  }

  const currencyData = currencies[currency];

  const convertedTotal = (totalPrice * currencyData.rate).toFixed(
    currency === "USD" ? 2 : 0
  );
  const convertedTotalPerMin = (pricePerMin * currencyData.rate)



  return (
    <div className="w-full mx-auto md:px-4">
      <div className="text-center mb-8">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          AI Voice Call Pricing Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your monthly costs with real-time currency conversion
        </p> */}

        <CurrencyToggle currency={currency} onCurrencyChange={setCurrency} setPhoneConnections={setPhoneConnections}/>
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl ">
        {/* Configuration Panel */}
        <div className="w-full xl:w-[65%] p-3 md:p-8">
          {/* Minutes Selector */}
          <div className="mb-8">
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-[15px] md:text-lg lg:text-xl font-semibold text-gray-800">
                Monthly Call Minutes Required
              </h3>
              <div className=" sm:text-[12px] bg-black text-white px-4 py-2 rounded-full font-bold">
                {minutesSelected[0].toLocaleString()}
              </div>
            </div>

            <Slider
              defaultValue={[60]}
              max={100000}
              min={100}
              step={100}
              value={minutesSelected}
              onValueChange={setMinuteSelected}
              className="mt-5 [&_.bg-secondary]:bg-gray-300 "
            />

            {/* <Slider 
              value={minutesSelected}
              onValueChange={setMinuteSelected}
              max={43800}
              min={30}
              step={1}
              className="mt-4"
            /> */}

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>100 min</span>
              <span>100,000 min</span>
            </div>
          </div>

          {currencyData.name==="INDIA" && active.hosted!=="Web socket" &&<div className="mb-8">
            <div className="flex flex-row justify-between items-center mb-2 md:mb-4">
              <h3 className="text-[15px] md:text-lg lg:text-xl font-semibold text-gray-800">
                Phone Connections
              </h3>
              <div className=" sm:text-[12px]  bg-black text-white px-4 py-2 rounded-full font-bold">
                {phoneConnections[0].toLocaleString()}
              </div>
            </div>

            <Slider
              defaultValue={[60]}
              max={30}
              min={0}
              step={1}
              value={phoneConnections}
              onValueChange={setPhoneConnections}
              className="mt-5 [&_.bg-secondary]:bg-gray-300 "
            />

            {/* <Slider 
              value={minutesSelected}
              onValueChange={setMinuteSelected}
              max={43800}
              min={30}
              step={1}
              className="mt-4"
            /> */}

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0 connection</span>
              <span>30 connections</span>
            </div>
          </div>}

          {/* Service Options */}
          <div className="space-y-6">
            {datas.map((data, i) => (
              <div
                key={i}
                className="border-b border-gray-100 pb-6 last:border-b-0"
              >
                <h4 className="text-base md:text-leftext-lg font-semibold text-gray-800 mb-3">
                  {data.name}
                </h4>
                <div className="flex flex-wrap md:gap-2 ">
                  {data.options.map((category, index) => (
                    <CategoryList
                      key={index}
                      keyName={data.keyName}
                      price={category.price}
                      selectedAgent={category.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="w-full  xl:w-[35%] bg-gray-50  md:p-8 relative">
          <div className="rounded-xl p-4 lg:p-6 shadow-lg sticky top-[6rem]  w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Pricing Breakdown
            </h3>

            <div className="space-y-3">

              
              {/* <PricingList
                title="Cost per minute"
                price={0.5}
                currency={currency}
              /> */}
              {Object.entries(selectedChoicePrice).map(([key, value]) => {
               
                  return (
                    <PricingList
                      key={key}
                      title={key}
                      price={value}
                      currency={currency}
                      minutesSelected={minutesSelected}

                    />
                  );
                
              })}

              {currencyData.name==="INDIA" && active.hosted!=="Web socket" &&<PricingList
                      title={"Phone"}
                      price={799}
                      currency={currency}
                      minutesSelected={phoneConnections}
                    />
                    }
                    <div className="text-left text-sm text-gray-600">
                      Total Price : {currencyData.symbol} {convertedTotalPerMin}/min
                    </div>
              {/* <PricingList
                title="LLM Agent"
                price={selectedChoicePrice.LLM_Agent}
                currency={currency}
              />
              <PricingList
                title="Voice Engine"
                price={selectedChoicePrice.Voice_Engine}
                currency={currency}
              />
              <PricingList
                title="Telephony Service"
                price={selectedChoicePrice.Telephony}
                currency={currency}
              /> */}
            </div>

            <hr className="my-6 border-gray-200" />

          <div className="bg-black text-white rounded-lg p-4 text-left">               
            <div className="flex justify-between items-center">                  
              <div>                 
                <h4 className="text-xl font-bold mb-1">Total Cost</h4>                 
                {currencyData.name==="INDIA" && active.hosted!=="Web socket" &&  <div className="text-gray-300 text-[0.65rem] flex items-center gap-1">                   
                  <Info size={12}/>                   
                  100 min free for 1 phone connection                 
                </div>               }
              </div>                 
              <div className="text-right">                   
                <div className="text-2xl font-bold">                     
                  {currencyData.symbol} {convertedTotal}
                </div>
               {currencyData.name==="INDIA" && active.hosted!=="Web socket" &&  <div className="text-sm text-gray-300">
                  - {currencyData.symbol}{ (currencyData.rate*phoneConnections[0]*100)}
                </div>          }         
              </div>               
            </div>             
          </div>

            {currency === "USD" && (
              <div className="mt-3 text-xs text-gray-500 text-center">
                * Converted from INR at current exchange rate
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
