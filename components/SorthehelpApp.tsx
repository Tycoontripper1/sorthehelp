"use client";

import {
  useSorthehelp,
  type Screen,
  type OnboardingVariant,
} from "@/lib/useSorthehelp";
import { Splash } from "./screens/Splash";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
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
      {v.isRecover && <Recover v={v} />}
      {v.isPin && <Pin v={v} />}
      {v.isObSteps && <OnboardSteps v={v} />}
      {v.isApp && <AppShell v={v} />}
    </div>
  );
}
