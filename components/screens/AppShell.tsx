"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";
import React from "react";
import { Ledger } from "./Ledger";
import { Empty } from "./Empty";
import { MemberDetail } from "./MemberDetail";
import { Groups } from "./Groups";
import { Settings } from "./Settings";
import { Paywall } from "./Paywall";
import { BulkAddSheet, PayModal, PlanPickerModal, ReminderEditModal } from "@/components/modals";

export function AppShell({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div
      style={css(
        "min-height:100dvh;box-sizing:border-box;padding:44px 18px 148px",
      )}
    >
      {v.isLedger && <Ledger v={v} />}
      {v.isEmpty && <Empty v={v} />}
      {v.isMember && <MemberDetail v={v} />}
      {v.isGroups && <Groups v={v} />}
      {v.isSettings && <Settings v={v} />}
      {v.isPaywall && <Paywall v={v} />}

      <div
        style={css(
          "position:fixed;bottom:0;left:0;right:0;max-width:480px;margin:0 auto;display:flex;background:#FBF7EC;border-top:1px solid #D6C69A;box-shadow:0 -6px 18px -12px rgba(32,42,51,.4);padding:8px 6px 26px",
        )}
      >
        {v.tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={t.tap}
            style={css(
              `flex:1;border:none;background:none;padding:8px 0;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.07em;color:${t.color}`,
            )}
          >
            <span
              style={css(
                "display:block;font-size:16px;line-height:1;margin-bottom:5px",
              )}
            >
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      <PayModal v={v} />
      <PlanPickerModal v={v} />
      <ReminderEditModal v={v} />
      <BulkAddSheet v={v} />
    </div>
  );
}
