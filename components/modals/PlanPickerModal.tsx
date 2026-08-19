"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function PlanPickerModal({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (v.planPickerFor === null) return null;

  return (
    <div
      style={css(
        "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:30;display:flex;align-items:flex-end",
      )}
    >
      <div
        style={css(
          "position:relative;width:100%;max-height:75vh;background:#EFE7D3;border-radius:20px 20px 0 0;padding:24px 16px 32px;overflow-y:auto",
        )}
      >
        <button
          type="button"
          onClick={v.closePlanPicker}
          style={css(
            "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
          )}
        >
          ✕
        </button>
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;margin-right:32px",
          )}
        >
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:24px",
            )}
          >
            Change plan
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484;white-space:nowrap",
            )}
          >
            {v.planPickerName}
          </div>
        </div>
        <div style={css("display:flex;flex-wrap:wrap;gap:8px")}>
          {v.planPickerOptions.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={p.tap}
              style={css(
                `text-align:left;border:2px solid ${p.border};background:${p.bg};color:${p.fg};border-radius:4px;padding:8px 12px;cursor:pointer;font-family:Inter,sans-serif`,
              )}
            >
              <div style={css("font-size:13px;font-weight:600")}>
                {p.label}
              </div>
              <div
                style={css(
                  `font-family:'IBM Plex Mono',monospace;font-size:10.5px;margin-top:2px;color:${p.subFg}`,
                )}
              >
                {p.sub}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
