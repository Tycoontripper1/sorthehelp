"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function Otp({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div
      style={css(
        "padding:56px 20px 40px;min-height:100dvh;box-sizing:border-box",
      )}
    >
      <button
        type="button"
        onClick={v.go.login}
        style={css(
          "border:none;background:none;padding:0;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b6455;cursor:pointer",
        )}
      >
        ← Change number
      </button>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;margin-top:16px;letter-spacing:-.01em",
        )}
      >
        Enter your code
      </div>
      <div style={css("font-size:13.5px;color:#6b6455;margin-top:6px")}>
        Sent to{" "}
        <span style={css("font-family:'IBM Plex Mono',monospace")}>
          {v.phoneDisplay}
        </span>
      </div>
      <div
        style={css(
          "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;margin-top:8px",
        )}
      >
        {v.otpNote}
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:20px 14px;margin-top:20px",
        )}
      >
        <div style={css("display:flex;gap:7px;justify-content:space-between")}>
          {v.otpCells.map((cell, i) => (
            <button
              key={i}
              type="button"
              onClick={cell.tap}
              style={css(
                "flex:1;aspect-ratio:1/1.15;border:1px solid #D6C69A;border-bottom:2px solid #202A33;background:#EFE7D3;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:24px;font-weight:600;color:#202A33;cursor:pointer;padding:0;transition:all .2s",
              )}
            >
              {cell.ch}
            </button>
          ))}
        </div>
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:center;margin-top:16px",
          )}
        >
          <span
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#9c9484;text-transform:uppercase;letter-spacing:.05em",
            )}
          >
            Resend in {v.resendIn}
          </span>
          <button
            type="button"
            onClick={v.fillCode}
            style={css(
              "border:1px solid #D6C69A;background:#fff;border-radius:4px;padding:6px 10px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer;transition:all .2s",
            )}
          >
            Autofill demo code
          </button>
        </div>
        <button
          type="button"
          onClick={v.verify}
          style={css(
            "width:100%;margin-top:18px;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          {v.verifyCta}
        </button>
      </div>
      <button
        type="button"
        onClick={v.go.recover}
        style={css(
          "display:block;margin:18px auto 0;border:none;background:none;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-decoration:underline;cursor:pointer",
        )}
      >
        Didn&apos;t get the code?
      </button>
    </div>
  );
}
