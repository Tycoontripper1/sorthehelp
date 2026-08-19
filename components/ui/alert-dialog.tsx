"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { css } from "@/lib/css";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogOverlay(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>,
) {
  return (
    <AlertDialogPrimitive.Overlay
      className="alert-dialog-overlay"
      style={css("position:fixed;inset:0;background:rgba(32,42,51,.5);z-index:90")}
      {...props}
    />
  );
}

function AlertDialogContent({
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className="alert-dialog-content"
        style={css(
          "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 40px);max-width:340px;background:#FBF7EC;border:1px solid #D6C69A;border-radius:6px;box-shadow:0 20px 50px -12px rgba(0,0,0,.35);padding:20px;z-index:91;font-family:Inter,sans-serif",
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={css("display:flex;flex-direction:column;gap:6px")}>
      {children}
    </div>
  );
}

function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <div style={css("display:flex;gap:10px;margin-top:20px")}>{children}</div>;
}

function AlertDialogTitle(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Title>,
) {
  return (
    <AlertDialogPrimitive.Title
      style={css(
        "font-family:Fraunces,serif;font-weight:600;font-size:19px;color:#202A33;letter-spacing:-.01em;margin:0",
      )}
      {...props}
    />
  );
}

function AlertDialogDescription(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Description>,
) {
  return (
    <AlertDialogPrimitive.Description
      style={css("font-size:13.5px;color:#6b6455;line-height:1.5;margin:0")}
      {...props}
    />
  );
}

function AlertDialogAction(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Action>,
) {
  return (
    <AlertDialogPrimitive.Action
      style={css(
        "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:12px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
      )}
      {...props}
    />
  );
}

function AlertDialogCancel(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>,
) {
  return (
    <AlertDialogPrimitive.Cancel
      style={css(
        "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:12px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
