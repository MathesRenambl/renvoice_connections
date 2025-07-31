import { useState } from "react";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertState {
  show: boolean;
  title: string;
  type: AlertType;
  message: string;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: "info",
    title: "",
    message: "",
  });

  const showAlert = (message: string, type: AlertType) => {
    setAlert({
      show: true,
      type: type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
      message: message,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  return { alert, hideAlert,showAlert };
};
