"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function MemberDetail({ v }: { v: SorthehelpVals }): React.JSX.Element {
  const sel = v.sel;
  return (
    <div>
      <button
        type="button"
        onClick={v.go.ledger}
        style={css(
          "border:none;background:none;padding:0;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b6455;cursor:pointer",
        )}
      >
        ← Members
      </button>
      <div
        style={css(
          "display:flex;justify-content:space-between;align-items:flex-start;margin-top:16px;gap:12px",
        )}
      >
        <div>
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:29px;letter-spacing:-.01em",
            )}
          >
            {sel.name}
          </div>
          <div style={css("font-size:12.5px;color:#6b6455;margin-top:3px")}>
            {sel.planLabel} ·{" "}
            <span
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484",
              )}
            >
              {sel.typeLabel}
            </span>
          </div>
        </div>
        <span
          style={css(
            `font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;padding:4px 9px;border-radius:3px;font-weight:600;white-space:nowrap;background:${sel.badgeBg};color:${sel.badgeFg}`,
          )}
        >
          {sel.badge}
        </span>
      </div>
      <div
        style={css(
          "display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:20px",
        )}
      >
        <div
          style={css(
            "background:#FBF7EC;border:1px solid #D6C69A;border-radius:3px;padding:11px 12px",
          )}
        >
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455",
            )}
          >
            Amount
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:19px;font-weight:600;margin-top:4px",
            )}
          >
            {sel.amount}
          </div>
        </div>
        <div
          style={css(
            "background:#FBF7EC;border:1px solid #D6C69A;border-radius:3px;padding:11px 12px",
          )}
        >
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455",
            )}
          >
            Next due
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:19px;font-weight:600;margin-top:4px",
            )}
          >
            {sel.dueShort}
          </div>
        </div>
      </div>
      <div
        style={css(
          "display:flex;justify-content:space-between;align-items:center;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:12px 14px;margin-top:8px",
        )}
      >
        <div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455",
            )}
          >
            Plan
          </div>
          <div style={css("font-size:14px;font-weight:600;margin-top:3px")}>
            {sel.planLabel}
          </div>
        </div>
        <button
          type="button"
          onClick={() => v.openPlanPicker(v.selId)}
          style={css(
            "border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:4px;padding:8px 12px;font-family:Inter,sans-serif;font-size:12.5px;font-weight:600;cursor:pointer",
          )}
        >
          Change
        </button>
      </div>
      {sel.showPart && (
        <div
          style={css(
            "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;margin-top:12px;padding:14px 14px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18)",
          )}
        >
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455;margin-bottom:8px",
            )}
          >
            Balance
          </div>
          <div
            style={css(
              "position:relative;width:100%;height:10px;background:#D6C69A;border-radius:2px;overflow:hidden;margin-bottom:8px",
            )}
          >
            <div
              style={css(
                `position:absolute;left:0;top:0;height:100%;background:#3F6B4F;width:${sel.paidPercent}%`,
              )}
            />
          </div>
          <div
            style={css(
              "display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6b6455",
            )}
          >
            <span>{sel.paidAmount} paid</span>
            <span>{sel.balanceLeft} left</span>
          </div>
        </div>
      )}
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:12px;padding:14px 14px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18)",
        )}
      >
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455;padding-bottom:8px;border-bottom:2px solid #202A33",
          )}
        >
          Early access
        </div>
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:center;padding:12px 0",
          )}
        >
          <div>
            <div style={css("font-size:14px;font-weight:600")}>
              Access before full payment
            </div>
            <div style={css("font-size:12px;color:#6b6455;margin-top:3px")}>
              Let them in once paid enough
            </div>
          </div>
          <button
            type="button"
            onClick={v.toggleEarly}
            style={css(
              `flex:none;width:44px;height:26px;border-radius:14px;border:1px solid #D6C69A;background:${sel.earlyTrack};position:relative;cursor:pointer;padding:0`,
            )}
          >
            <span
              style={css(
                `position:absolute;top:2px;left:${sel.earlyKnob};width:20px;height:20px;border-radius:50%;background:#FBF7EC;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .16s`,
              )}
            />
          </button>
        </div>
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:12px;padding:14px 14px 6px",
        )}
      >
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455;padding-bottom:8px;border-bottom:2px solid #202A33",
          )}
        >
          Email
        </div>
        <div
          style={css("display:flex;align-items:center;gap:8px;padding:12px 0")}
        >
          <span
            style={css(
              `font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.04em;color:${sel.emailTagColor};white-space:nowrap`,
            )}
          >
            {sel.emailTag}
          </span>
          <input
            type="email"
            value={sel.email}
            onChange={v.onEmail}
            placeholder="add an email address"
            style={css(
              "flex:1;min-width:0;border:1px solid #D6C69A;background:#EFE7D3;border-radius:4px;padding:8px 9px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
            )}
          />
        </div>
        <div style={css("font-size:11.5px;color:#9c9484;padding-bottom:12px")}>
          Used to send stories, updates or PDFs later.
        </div>
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:12px;padding:14px 14px 6px",
        )}
      >
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455;padding-bottom:8px;border-bottom:2px solid #202A33",
          )}
        >
          Access link
        </div>
        <div
          style={css("display:flex;align-items:center;gap:8px;padding:12px 0")}
        >
          <span
            style={css(
              `font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.04em;color:${sel.linkTagColor};white-space:nowrap`,
            )}
          >
            {sel.linkTag}
          </span>
          <input
            type="text"
            value={sel.link}
            onChange={v.onLink}
            placeholder="paste this member's single-use link"
            style={css(
              "flex:1;min-width:0;border:1px solid #D6C69A;background:#EFE7D3;border-radius:4px;padding:8px 9px;font-family:'IBM Plex Mono',monospace;font-size:16px;color:#202A33;outline:none",
            )}
          />
        </div>
        <div style={css("font-size:11.5px;color:#9c9484;padding-bottom:12px")}>
          Generated for one person only. V2 creates it automatically on payment.
        </div>
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:12px;padding:14px 14px 6px",
        )}
      >
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#6b6455;padding-bottom:8px;border-bottom:2px solid #202A33",
          )}
        >
          Entries
        </div>
        {sel.history.map((h, i) => (
          <div
            key={i}
            style={css(
              "display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid #E6DBBE;font-family:'IBM Plex Mono',monospace;font-size:12px",
            )}
          >
            <span style={css("color:#6b6455")}>{h.date}</span>
            <span
              style={css(
                "flex:1;padding:0 10px;color:#202A33;font-family:Inter,sans-serif;font-size:12.5px",
              )}
            >
              {h.what}
            </span>
            <span style={css(`font-weight:600;color:${h.color}`)}>{h.amt}</span>
          </div>
        ))}
        <div
          style={css(
            "padding:12px 0 8px;display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:12px;text-transform:uppercase;letter-spacing:.05em",
          )}
        >
          <span style={css("color:#6b6455")}>Collected</span>
          <span style={css("font-weight:600;color:#A6314A")}>
            {sel.collected}
          </span>
        </div>
      </div>
      {sel.canLog && (
        <button
          type="button"
          onClick={v.openPay}
          style={css(
            "width:100%;border:1px solid #D6C69A;background:#FFF;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;margin-top:14px",
          )}
        >
          Log a payment
        </button>
      )}
      <div style={css("display:flex;gap:8px;margin-top:14px")}>
        <button
          type="button"
          onClick={v.paySel}
          style={css(
            "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
          )}
        >
          Mark as paid
        </button>
        <button
          type="button"
          onClick={v.remindSel}
          style={css(
            "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
          )}
        >
          Remind on WhatsApp
        </button>
      </div>
      <button
        type="button"
        onClick={v.go.ledger}
        style={css(
          "display:block;margin:16px auto 0;border:none;background:none;font-size:11px;color:#8C4A3A;text-decoration:underline;cursor:pointer;font-family:Inter,sans-serif",
        )}
      >
        Remove from this group
      </button>
    </div>
  );
}
