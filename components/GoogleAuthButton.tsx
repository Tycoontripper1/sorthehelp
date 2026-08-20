"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { css } from "@/lib/css";

import React from "react";

/**
 * Renders the real Google button once NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
 * (see server/.env.example — same client ID goes server- and client-side).
 * Until then, shows a disabled look-alike instead of a button that appears
 * to work but silently does nothing.
 */
export function GoogleAuthButton({
  text,
  onIdToken,
}: {
  text: "signin_with" | "signup_with";
  onIdToken: (idToken: string) => void;
}): React.JSX.Element {
  const configured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const label = text === "signup_with" ? "Sign up with Google" : "Continue with Google";

  if (!configured) {
    return (
      <button
        type="button"
        onClick={() => toast("Google sign-in isn't set up yet")}
        style={css(
          "width:100%;display:flex;align-items:center;justify-content:center;gap:10px;border:1px solid #D6C69A;background:#fff;color:#9c9484;border-radius:5px;padding:13px;font-size:14.5px;font-weight:600;cursor:not-allowed;font-family:Inter,sans-serif",
        )}
      >
        <span
          style={css(
            "width:18px;height:18px;border-radius:50%;background:conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0);display:inline-block;opacity:.4",
          )}
        />
        {label}
      </button>
    );
  }

  return (
    <div style={css("display:flex;justify-content:center")}>
      <GoogleLogin
        text={text}
        shape="rectangular"
        theme="outline"
        width="320"
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) onIdToken(credentialResponse.credential);
          else toast.error("Google didn't return a credential — try again");
        }}
        onError={() => toast.error("Google sign-in failed")}
      />
    </div>
  );
}
