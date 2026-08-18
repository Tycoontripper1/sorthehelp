"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function Pin({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div
      style={css(
        "padding:56px 20px 40px;min-height:100dvh;box-sizing:border-box",
      )}
    >
      <button
        type="button"
        onClick={v.go.recover}
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
        Set a new PIN
      </div>
      <div
        style={css(
          "font-size:13.5px;color:#6b6455;margin-top:6px;max-width:300px",
        )}
      >
        Four digits. Anyone holding the shop phone needs it to open the app.
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
          New PIN
        </label>
        <div style={css("display:flex;gap:9px")}>
          {v.pinCells.map((cell, i) => (
            <button
              key={i}
              type="button"
              onClick={cell.tap}
              style={css(
                "flex:1;aspect-ratio:1/1.1;border:1px solid #D6C69A;border-bottom:2px solid #202A33;background:#EFE7D3;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:600;color:#202A33;cursor:pointer;padding:0;transition:all .2s",
              )}
            >
              {cell.ch}
            </button>
          ))}
        </div>
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin:18px 0 8px",
          )}
        >
          Confirm PIN
        </label>
        <div style={css("display:flex;gap:9px")}>
          {v.pinCells2.map((cell, i) => (
            <div
              key={i}
              style={css(
                "flex:1;aspect-ratio:1/1.1;border:1px solid #D6C69A;border-bottom:2px solid #202A33;background:#EFE7D3;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:600;color:#202A33;display:flex;align-items:center;justify-content:center",
              )}
            >
              {cell.ch}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={v.go.ledger}
          style={css(
            "width:100%;margin-top:20px;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          Save PIN and continue
        </button>
      </div>
    </div>
  );
}
