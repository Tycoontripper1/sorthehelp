"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Signup({ v }: { v: SorthehelpVals }) {
  return (
    <div
      style={css(
        "padding:56px 20px 40px;min-height:100dvh;box-sizing:border-box",
      )}
    >
      <button
        type="button"
        onClick={v.go.splash}
        style={css(
          "border:none;background:none;padding:0;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b6455;cursor:pointer",
        )}
      >
        ← Back
      </button>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;margin-top:16px;letter-spacing:-.01em",
        )}
      >
        Set up Sorthehelp
      </div>
      <div style={css("font-size:13.5px;color:#6b6455;margin-top:6px")}>
        A few things now. Everything else after.
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:18px 16px;margin-top:20px",
        )}
      >
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin-bottom:6px",
          )}
        >
          Your name
        </label>
        <input
          type="text"
          value={v.ownerName}
          onChange={v.onOwner}
          placeholder="e.g. Amaka Nwosu"
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#EFE7D3;border-radius:5px;padding:12px 11px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
          )}
        />
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin:16px 0 6px",
          )}
        >
          Email or phone
        </label>
        <input
          type="text"
          value={v.identifier}
          onChange={v.onIdentifier}
          placeholder="amaka@example.com"
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;border-radius:5px;background:#EFE7D3;padding:12px 11px;font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:.02em;color:#202A33;outline:none",
          )}
        />
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin:16px 0 6px",
          )}
        >
          Password
        </label>
        <input
          type="password"
          value={v.password}
          onChange={v.onPassword}
          placeholder="At least 8 characters"
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;border-radius:5px;background:#EFE7D3;padding:12px 11px;font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:.02em;color:#202A33;outline:none",
          )}
        />
        <div
          style={css(
            "display:flex;gap:9px;align-items:flex-start;margin-top:16px",
          )}
        >
          <button
            type="button"
            onClick={v.toggleTerms}
            style={css(
              "flex:none;width:20px;height:20px;margin-top:1px;border:1px solid #D6C69A;background:#EFE7D3;border-radius:4px;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;color:#3F6B4F",
            )}
          >
            {v.termsMark}
          </button>
          <div style={css("font-size:12px;line-height:1.5;color:#6b6455")}>
            I agree to the terms and to Sorthehelp storing member records for my
            groups.
          </div>
        </div>
        <button
          type="button"
          onClick={v.signupWithPassword}
          style={css(
            "width:100%;margin-top:18px;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          Create account
        </button>
        <div
          style={css(
            "display:flex;align-items:center;gap:10px;margin:16px 0 12px",
          )}
        >
          <div style={css("flex:1;height:1px;background:#D6C69A")} />
          <span
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#9c9484",
            )}
          >
            or
          </span>
          <div style={css("flex:1;height:1px;background:#D6C69A")} />
        </div>
        <button
          type="button"
          onClick={v.go.onboard}
          style={css(
            "width:100%;display:flex;align-items:center;justify-content:center;gap:10px;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          <span
            style={css(
              "width:18px;height:18px;border-radius:50%;background:conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0);display:inline-block",
            )}
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
