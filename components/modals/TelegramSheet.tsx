"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function TelegramSheet({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (!v.telegramSheetOpen) return null;

  return (
    <div
      style={css(
        "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:20;display:flex;align-items:flex-end",
      )}
    >
      <div
        style={css(
          "position:relative;width:100%;max-height:80vh;background:#EFE7D3;border-radius:20px 20px 0 0;padding:24px 16px 32px;overflow-y:auto",
        )}
      >
        <button
          type="button"
          onClick={v.closeTelegramSettings}
          style={css(
            "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
          )}
        >
          ✕
        </button>
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;margin-right:32px",
          )}
        >
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:24px",
            )}
          >
            Telegram
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484;white-space:nowrap",
            )}
          >
            {v.groupLabel}
          </div>
        </div>
        <div
          style={css(
            `display:flex;align-items:center;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:18px;color:${v.telegramConnected ? "#3F6B4F" : "#9c9484"}`,
          )}
        >
          <span
            style={css(
              `width:7px;height:7px;border-radius:50%;background:${v.telegramConnected ? "#3F6B4F" : "#9c9484"}`,
            )}
          />
          {v.telegramConnected ? "Connected" : "Not connected"}
        </div>
        <div
          style={css(
            "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:13px 14px;margin-bottom:16px",
          )}
        >
          <div style={css("font-size:13px;font-weight:600;margin-bottom:6px")}>
            How this works
          </div>
          <div style={css("font-size:12.5px;color:#6b6455;line-height:1.6")}>
            1. Add your Sorthehelp bot as admin to your Telegram group, with
            permission to invite users via link.
            <br />
            2. Get the group&apos;s chat ID — forward any message from it to a
            helper bot like @userinfobot.
            <br />
            3. Paste that chat ID below. Once connected, single-use invite
            links are generated automatically when a member&apos;s balance
            clears.
          </div>
        </div>
        <label
          style={css(
            "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
          )}
        >
          Telegram chat ID
        </label>
        <input
          type="text"
          value={v.telegramDraft}
          onChange={(e) => v.setTelegramDraft(e.target.value)}
          placeholder="-1001234567890"
          style={css(
            "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:'IBM Plex Mono',monospace;font-size:16px;color:#202A33;outline:none",
          )}
        />
        <div style={css("display:flex;gap:8px;margin-top:14px")}>
          {v.telegramConnected && (
            <button
              type="button"
              onClick={v.disconnectTelegram}
              style={css(
                "flex:1;border:1px solid #F0DCD3;background:#FBEDE7;color:#8C4A3A;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
              )}
            >
              Disconnect
            </button>
          )}
          <button
            type="button"
            onClick={v.saveTelegramSettings}
            style={css(
              "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            {v.telegramConnected ? "Update" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
