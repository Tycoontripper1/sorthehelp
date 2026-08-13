"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function OnboardChecklist({ v }: { v: SorthehelpVals }) {
  return (
    <div
      style={css(
        "padding:52px 20px 40px;min-height:100dvh;box-sizing:border-box;display:flex;flex-direction:column",
      )}
    >
      <div
        style={css(
          "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#9c9484",
        )}
      >
        Setup · {v.checkDone} of 3 done
      </div>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;margin-top:10px;letter-spacing:-.01em",
        )}
      >
        Set up Sorthehelp
      </div>
      <div style={css("font-size:13.5px;color:#6b6455;margin-top:6px")}>
        Three lines to fill. Tap one to open it.
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:22px;overflow:hidden",
        )}
      >
        {v.checkRows.map((row, i) => (
          <button
            key={i}
            type="button"
            onClick={row.tap}
            style={css(
              "width:100%;text-align:left;display:flex;gap:12px;align-items:flex-start;border:none;border-bottom:1px dashed #D6C69A;background:none;padding:15px 16px;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            <span
              style={css(
                `flex:none;width:22px;height:22px;border-radius:50%;border:1px solid #D6C69A;background:${row.dotBg};color:${row.dotFg};display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600`,
              )}
            >
              {row.mark}
            </span>
            <span style={css("flex:1")}>
              <span
                style={css(
                  "display:block;font-size:14.5px;font-weight:600;color:#202A33",
                )}
              >
                {row.title}
              </span>
              <span
                style={css(
                  "display:block;font-size:12px;color:#6b6455;margin-top:3px",
                )}
              >
                {row.sub}
              </span>
            </span>
            <span
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#9c9484",
              )}
            >
              {row.value}
            </span>
          </button>
        ))}
      </div>
      <div style={css("margin-top:auto;padding-top:26px")}>
        <button
          type="button"
          onClick={v.go.ledger}
          style={css(
            "width:100%;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
          )}
        >
          Open Sorthehelp
        </button>
      </div>
    </div>
  );
}
