"use client";

import {
  useSorthehelp,
  type Screen,
  type OnboardingVariant,
} from "@/lib/useSorthehelp";
import { Splash } from "./screens/Splash";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Otp } from "./screens/Otp";
import { Recover } from "./screens/Recover";
import { Pin } from "./screens/Pin";
import { OnboardSteps } from "./screens/OnboardSteps";
import { OnboardChecklist } from "./screens/OnboardChecklist";
import { AppShell } from "./screens/AppShell";
import React from "react";

export function SorthehelpApp({
  startScreen = "splash",
  onboardingVariant = "steps",
}: {
  startScreen?: Screen;
  onboardingVariant?: OnboardingVariant;
}): React.JSX.Element {
  const v = useSorthehelp(startScreen, onboardingVariant);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100dvh",
        background: "#EFE7D3",
        backgroundImage:
          "repeating-linear-gradient(transparent,transparent 27px,#D6C69A 28px)",
        color: "#202A33",
        fontFamily: "Inter,sans-serif",
        WebkitFontSmoothing: "antialiased",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {v.isSplash && <Splash v={v} />}
      {v.isLogin && <Login v={v} />}
      {v.isSignup && <Signup v={v} />}
      {v.isOtp && <Otp v={v} />}
      {v.isRecover && <Recover v={v} />}
      {v.isPin && <Pin v={v} />}
      {v.isObSteps && <OnboardSteps v={v} />}
      {v.isApp && <AppShell v={v} />}

      {v.toast && (
        <div
          style={{
            position: "fixed",
            top: "18px",
            left: "50%",
            background: "#202A33",
            color: "#EFE7D3",
            padding: "11px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            fontFamily: "Inter,sans-serif",
            boxShadow: "0 10px 24px rgba(0,0,0,.25)",
            zIndex: 80,
            maxWidth: "88%",
            textAlign: "center",
            animation: "toastIn .3s cubic-bezier(.2,.9,.3,1.2) forwards",
            transform: "translateX(-50%)",
          }}
        >
          {v.toast}
        </div>
      )}
    </div>
  );
}
