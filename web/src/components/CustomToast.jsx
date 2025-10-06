import React from "react";
import { Toaster, ToastBar } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const CustomToast = () => {
  const { themeColor } = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#fff",
          color: "#000",
          borderRadius: "10px",  
          
          border: "none",  
        },
        success: {
          iconTheme: {
            primary: themeColor,
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#e53935",
            secondary: "#fff",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            border: "none", 
          }}
        />
      )}
    </Toaster>
  );
};

export default CustomToast;
