"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function ReminderEditModal({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (!v.reminderEditOpen) return null;

  return (
    <div
      style={css(
        "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:30;display:flex;align-items:flex-end",
      )}
    >
      <div
        style={css(
          "position:relative;width:100%;max-height:80vh;background:#EFE7D3;border-radius:20px 20px 0 0;padding:24px 16px 32px;overflow-y:auto",
        )}
      >
        <button
          type="button"
          onClick={v.closeReminderEdit}
          style={css(
            "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
          )}
        >
          ✕
        </button>
        <div
          style={css(
            "font-family:Fraunces,serif;font-weight:600;font-size:24px;margin-bottom:6px;margin-right:32px",
          )}
        >
          Reminder message
        </div>
        <div
          style={css(
            "font-size:12.5px;color:#6b6455;margin-bottom:16px;line-height:1.5",
          )}
        >
          The text sent when you tap Remind on WhatsApp. Use{" "}
          <code>{"{name}"}</code>, <code>{"{group}"}</code> and{" "}
          <code>{"{amount}"}</code> — they&apos;re filled in per member.
        </div>
        <textarea
          value={v.reminderDraft}
          onChange={(e) => v.setReminderDraft(e.target.value)}
          rows={5}
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:11px;font-family:Inter,sans-serif;font-size:16px;line-height:1.5;color:#202A33;outline:none;resize:vertical",
          )}
        />
        <div style={css("display:flex;gap:8px;margin-top:14px")}>
          <button
            type="button"
            onClick={v.closeReminderEdit}
            style={css(
              "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={v.saveReminderEdit}
            style={css(
              "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
