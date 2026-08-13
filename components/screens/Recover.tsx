"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Recover({ v }: { v: SorthehelpVals }) {
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
        ← Back to sign in
      </button>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;margin-top:16px;letter-spacing:-.01em",
        )}
      >
        Can&apos;t get in?
      </div>
      <div
        style={css(
          "font-size:13.5px;color:#6b6455;margin-top:6px;max-width:300px",
        )}
      >
        Pick the closest problem. Your records stay where they are.
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:20px;overflow:hidden",
        )}
      >
        <button
          type="button"
          onClick={v.go.otp}
          style={css(
            "width:100%;text-align:left;display:block;border:none;border-bottom:1px dashed #D6C69A;background:none;padding:14px 16px;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          <div style={css("font-size:14.5px;font-weight:600;color:#202A33")}>
            The code never arrived
          </div>
          <div style={css("font-size:12px;color:#6b6455;margin-top:3px")}>
            Resend by SMS, or get it on WhatsApp instead
          </div>
        </button>
        <button
          type="button"
          onClick={v.go.login}
          style={css(
            "width:100%;text-align:left;display:block;border:none;border-bottom:1px dashed #D6C69A;background:none;padding:14px 16px;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          <div style={css("font-size:14.5px;font-weight:600;color:#202A33")}>
            I changed my phone number
          </div>
          <div style={css("font-size:12px;color:#6b6455;margin-top:3px")}>
            Verify with Google instead, then update the number
          </div>
        </button>
        <button
          type="button"
          onClick={v.go.pin}
          style={css(
            "width:100%;text-align:left;display:block;border:none;background:none;padding:14px 16px;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          <div style={css("font-size:14.5px;font-weight:600;color:#202A33")}>
            I forgot my app PIN
          </div>
          <div style={css("font-size:12px;color:#6b6455;margin-top:3px")}>
            Reset the 4-digit PIN that unlocks a shared phone
          </div>
        </button>
      </div>
      <div
        style={css(
          "border-top:2px solid #202A33;margin-top:26px;padding-top:12px;display:flex;justify-content:space-between;align-items:baseline",
        )}
      >
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455",
          )}
        >
          Still stuck
        </span>
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8C4A3A",
          )}
        >
          wa.me/2348000000000
        </span>
      </div>
    </div>
  );
}
