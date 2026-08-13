"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";
import { Ledger } from "./Ledger";
import { Empty } from "./Empty";
import { MemberDetail } from "./MemberDetail";
import { Groups } from "./Groups";
import { Settings } from "./Settings";
import { Paywall } from "./Paywall";

export function AppShell({ v }: { v: SorthehelpVals }) {
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

      {v.payFor !== null && (
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
              onClick={v.closePay}
              style={css(
                "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
              )}
            >
              ✕
            </button>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;margin-right:32px",
              )}
            >
              <div>
                <div
                  style={css(
                    "font-family:Fraunces,serif;font-weight:600;font-size:24px",
                  )}
                >
                  Log a payment
                </div>
                <div style={css("font-size:12.5px;color:#6b6455;margin-top:4px")}>
                  Balance owing {v.payBalanceLabel}
                </div>
              </div>
              <div
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484;text-align:right;white-space:nowrap;padding-top:4px",
                )}
              >
                {v.payName}
              </div>
            </div>
            <div style={css("display:flex;flex-direction:column;gap:14px")}>
              <div>
                <label
                  style={css(
                    "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:8px",
                  )}
                >
                  Amount received (₦)
                </label>
                <input
                  type="number"
                  value={v.payAmount}
                  onChange={(e) => v.setPayAmount(e.target.value)}
                  placeholder="e.g. 2500"
                  style={css(
                    "width:100%;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                  )}
                />
              </div>
              <div style={css("display:flex;gap:8px")}>
                <button
                  type="button"
                  onClick={v.setHalf}
                  style={css(
                    "flex:1;border:1px solid #D6C69A;background:#FBF7EC;color:#202A33;border-radius:5px;padding:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Half
                </button>
                <button
                  type="button"
                  onClick={v.setFull}
                  style={css(
                    "flex:1;border:1px solid #D6C69A;background:#FBF7EC;color:#202A33;border-radius:5px;padding:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Full balance
                </button>
              </div>
              <div style={css("display:flex;gap:8px")}>
                <button
                  type="button"
                  onClick={v.closePay}
                  style={css(
                    "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={v.confirmPay}
                  style={css(
                    "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Log payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {v.reminderEditOpen && (
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
      )}
    </div>
  );
}
