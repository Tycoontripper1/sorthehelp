"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function PlansSheet({ v }: { v: SorthehelpVals }): React.JSX.Element | null {
  if (!v.plansOpen) return null;

  return (
    <div
      style={css(
        "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:20;display:flex;align-items:flex-end",
      )}
    >
      <div
        style={css(
          "position:relative;width:100%;max-height:85vh;background:#EFE7D3;border-radius:20px 20px 0 0;padding:24px 16px 32px;overflow-y:auto",
        )}
      >
        <button
          type="button"
          onClick={v.closePlans}
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
            Plans
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484;white-space:nowrap",
            )}
          >
            {v.groupLabel}
          </div>
        </div>
        {v.planManageRows.length === 0 && (
          <div
            style={css(
              "text-align:center;padding:20px 8px;color:#9c9484;font-size:13px",
            )}
          >
            No plans yet for this group. Add one below.
          </div>
        )}
        <div style={css("display:flex;flex-direction:column;gap:10px")}>
          {v.planManageRows.map((p, i) => (
            <div
              key={i}
              style={css(
                `background:#FBF7EC;border:1px solid ${p.editing ? "#202A33" : "#D6C69A"};border-radius:4px;padding:12px 13px`,
              )}
            >
              <div
                style={css(
                  "display:flex;justify-content:space-between;align-items:flex-start;gap:10px",
                )}
              >
                <div>
                  <div
                    style={css(
                      "font-family:Fraunces,serif;font-size:16px;font-weight:600",
                    )}
                  >
                    {p.name}
                  </div>
                  <div
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#6b6455;margin-top:2px",
                    )}
                  >
                    {p.priceLabel}
                  </div>
                  <div
                    style={css(
                      "font-size:11.5px;color:#9c9484;margin-top:2px",
                    )}
                  >
                    {p.memberCount} member{p.memberCount === 1 ? "" : "s"}
                  </div>
                </div>
                <div style={css("display:flex;gap:6px;flex:none")}>
                  <button
                    type="button"
                    onClick={p.edit}
                    style={css(
                      "border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:4px;padding:6px 10px;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={p.remove}
                    style={css(
                      "border:1px solid #F0DCD3;background:#FBEDE7;color:#8C4A3A;border-radius:4px;padding:6px 10px;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;cursor:pointer",
                    )}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={css(
            "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:14px;margin-top:16px;display:flex;flex-direction:column;gap:10px",
          )}
        >
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455",
            )}
          >
            {v.isEditingPlan ? "Edit plan" : "New plan"}
          </div>
          <input
            type="text"
            value={v.planFormName}
            onChange={(e) => v.setPlanFormName(e.target.value)}
            placeholder="Plan name, e.g. VIP"
            style={css(
              "width:100%;border:1px solid #D6C69A;background:#FFF;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
            )}
          />
          <div
            style={css(
              "display:grid;grid-template-columns:1fr 1fr;gap:8px",
            )}
          >
            <input
              type="number"
              value={v.planFormPrice}
              onChange={(e) => v.setPlanFormPrice(e.target.value)}
              placeholder="Price (₦)"
              style={css(
                "width:100%;border:1px solid #D6C69A;background:#FFF;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
              )}
            />
            <div style={css("display:flex;gap:6px")}>
              <button
                type="button"
                onClick={() => v.pickPlanFormType("one_time")}
                style={css(
                  `flex:1;border:2px solid ${v.planFormType === "one_time" ? "#202A33" : "#D6C69A"};background:${v.planFormType === "one_time" ? "#202A33" : "transparent"};color:${v.planFormType === "one_time" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:8px 4px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                )}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => v.pickPlanFormType("recurring")}
                style={css(
                  `flex:1;border:2px solid ${v.planFormType === "recurring" ? "#202A33" : "#D6C69A"};background:${v.planFormType === "recurring" ? "#202A33" : "transparent"};color:${v.planFormType === "recurring" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:8px 4px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                )}
              >
                Recurring
              </button>
            </div>
          </div>
          <div style={css("display:flex;gap:8px")}>
            {v.isEditingPlan && (
              <button
                type="button"
                onClick={v.cancelPlanEdit}
                style={css(
                  "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:12px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
                )}
              >
                Cancel edit
              </button>
            )}
            <button
              type="button"
              onClick={v.savePlan}
              style={css(
                "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:12px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
              )}
            >
              {v.isEditingPlan ? "Save changes" : "Add plan"}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={v.closePlans}
          style={css(
            "width:100%;margin-top:16px;border:none;background:none;color:#6b6455;font-size:13px;cursor:pointer;font-family:Inter,sans-serif",
          )}
        >
          Done
        </button>
      </div>
    </div>
  );
}
