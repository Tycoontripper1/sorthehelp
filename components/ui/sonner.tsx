"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      className="toaster group"
      style={
        {
          "--normal-bg": "#202A33",
          "--normal-text": "#EFE7D3",
          "--normal-border": "#202A33",
          "--border-radius": "6px",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          fontFamily: "Inter,sans-serif",
          fontSize: "13px",
          boxShadow: "0 10px 24px rgba(0,0,0,.25)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
