"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
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
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const app = (
    <>
      <div
        id="sorthehelp-app"
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
      <div
        className="desktop-guard"
        style={{
          position: "fixed",
          inset: 0,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          textAlign: "center",
          padding: "0 32px",
          background: "#EFE7D3",
          backgroundImage:
            "repeating-linear-gradient(transparent,transparent 27px,#D6C69A 28px)",
          color: "#202A33",
          fontFamily: "Inter,sans-serif",
        }}
      >
        <div style={{ fontFamily: "Fraunces,serif", fontSize: 32 }}>
          Sorthe<span style={{ color: "#A6314A", fontStyle: "italic" }}>help</span>
        </div>
        <p style={{ maxWidth: 360, fontSize: 15, lineHeight: 1.5, color: "#5A5346" }}>
          Sorthehelp is optimized for mobile right now. Desktop support is
          on the way. For the best experience, open this page on your
          phone to sign in and manage your groups.
        </p>
      </div>
    </>
  );

  return googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>
  ) : (
    app
  );
}
