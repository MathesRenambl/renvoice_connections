// context/CreditContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type CreditContextType = {
  credits: number;
  setCredits: (value: number) => void;
  addCredits: (value: number) => void;
  subtractCredits: (value: number) => void;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const CreditProvider = ({ children }: Props) => {
  const [credits, setCredits] = useState<number>(0);

  const addCredits = (value: number) => setCredits(prev => prev + value);
  const subtractCredits = (value: number) => setCredits(prev => Math.max(0, prev - value));

  return (
    <CreditContext.Provider value={{ credits, setCredits, addCredits, subtractCredits }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
};
