"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

import React from "react";

export function Ledger({ v }: { v: SorthehelpVals }): React.JSX.Element {
  return (
    <div>
      <div
        style={css(
          "display:flex;align-items:flex-end;justify-content:space-between",
        )}
      >
        <div>
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:27px;letter-spacing:-.01em",
            )}
          >
            Sorthe
            <em style={css("font-style:italic;font-weight:500;color:#A6314A")}>
              help
            </em>
          </div>
          <div style={css("display:flex;gap:6px;margin-top:7px")}>
            <button
              type="button"
              onClick={v.go.groups}
              style={css(
                "display:flex;align-items:center;gap:6px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:5px 11px;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer",
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
        </div>
        <button
          type="button"
          onClick={v.go.settings}
          style={css(
            "width:38px;height:38px;border-radius:50%;border:1px solid #D6C69A;background:#FBF7EC;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;color:#6b6455;cursor:pointer",
          )}
        >
          AN
        </button>
      </div>
      <div
        style={css(
          "display:flex;justify-content:space-between;align-items:baseline;border-top:2px solid #202A33;border-bottom:1px solid #D6C69A;padding:10px 2px;margin-top:20px",
        )}
      >
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455",
          )}
        >
          Total collected
        </span>
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:600;color:#A6314A",
          )}
        >
          {v.revenue}
        </span>
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
      {v.addOpen && (
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
      )}
      {v.planFilterOpen && (
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
      )}
      {v.plansOpen && (
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
      )}
      {v.telegramSheetOpen && (
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
                1. Add your Sorthehelp bot as admin to your Telegram group,
                with permission to invite users via link.
                <br />
                2. Get the group&apos;s chat ID — forward any message from it
                to a helper bot like @userinfobot.
                <br />
                3. Paste that chat ID below. Once connected, single-use
                invite links are generated automatically when a member&apos;s
                balance clears.
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
      )}
    </div>
  );
}
