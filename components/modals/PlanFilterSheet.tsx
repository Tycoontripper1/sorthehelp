"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function PlanFilterSheet({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (!v.planFilterOpen) return null;

  return (
    <div
      style={css(
        "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:20;display:flex;align-items:flex-end",
      )}
    >
      <div
        style={css(
          "position:relative;width:100%;max-height:70vh;background:#EFE7D3;border-radius:20px 20px 0 0;padding:24px 16px 32px;overflow-y:auto",
        )}
      >
        <button
          type="button"
          onClick={v.closePlanFilter}
          style={css(
            "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
          )}
        >
          ✕
        </button>
        <div
          style={css(
            "font-family:Fraunces,serif;font-weight:600;font-size:24px;margin-bottom:16px;margin-right:32px",
          )}
        >
          Filter by plan
        </div>
        <div style={css("display:flex;flex-direction:column;gap:6px")}>
          {v.planFilters.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={f.tap}
              style={css(
                `width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;border:1px solid ${f.active ? "#202A33" : "#D6C69A"};background:${f.active ? "#FBF7EC" : "transparent"};border-radius:4px;padding:12px 13px;cursor:pointer;font-family:Inter,sans-serif;font-size:14px;font-weight:600;color:#202A33`,
              )}
            >
              {f.label}
              {f.active && <span style={css("color:#3F6B4F")}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
