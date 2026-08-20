"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";
import {
  AddMemberSheet,
  PlanFilterSheet,
  PlansSheet,
  TelegramSheet,
} from "@/components/modals";

import React from "react";

export function Ledger({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div>
      <div
        style={css(
          "display:flex;align-items:center;justify-content:space-between",
        )}
      >
        <button
          type="button"
          onClick={v.go.settings}
          style={css(
            "flex:none;width:38px;height:38px;border-radius:50%;border:1px solid #D6C69A;background:#FBF7EC;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;color:#6b6455;cursor:pointer",
          )}
        >
          AN
        </button>
        <button
          type="button"
          onClick={v.openNotifications}
          style={css(
            "position:relative;flex:none;width:38px;height:38px;border-radius:50%;border:1px solid #D6C69A;background:#FBF7EC;color:#6b6455;cursor:pointer;display:flex;align-items:center;justify-content:center",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          {v.notificationCount > 0 && (
            <span
              style={css(
                "position:absolute;top:-3px;right:-3px;min-width:16px;height:16px;padding:0 3px;border-radius:8px;background:#A6314A;border:2px solid #EFE7D3;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1",
              )}
            >
              {v.notificationCount}
            </span>
          )}
        </button>
      </div>
      <div style={css("display:flex;gap:6px;flex-wrap:wrap;margin-top:8px")}>
        <button
          type="button"
          onClick={v.go.groups}
          style={css(
            "display:flex;align-items:center;gap:6px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:6px 12px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer",
          )}
        >
          {v.groupLabel} ▾
        </button>
        <button
          type="button"
          onClick={v.openPlans}
          style={css(
            "display:flex;align-items:center;gap:6px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:5px 11px;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer",
          )}
        >
          Plans
        </button>
        <button
          type="button"
          onClick={v.openTelegramSettings}
          style={css(
            "display:flex;align-items:center;gap:6px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:5px 11px;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer",
          )}
        >
          <span
            style={css(
              `width:6px;height:6px;border-radius:50%;background:${v.telegramConnected ? "#3F6B4F" : "#9c9484"}`,
            )}
          />
          Telegram
        </button>
      </div>
      <div
        style={css(
          "display:flex;align-items:center;justify-content:space-between;gap:14px;border-top:2px solid #202A33;border-bottom:1px solid #D6C69A;padding:14px 2px;margin-top:20px",
        )}
      >
        <div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455",
            )}
          >
            Total collected
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:600;color:#A6314A;margin-top:3px",
            )}
          >
            {v.groupCollectedLabel}
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#9c9484;margin-top:2px",
            )}
          >
            of {v.groupTargetLabel} expected
          </div>
        </div>
        <div style={css("position:relative;width:60px;height:60px;flex:none")}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#D6C69A"
              strokeWidth="6"
            />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#3F6B4F"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={
                2 *
                Math.PI *
                26 *
                (1 - Math.min(100, Math.max(0, v.groupPercent || 0)) / 100)
              }
              transform="rotate(-90 30 30)"
            />
          </svg>
          <span
            style={css(
              "position:absolute;top:0;left:0;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:700;color:#202A33",
            )}
          >
            {v.groupPercent || 0}%
          </span>
        </div>
      </div>
      <div
        style={css(
          "display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:14px",
        )}
      >
        {v.stats.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={s.tap}
            style={css(
              `background:#FBF7EC;border:1px solid #D6C69A;border-radius:3px;padding:10px 3px;text-align:center;cursor:pointer;box-shadow:${s.shadow}`,
            )}
          >
            <div
              style={css(
                `font-family:'IBM Plex Mono',monospace;font-size:20px;font-weight:600;line-height:1;color:${s.color}`,
              )}
            >
              {s.n}
            </div>
            <div
              style={css(
                "font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-top:5px;font-family:Inter,sans-serif",
              )}
            >
              {s.label}
            </div>
          </button>
        ))}
      </div>
      <div
        style={css(
          "display:flex;align-items:center;gap:8px;margin-top:14px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:9px 13px",
        )}
      >
        <span style={css("font-size:13px;color:#9c9484;line-height:1")}>⌕</span>
        <input
          type="text"
          value={v.query}
          onChange={v.onQuery}
          placeholder="Search name or number"
          style={css(
            "flex:1;min-width:0;border:none;background:transparent;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
          )}
        />
        {v.query && (
          <button
            type="button"
            onClick={v.clearQuery}
            style={css(
              "border:none;background:none;color:#9c9484;font-size:15px;cursor:pointer;padding:0;line-height:1",
            )}
          >
            ✕
          </button>
        )}
      </div>
      <div
        style={css(
          "display:flex;align-items:center;gap:6px;margin-top:16px;flex-wrap:wrap",
        )}
      >
        <div style={css("display:flex;gap:6px;flex-wrap:wrap;flex:1")}>
          {v.filters.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={f.tap}
              style={css(
                `font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.03em;text-transform:uppercase;padding:7px 12px;border-radius:20px;border:1px solid ${f.border};background:${f.bg};color:${f.fg};cursor:pointer`,
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        {v.planFilters.length > 1 && (
          <button
            type="button"
            onClick={v.openPlanFilter}
            style={css(
              "display:flex;align-items:center;gap:6px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:7px 12px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.03em;text-transform:uppercase;color:#202A33;cursor:pointer;white-space:nowrap",
            )}
          >
            {v.planFilterLabel} ▾
          </button>
        )}
      </div>
      {v.rows.length === 0 && (
        <div
          style={css(
            "text-align:center;padding:32px 16px;color:#9c9484;font-size:13px;margin-top:16px",
          )}
        >
          {v.query
            ? `No members match "${v.query}"`
            : "No members match these filters"}
        </div>
      )}
      <div
        style={css(
          "display:flex;flex-direction:column;gap:12px;margin-top:16px",
        )}
      >
        {v.rows.map((m) => (
          <div
            key={m.id}
            style={css(
              "position:relative;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:0 14px 12px;overflow:hidden",
            )}
          >
            <div
              style={css(
                "height:6px;margin:0 -14px;background-image:radial-gradient(circle at 6px 0px,#EFE7D3 3.2px,transparent 3.3px);background-size:12px 6px;background-repeat:repeat-x",
              )}
            />
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start;margin-top:8px",
              )}
            >
              <button
                type="button"
                onClick={m.open}
                style={css(
                  "border:none;background:none;padding:0;text-align:left;cursor:pointer;font-family:Inter,sans-serif",
                )}
              >
                <div
                  style={css(
                    "font-family:Fraunces,serif;font-weight:600;font-size:17px;color:#202A33",
                  )}
                >
                  {m.name}
                </div>
                <div style={css("font-size:12px;color:#6b6455;margin-top:2px")}>
                  {m.planLabel} ·{" "}
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484",
                    )}
                  >
                    {m.typeLabel}
                  </span>
                </div>
              </button>
              <span
                style={css(
                  `font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;padding:3px 8px;border-radius:3px;font-weight:600;white-space:nowrap;background:${m.badgeBg};color:${m.badgeFg}`,
                )}
              >
                {m.badge}
              </span>
            </div>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:center;margin-top:12px;gap:10px",
              )}
            >
              <div>
                <div
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600",
                  )}
                >
                  {m.amount}
                </div>
                <div
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#6b6455;margin-top:2px",
                  )}
                >
                  {m.dueText}
                </div>
              </div>
              <div style={css("display:flex;gap:6px")}>
                {m.showLog && (
                  <button
                    type="button"
                    onClick={m.logPayment}
                    style={css(
                      "border:1px solid #D6C69A;background:#FFF;color:#202A33;border-radius:4px;padding:7px 11px;font-family:Inter,sans-serif;font-size:12px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Log payment
                  </button>
                )}
                {m.showPay && (
                  <button
                    type="button"
                    onClick={m.pay}
                    style={css(
                      "border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:4px;padding:7px 11px;font-family:Inter,sans-serif;font-size:12px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Mark as paid
                  </button>
                )}
                {m.showSend && (
                  <button
                    type="button"
                    onClick={m.send}
                    style={css(
                      "border:1px solid #C7D9EE;background:#E9F0FA;color:#2E5C8A;border-radius:4px;padding:7px 11px;font-family:Inter,sans-serif;font-size:12px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Send access
                  </button>
                )}
                {m.showRemind && (
                  <button
                    type="button"
                    onClick={m.remind}
                    style={css(
                      "border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:4px;padding:7px 11px;font-family:Inter,sans-serif;font-size:12px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Remind
                  </button>
                )}
              </div>
            </div>
            {m.stamped && (
              <div
                style={css(
                  "position:absolute;top:34%;right:18px;font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:22px;letter-spacing:.08em;color:#A6314A;border:3px solid #A6314A;padding:3px 10px;border-radius:4px;mix-blend-mode:multiply;pointer-events:none;animation:stampIn .5s cubic-bezier(.2,.9,.3,1.2) forwards",
                )}
              >
                PAID
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={v.openAdd}
        style={css(
          "position:fixed;bottom:76px;right:16px;width:50px;height:50px;border-radius:50%;border:none;background:#202A33;color:#EFE7D3;font-size:24px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:10",
        )}
      >
        +
      </button>
      <AddMemberSheet v={v} />
      <PlanFilterSheet v={v} />
      <PlansSheet v={v} />
      <TelegramSheet v={v} />
    </div>
  );
}
