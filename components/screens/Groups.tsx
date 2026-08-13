"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Groups({ v }: { v: SorthehelpVals }) {
  return (
    <div>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;letter-spacing:-.01em",
        )}
      >
        Groups
      </div>
      <div style={css("font-size:13px;color:#6b6455;margin-top:5px")}>
        Each group keeps its own members, price and cycle.
      </div>
      <div
        style={css(
          "display:flex;flex-direction:column;gap:10px;margin-top:20px",
        )}
      >
        {v.groups.map((g, i) => (
          <button
            key={i}
            type="button"
            onClick={g.tap}
            style={css(
              `text-align:left;background:#FBF7EC;border:1px solid ${g.border};border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:14px 15px;cursor:pointer;font-family:Inter,sans-serif`,
            )}
          >
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:center",
              )}
            >
              <span
                style={css(
                  "font-family:Fraunces,serif;font-size:18px;font-weight:600",
                )}
              >
                {g.name}
              </span>
              <span
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484",
                )}
              >
                {g.cycle}
              </span>
            </div>
            <div
              style={css(
                "display:flex;gap:14px;margin-top:8px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#6b6455",
              )}
            >
              <span>{g.members} members</span>
              <span>{g.price}</span>
              <span style={css(`color:${g.dueColor}`)}>{g.dueNote}</span>
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={v.go.onboard}
          style={css(
            "border:1px dashed #D6C69A;background:transparent;border-radius:4px;padding:15px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;cursor:pointer",
          )}
        >
          + New group
        </button>
      </div>
      <div
        style={css(
          "background:#F3E7CB;border:1px solid #D6C69A;border-radius:4px;padding:14px 15px;margin-top:22px",
        )}
      >
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#A9781F",
          )}
        >
          Free plan · 2 of 2 groups used
        </div>
        <div
          style={css(
            "font-size:13px;color:#202A33;margin-top:6px;line-height:1.5",
          )}
        >
          A third group needs Sorthehelp Pro.
        </div>
        <button
          type="button"
          onClick={v.go.paywall}
          style={css(
            "margin-top:11px;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:4px;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
          )}
        >
          See plans
        </button>
      </div>
    </div>
  );
}
