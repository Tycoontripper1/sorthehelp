"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Login({ v }: { v: SorthehelpVals }) {
  return (
    <div
      style={css(
        "padding:64px 20px 40px;min-height:100dvh;box-sizing:border-box",
      )}
    >
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:26px;letter-spacing:-.01em",
        )}
      >
        Sorthe
        <em style={css("font-style:italic;font-weight:500;color:#A6314A")}>
          help
        </em>
      </div>
      <div
        style={css(
          "position:relative;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:22px;overflow:hidden",
        )}
      >
        <div
          style={css(
            "height:6px;background-image:radial-gradient(circle at 6px 0px,#EFE7D3 3.2px,transparent 3.3px);background-size:12px 6px;background-repeat:repeat-x",
          )}
        />
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:baseline;padding:12px 16px 10px;border-bottom:2px solid #202A33",
          )}
        >
          <span
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b6455",
            )}
          >
            Sign in
          </span>
          <span
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#9c9484",
            )}
          >
            {v.today}
          </span>
        </div>
        <div style={css("padding:18px 16px 20px")}>
          <label
            style={css(
              "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin-bottom:6px",
            )}
          >
            Phone number
          </label>
          <div
            style={css(
              "display:flex;align-items:stretch;border:1px solid #D6C69A;border-radius:5px;background:#EFE7D3;overflow:hidden",
            )}
          >
            <span
              style={css(
                "display:flex;align-items:center;padding:0 11px;font-family:'IBM Plex Mono',monospace;font-size:14px;color:#6b6455;background:#E6DBBE;border-right:1px solid #D6C69A",
              )}
            >
              +234
            </span>
            <input
              type="tel"
              value={v.phone}
              onChange={v.onPhone}
              placeholder="801 234 5678"
              style={css(
                "flex:1;min-width:0;border:none;background:transparent;padding:13px 11px;font-family:'IBM Plex Mono',monospace;font-size:15px;letter-spacing:.04em;color:#202A33;outline:none",
              )}
            />
          </div>
          <div style={css("font-size:11.5px;color:#9c9484;margin-top:7px")}>
            We&apos;ll text a 6-digit code. No password to forget.
          </div>
          <button
            type="button"
            onClick={v.sendCodeReturning}
            style={css(
              "width:100%;margin-top:16px;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
            )}
          >
            Send me a code
          </button>
          <div
            style={css(
              "display:flex;align-items:center;gap:10px;margin:18px 0 14px",
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
            onClick={v.go.ledger}
            style={css(
              "width:100%;display:flex;align-items:center;justify-content:center;gap:10px;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
            )}
          >
            <span
              style={css(
                "width:18px;height:18px;border-radius:50%;background:conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0);display:inline-block",
              )}
            />
            Continue with Google
          </button>
        </div>
        <div
          style={css(
            "border-top:1px dashed #D6C69A;padding:12px 16px;display:flex;justify-content:space-between;align-items:center",
          )}
        >
          <span style={css("font-size:12.5px;color:#6b6455")}>
            No account yet?
          </span>
          <button
            type="button"
            onClick={v.go.signup}
            style={css(
              "border:none;background:none;padding:0;font-family:Inter,sans-serif;font-size:12.5px;font-weight:700;color:#8C4A3A;text-decoration:underline;cursor:pointer",
            )}
          >
            Start one
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={v.go.recover}
        style={css(
          "display:block;margin:18px auto 0;border:none;background:none;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-decoration:underline;cursor:pointer",
        )}
      >
        Trouble signing in?
      </button>
    </div>
  );
}
