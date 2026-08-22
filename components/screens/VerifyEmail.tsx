"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function VerifyEmail({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div
      style={css(
        "padding:56px 20px 40px;min-height:100dvh;box-sizing:border-box",
      )}
    >
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;letter-spacing:-.01em",
        )}
      >
        Verify your email
      </div>
      <div
        style={css(
          "font-size:13.5px;color:#6b6455;margin-top:6px;max-width:320px",
        )}
      >
        We sent a 6-digit code to{" "}
        <span style={css("font-family:'IBM Plex Mono',monospace")}>
          {v.verifyEmailAddress}
        </span>
        . Enter it below to continue.
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:20px 16px;margin-top:20px",
        )}
      >
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin-bottom:8px",
          )}
        >
          Verification code
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={v.verifyOtp}
          onChange={(e) => v.setVerifyOtp(e.target.value)}
          placeholder="000000"
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;border-bottom:2px solid #202A33;background:#EFE7D3;border-radius:4px;padding:14px;font-family:'IBM Plex Mono',monospace;font-size:26px;font-weight:600;letter-spacing:.4em;text-align:center;color:#202A33;outline:none",
          )}
        />
        <button
          type="button"
          onClick={v.submitVerifyOtp}
          disabled={!v.verifyOtpReady}
          style={css(
            `width:100%;margin-top:18px;border:1px solid #202A33;background:${v.verifyOtpReady ? "#202A33" : "#9c9484"};color:#EFE7D3;border-radius:5px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s`,
          )}
        >
          Verify
        </button>
        <button
          type="button"
          onClick={v.resendVerifyOtp}
          disabled={v.verifyResending}
          style={css(
            "display:block;width:100%;margin-top:12px;border:none;background:none;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-decoration:underline;cursor:pointer;padding:4px;text-align:center",
          )}
        >
          {v.verifyResending ? "Sending…" : "Resend code"}
        </button>
      </div>
      <button
        type="button"
        onClick={v.signOut}
        style={css(
          "display:block;margin:18px auto 0;border:none;background:none;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-decoration:underline;cursor:pointer",
        )}
      >
        Use a different account
      </button>
    </div>
  );
}
