"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function AddMemberSheet({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (!v.addOpen) return null;

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
          onClick={v.closeAdd}
          style={css(
            "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
          )}
        >
          ✕
        </button>
        <div
          style={css(
            "display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;margin-right:32px",
          )}
        >
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:24px",
            )}
          >
            Add a member
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484;white-space:nowrap",
            )}
          >
            {v.groupLabel}
          </div>
        </div>
        <div style={css("display:flex;flex-direction:column;gap:14px")}>
          <div>
            <label
              style={css(
                "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
              )}
            >
              Name
            </label>
            <input
              type="text"
              value={v.newName}
              onChange={(e) => v.setNewName(e.target.value)}
              placeholder="e.g. Ngozi Okafor"
              style={css(
                "width:100%;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
              )}
            />
          </div>
          <div>
            <label
              style={css(
                "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:8px",
              )}
            >
              Plan
            </label>
            <div style={css("display:flex;flex-wrap:wrap;gap:8px")}>
              {v.newMemberPlans.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={p.tap}
                  style={css(
                    `text-align:left;border:2px solid ${p.border};background:${p.bg};color:${p.fg};border-radius:4px;padding:8px 12px;cursor:pointer;font-family:Inter,sans-serif`,
                  )}
                >
                  <div style={css("font-size:13px;font-weight:600")}>
                    {p.label}
                  </div>
                  <div
                    style={css(
                      `font-family:'IBM Plex Mono',monospace;font-size:10.5px;margin-top:2px;color:${p.subFg}`,
                    )}
                  >
                    {p.sub}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={v.toggleNewPlanForm}
                style={css(
                  "border:1px dashed #D6C69A;background:transparent;color:#6b6455;border-radius:4px;padding:8px 12px;cursor:pointer;font-family:Inter,sans-serif;font-size:13px;font-weight:600",
                )}
              >
                + New plan
              </button>
            </div>
            {v.newPlanFormOpen && (
              <div
                style={css(
                  "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:12px;margin-top:10px;display:flex;flex-direction:column;gap:10px",
                )}
              >
                <input
                  type="text"
                  value={v.newPlanName}
                  onChange={(e) => v.setNewPlanName(e.target.value)}
                  placeholder="Plan name, e.g. VIP"
                  style={css(
                    "width:100%;border:1px solid #D6C69A;background:#FFF;border-radius:4px;padding:9px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                  )}
                />
                <div
                  style={css(
                    "display:grid;grid-template-columns:1fr 1fr;gap:8px",
                  )}
                >
                  <input
                    type="number"
                    value={v.newPlanPrice}
                    onChange={(e) => v.setNewPlanPrice(e.target.value)}
                    placeholder="Price (₦)"
                    style={css(
                      "width:100%;border:1px solid #D6C69A;background:#FFF;border-radius:4px;padding:9px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                    )}
                  />
                  <div style={css("display:flex;gap:6px")}>
                    <button
                      type="button"
                      onClick={() => v.pickNewPlanType("one_time")}
                      style={css(
                        `flex:1;border:2px solid ${v.newPlanType === "one_time" ? "#202A33" : "#D6C69A"};background:${v.newPlanType === "one_time" ? "#202A33" : "transparent"};color:${v.newPlanType === "one_time" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:8px 4px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                      )}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => v.pickNewPlanType("recurring")}
                      style={css(
                        `flex:1;border:2px solid ${v.newPlanType === "recurring" ? "#202A33" : "#D6C69A"};background:${v.newPlanType === "recurring" ? "#202A33" : "transparent"};color:${v.newPlanType === "recurring" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:8px 4px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                      )}
                    >
                      Recurring
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={v.createInlinePlan}
                  style={css(
                    "border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:4px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Add plan
                </button>
              </div>
            )}
          </div>
          {v.newPlanIsCustom && (
            <div>
              <label
                style={css(
                  "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:8px",
                )}
              >
                Plan type
              </label>
              <div style={css("display:flex;gap:8px")}>
                <button
                  type="button"
                  onClick={() => v.pickType("one_time")}
                  style={css(
                    `flex:1;border:2px solid ${v.newType === "one_time" ? "#202A33" : "#D6C69A"};background:${v.newType === "one_time" ? "#202A33" : "transparent"};color:${v.newType === "one_time" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                  )}
                >
                  One-time
                </button>
                <button
                  type="button"
                  onClick={() => v.pickType("recurring")}
                  style={css(
                    `flex:1;border:2px solid ${v.newType === "recurring" ? "#202A33" : "#D6C69A"};background:${v.newType === "recurring" ? "#202A33" : "transparent"};color:${v.newType === "recurring" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                  )}
                >
                  Recurring · 30 days
                </button>
              </div>
            </div>
          )}
          <div
            style={css(
              "display:grid;grid-template-columns:1fr 1fr;gap:10px",
            )}
          >
            {v.newPlanIsCustom && (
              <div>
                <label
                  style={css(
                    "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
                  )}
                >
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={v.newAmount}
                  onChange={(e) => v.setNewAmount(e.target.value)}
                  placeholder="5000"
                  style={css(
                    "width:100%;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                  )}
                />
              </div>
            )}
            <div style={css(v.newPlanIsCustom ? "" : "grid-column:1 / -1")}>
              <label
                style={css(
                  "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
                )}
              >
                WhatsApp
              </label>
              <input
                type="tel"
                value={v.newPhone}
                onChange={(e) => v.setNewPhone(e.target.value)}
                placeholder="08012345678"
                style={css(
                  "width:100%;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                )}
              />
            </div>
          </div>
          <div style={css("display:flex;gap:8px;margin-top:8px")}>
            <button
              type="button"
              onClick={v.closeAdd}
              style={css(
                "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={v.confirmAdd}
              style={css(
                "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
              )}
            >
              Add member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
