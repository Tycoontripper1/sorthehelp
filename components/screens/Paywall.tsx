"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function Paywall({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div>
      <button
        type="button"
        onClick={v.go.groups}
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
        Pay when it pays you
      </div>
      <div
        style={css(
          "font-size:13.5px;color:#6b6455;margin-top:6px;max-width:300px",
        )}
      >
        No card up front. Pick the one that matches how money comes in.
      </div>
      <div
        style={css(
          "display:flex;flex-direction:column;gap:12px;margin-top:20px",
        )}
      >
        <div
          style={css(
            "position:relative;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:0 16px 16px;overflow:hidden",
          )}
        >
          <div
            style={css(
              "height:6px;margin:0 -16px;background-image:radial-gradient(circle at 6px 0px,#EFE7D3 3.2px,transparent 3.3px);background-size:12px 6px;background-repeat:repeat-x",
            )}
          />
          <div
            style={css(
              "display:flex;justify-content:space-between;align-items:baseline;margin-top:10px",
            )}
          >
            <span
              style={css(
                "font-family:Fraunces,serif;font-size:19px;font-weight:600",
              )}
            >
              Per sale
            </span>
            <span
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#3F6B4F;background:#E3ECE3;padding:3px 7px;border-radius:3px",
              )}
            >
              Current
            </span>
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:26px;font-weight:600;margin-top:8px",
            )}
          >
            ₦150
            <span style={css("font-size:13px;font-weight:400;color:#6b6455")}>
              {" "}
              / paid signup
            </span>
          </div>
          <div
            style={css(
              "font-size:12.5px;color:#6b6455;margin-top:8px;line-height:1.6",
            )}
          >
            Best for one-time classes and courses. Nothing to pay in a month you
            sell nothing. Unlimited members, 2 groups.
          </div>
        </div>
        <div
          style={css(
            "position:relative;background:#202A33;border:1px solid #202A33;border-radius:4px;box-shadow:0 8px 22px -10px rgba(32,42,51,.55);padding:0 16px 16px;overflow:hidden;color:#EFE7D3",
          )}
        >
          <div
            style={css(
              "height:6px;margin:0 -16px;background-image:radial-gradient(circle at 6px 0px,#EFE7D3 3.2px,transparent 3.3px);background-size:12px 6px;background-repeat:repeat-x",
            )}
          />
          <div
            style={css(
              "display:flex;justify-content:space-between;align-items:baseline;margin-top:10px",
            )}
          >
            <span
              style={css(
                "font-family:Fraunces,serif;font-size:19px;font-weight:600",
              )}
            >
              Sorthehelp Pro
            </span>
            <span
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#EFE7D3;border:1px solid rgba(239,231,211,.4);padding:3px 7px;border-radius:3px",
              )}
            >
              Recurring
            </span>
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:26px;font-weight:600;margin-top:8px",
            )}
          >
            2.5%
            <span style={css("font-size:13px;font-weight:400;opacity:.7")}>
              {" "}
              of what you collect
            </span>
          </div>
          <div
            style={css(
              "font-size:12.5px;color:rgba(239,231,211,.78);margin-top:8px;line-height:1.6",
            )}
          >
            Unlimited groups, automatic reminders, and Paystack payments the
            moment they&apos;re live. Switch to ₦6,000 flat monthly any time.
          </div>
          <button
            type="button"
            onClick={v.go.groups}
            style={css(
              "width:100%;margin-top:14px;border:1px solid #A6314A;background:#A6314A;color:#fff;border-radius:5px;padding:13px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            Start Sorthehelp Pro
          </button>
        </div>
      </div>
      <div
        style={css(
          "border-top:2px solid #202A33;margin-top:22px;padding-top:12px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;line-height:1.8",
        )}
      >
        <div style={css("display:flex;justify-content:space-between")}>
          <span>Members</span>
          <span style={css("color:#202A33")}>Unlimited on both</span>
        </div>
        <div style={css("display:flex;justify-content:space-between")}>
          <span>Telegram links</span>
          <span style={css("color:#202A33")}>Manual now, auto in v2</span>
        </div>
        <div style={css("display:flex;justify-content:space-between")}>
          <span>Cancel</span>
          <span style={css("color:#202A33")}>Any time, keep your records</span>
        </div>
      </div>
    </div>
  );
}
