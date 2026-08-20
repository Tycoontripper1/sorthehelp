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
      <button
        type="button"
        onClick={v.openBroadcast}
        style={css(
          "display:flex;align-items:center;gap:8px;width:100%;margin-top:14px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:5px;padding:12px 14px;cursor:pointer;font-family:Inter,sans-serif",
        )}
      >
        <span style={css("font-size:16px;line-height:1")}>✉</span>
        <span style={css("flex:1;text-align:left")}>
          <span style={css("display:block;font-size:14px;font-weight:600;color:#202A33")}>
            Send an update
          </span>
          <span style={css("display:block;font-size:11.5px;color:#6b6455;margin-top:1px")}>
            Email a broadcast to a group, or everyone
          </span>
        </span>
      </button>
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
          Free plan · {v.groups.length} of 2 groups used
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
      {v.broadcastOpen && (
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
              onClick={v.closeBroadcast}
              style={css(
                "position:absolute;top:16px;right:16px;border:none;background:none;font-size:24px;color:#6b6455;cursor:pointer;width:28px;height:28px;padding:0",
              )}
            >
              ✕
            </button>
            <div
              style={css(
                "font-family:Fraunces,serif;font-weight:600;font-size:24px;margin-bottom:20px;margin-right:32px",
              )}
            >
              Send an update
            </div>
            <div style={css("display:flex;flex-direction:column;gap:14px")}>
              <div>
                <label
                  style={css(
                    "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:8px",
                  )}
                >
                  Audience
                </label>
                <div style={css("display:flex;gap:8px")}>
                  <button
                    type="button"
                    onClick={() => v.setBroadcastAudience("group")}
                    style={css(
                      `flex:1;border:2px solid ${v.broadcastAudience === "group" ? "#202A33" : "#D6C69A"};background:${v.broadcastAudience === "group" ? "#202A33" : "transparent"};color:${v.broadcastAudience === "group" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                    )}
                  >
                    {v.groupLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => v.setBroadcastAudience("all")}
                    style={css(
                      `flex:1;border:2px solid ${v.broadcastAudience === "all" ? "#202A33" : "#D6C69A"};background:${v.broadcastAudience === "all" ? "#202A33" : "transparent"};color:${v.broadcastAudience === "all" ? "#EFE7D3" : "#202A33"};border-radius:4px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif`,
                    )}
                  >
                    Everyone
                  </button>
                </div>
                <div
                  style={css(
                    "font-size:11.5px;color:#9c9484;margin-top:8px",
                  )}
                >
                  {v.broadcastRecipientCount} member
                  {v.broadcastRecipientCount === 1 ? "" : "s"} with an email on
                  file will get this.
                </div>
              </div>
              <div>
                <label
                  style={css(
                    "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
                  )}
                >
                  Subject
                </label>
                <input
                  type="text"
                  value={v.broadcastSubject}
                  onChange={(e) => v.setBroadcastSubject(e.target.value)}
                  placeholder="New pattern this week!"
                  style={css(
                    "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:10px;font-family:Inter,sans-serif;font-size:16px;color:#202A33;outline:none",
                  )}
                />
              </div>
              <div>
                <label
                  style={css(
                    "display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b6455;margin-bottom:6px",
                  )}
                >
                  Message
                </label>
                <textarea
                  value={v.broadcastBody}
                  onChange={(e) => v.setBroadcastBody(e.target.value)}
                  placeholder="Hi everyone, ..."
                  rows={6}
                  style={css(
                    "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#FBF7EC;border-radius:4px;padding:11px;font-family:Inter,sans-serif;font-size:16px;line-height:1.5;color:#202A33;outline:none;resize:vertical",
                  )}
                />
              </div>
              <div style={css("display:flex;gap:8px")}>
                <button
                  type="button"
                  onClick={v.closeBroadcast}
                  style={css(
                    "flex:1;border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={v.sendBroadcastMock}
                  style={css(
                    "flex:1;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
                  )}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
