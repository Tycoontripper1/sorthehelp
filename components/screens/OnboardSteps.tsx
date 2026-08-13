"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function OnboardSteps({ v }: { v: SorthehelpVals }) {
  return (
    <div
      style={css(
        "padding:52px 20px 40px;min-height:100dvh;box-sizing:border-box;display:flex;flex-direction:column",
      )}
    >
      <div
        style={css(
          "display:flex;align-items:center;justify-content:space-between",
        )}
      >
        <button
          type="button"
          onClick={v.obBack}
          style={css(
            "border:none;background:none;padding:0;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b6455;cursor:pointer",
          )}
        >
          ← Back
        </button>
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9c9484",
          )}
        >
          Setup {v.obStep}/3
        </span>
      </div>

      <div
        style={css(
          "display:flex;gap:6px;margin-top:16px;border-bottom:2px solid #202A33;padding-bottom:10px",
        )}
      >
        {v.obBars.map((bar, i) => (
          <div
            key={i}
            style={css("flex:1;display:flex;flex-direction:column;gap:7px")}
          >
            <div
              style={css(`height:3px;border-radius:2px;background:${bar.bg}`)}
            />
            <div
              style={css(
                `display:flex;align-items:baseline;gap:5px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.05em;color:${bar.fg}`,
              )}
            >
              <span>{bar.n}</span>
              <span>{bar.label}</span>
            </div>
          </div>
        ))}
      </div>

      {v.obIs1 && (
        <div style={css("margin-top:28px")}>
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:27px;letter-spacing:-.01em;text-wrap:pretty",
            )}
          >
            What are you tracking?
          </div>
          <div style={css("font-size:13.5px;color:#6b6455;margin-top:8px")}>
            This only sets the defaults. You can keep both kinds in one place.
          </div>
          <div
            style={css(
              "display:flex;flex-direction:column;gap:11px;margin-top:20px",
            )}
          >
            <button
              type="button"
              onClick={v.pickOneTime}
              style={css(
                `text-align:left;background:${v.oneTimeBg};border:1px solid ${v.oneTimeBorder};border-radius:4px;padding:16px;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 1px 0 rgba(32,42,51,.05);transition:all .2s`,
              )}
            >
              <div
                style={css(
                  "display:flex;justify-content:space-between;align-items:center",
                )}
              >
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#9c9484",
                  )}
                >
                  One-time
                </span>
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:13px;color:#3F6B4F",
                  )}
                >
                  {v.oneTimeMark}
                </span>
              </div>
              <div
                style={css(
                  "font-family:Fraunces,serif;font-size:18px;font-weight:600;margin-top:6px",
                )}
              >
                People pay once for access
              </div>
              <div
                style={css(
                  "font-size:12.5px;color:#6b6455;margin-top:4px;line-height:1.5",
                )}
              >
                A paid class, a course, a workshop. Each buyer gets their own
                Telegram invite link.
              </div>
              <div
                style={css(
                  "display:flex;align-items:center;gap:7px;margin-top:12px;padding-top:11px;border-top:1px dashed #D6C69A",
                )}
              >
                <span
                  style={css(
                    "flex:none;width:26px;height:32px;border:1px solid #D6C69A;border-radius:2px;background:#EFE7D3",
                  )}
                />
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:12px;color:#9c9484",
                  )}
                >
                  →
                </span>
                <span
                  style={css(
                    "flex:1;height:22px;border-radius:11px;background:#E9F0FA;border:1px solid #C7D9EE;display:flex;align-items:center;padding:0 9px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.04em;color:#2E5C8A",
                  )}
                >
                  t.me/+ one link, one person
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={v.pickRecurring}
              style={css(
                `text-align:left;background:${v.recurBg};border:1px solid ${v.recurBorder};border-radius:4px;padding:16px;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 1px 0 rgba(32,42,51,.05);transition:all .2s`,
              )}
            >
              <div
                style={css(
                  "display:flex;justify-content:space-between;align-items:center",
                )}
              >
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#9c9484",
                  )}
                >
                  Recurring
                </span>
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:13px;color:#3F6B4F",
                  )}
                >
                  {v.recurMark}
                </span>
              </div>
              <div
                style={css(
                  "font-family:Fraunces,serif;font-size:18px;font-weight:600;margin-top:6px",
                )}
              >
                People pay again every period
              </div>
              <div
                style={css(
                  "font-size:12.5px;color:#6b6455;margin-top:4px;line-height:1.5",
                )}
              >
                A gym, a class subscription, rent on equipment, anything that
                comes due again.
              </div>
              <div
                style={css(
                  "display:flex;align-items:center;gap:6px;margin-top:12px;padding-top:11px;border-top:1px dashed #D6C69A;font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.04em",
                )}
              >
                <span
                  style={css(
                    "padding:3px 7px;border-radius:3px;background:#E3ECE3;color:#3F6B4F",
                  )}
                >
                  paid
                </span>
                <span style={css("flex:1;height:1px;background:#D6C69A")} />
                <span style={css("color:#9c9484")}>30 days</span>
                <span style={css("flex:1;height:1px;background:#D6C69A")} />
                <span
                  style={css(
                    "padding:3px 7px;border-radius:3px;background:#F3E7CB;color:#A9781F",
                  )}
                >
                  due
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {v.obIs2 && (
        <div style={css("margin-top:28px")}>
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:27px;letter-spacing:-.01em",
            )}
          >
            Create your first group
          </div>
          <div style={css("font-size:13.5px;color:#6b6455;margin-top:8px")}>
            A group is one cohort or one location. Add more any time.
          </div>
          <div
            style={css(
              "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:18px 16px;margin-top:20px",
            )}
          >
            <label
              style={css(
                "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin-bottom:6px",
              )}
            >
              Group name
            </label>
            <input
              type="text"
              value={v.groupName}
              onChange={v.onGroupName}
              placeholder="e.g. Advanced Crochet"
              style={css(
                "width:100%;box-sizing:border-box;border:1px solid #D6C69A;background:#EFE7D3;border-radius:5px;padding:12px 11px;font-family:Inter,sans-serif;font-size:15px;color:#202A33;outline:none",
              )}
            />
            <label
              style={css(
                "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin:16px 0 6px",
              )}
            >
              Price
            </label>
            <div
              style={css(
                "display:flex;align-items:stretch;border:1px solid #D6C69A;border-radius:5px;background:#EFE7D3;overflow:hidden",
              )}
            >
              <span
                style={css(
                  "display:flex;align-items:center;padding:0 12px;font-family:'IBM Plex Mono',monospace;font-size:15px;color:#6b6455;background:#E6DBBE;border-right:1px solid #D6C69A",
                )}
              >
                ₦
              </span>
              <input
                type="text"
                value={v.groupPrice}
                onChange={v.onGroupPrice}
                placeholder="5000"
                style={css(
                  "flex:1;min-width:0;border:none;background:transparent;padding:12px 11px;font-family:'IBM Plex Mono',monospace;font-size:15px;color:#202A33;outline:none",
                )}
              />
            </div>
            <label
              style={css(
                "display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;margin:16px 0 6px",
              )}
            >
              Payment cycle
            </label>
            <div style={css("display:flex;gap:8px")}>
              <button
                type="button"
                onClick={v.pickOneTime}
                style={css(
                  `flex:1;padding:11px;border-radius:5px;border:1px solid ${v.oneTimeBorder};background:${v.oneTimePillBg};color:${v.oneTimePillFg};font-family:Inter,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s`,
                )}
              >
                Once
              </button>
              <button
                type="button"
                onClick={v.pickRecurring}
                style={css(
                  `flex:1;padding:11px;border-radius:5px;border:1px solid ${v.recurBorder};background:${v.recurPillBg};color:${v.recurPillFg};font-family:Inter,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s`,
                )}
              >
                Every 30 days
              </button>
            </div>
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.08em;color:#9c9484;margin:20px 0 8px",
            )}
          >
            How it will read in your book
          </div>
          <div
            style={css(
              "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:0 14px 13px;overflow:hidden;opacity:.92",
            )}
          >
            <div
              style={css(
                "height:6px;margin:0 -14px;background-image:radial-gradient(circle at 6px 0px,#EFE7D3 3.2px,transparent 3.3px);background-size:12px 6px;background-repeat:repeat-x",
              )}
            />
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start;margin-top:9px",
              )}
            >
              <div>
                <div
                  style={css(
                    "font-family:Fraunces,serif;font-weight:600;font-size:17px",
                  )}
                >
                  {v.groupNameOut}
                </div>
                <div
                  style={css(
                    "font-size:11px;color:#6b6455;margin-top:2px;white-space:nowrap",
                  )}
                >
                  First member ·{" "}
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.04em;color:#9c9484",
                    )}
                  >
                    {v.typeWord}
                  </span>
                </div>
              </div>
              <span
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.04em;font-weight:600;background:#ECE7DA;color:#9c9484;padding:3px 7px;border-radius:3px",
                )}
              >
                Pending
              </span>
            </div>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:baseline;margin-top:11px;font-family:'IBM Plex Mono',monospace;font-size:12px",
              )}
            >
              <span style={css("font-weight:600;font-size:13px")}>
                {v.groupPriceOut}
              </span>
              <span style={css("color:#6b6455")}>{v.previewDue}</span>
            </div>
          </div>
        </div>
      )}

      {v.obIs3 && (
        <div style={css("margin-top:28px")}>
          <div
            style={css(
              "font-family:Fraunces,serif;font-weight:600;font-size:27px;letter-spacing:-.01em",
            )}
          >
            How do people get access?
          </div>
          <div style={css("font-size:13.5px;color:#6b6455;margin-top:8px")}>
            Manual today. One tap when the automation lands.
          </div>
          <div
            style={css(
              "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:20px;overflow:hidden",
            )}
          >
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:15px 16px;border-bottom:1px dashed #D6C69A",
              )}
            >
              <div>
                <div style={css("font-size:14.5px;font-weight:600")}>
                  Telegram invite links
                </div>
                <div
                  style={css(
                    "font-size:12px;color:#6b6455;margin-top:3px;line-height:1.5",
                  )}
                >
                  One single-use link per paying member, so nobody shares their
                  way in.
                </div>
              </div>
              <button
                type="button"
                onClick={v.toggleTg}
                style={css(
                  `flex:none;width:44px;height:26px;border-radius:14px;border:1px solid #D6C69A;background:${v.tgTrack};position:relative;cursor:pointer;padding:0;transition:all .2s`,
                )}
              >
                <span
                  style={css(
                    `position:absolute;top:2px;left:${v.tgKnob};width:20px;height:20px;border-radius:50%;background:#FBF7EC;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .16s`,
                  )}
                />
              </button>
            </div>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:15px 16px",
              )}
            >
              <div>
                <div style={css("font-size:14.5px;font-weight:600")}>
                  WhatsApp reminders
                </div>
                <div
                  style={css(
                    "font-size:12px;color:#6b6455;margin-top:3px;line-height:1.5",
                  )}
                >
                  Opens a pre-written message on your phone. Real sending comes
                  later.
                </div>
              </div>
              <button
                type="button"
                onClick={v.toggleWa}
                style={css(
                  `flex:none;width:44px;height:26px;border-radius:14px;border:1px solid #D6C69A;background:${v.waTrack};position:relative;cursor:pointer;padding:0;transition:all .2s`,
                )}
              >
                <span
                  style={css(
                    `position:absolute;top:2px;left:${v.waKnob};width:20px;height:20px;border-radius:50%;background:#FBF7EC;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .16s`,
                  )}
                />
              </button>
            </div>
          </div>
          <div
            style={css(
              "position:relative;background:#F3EBD8;border:1px solid #D6C69A;border-radius:4px;margin-top:20px;padding:14px 15px 15px;overflow:hidden",
            )}
          >
            <div
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.09em;color:#9c9484;padding-bottom:9px;border-bottom:2px solid #202A33",
              )}
            >
              Opening entry
            </div>
            <div
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:11.5px;line-height:2;color:#6b6455;text-transform:uppercase;letter-spacing:.05em",
              )}
            >
              <div
                style={css(
                  "display:flex;justify-content:space-between;gap:12px;border-bottom:1px dashed #D6C69A",
                )}
              >
                <span style={css("flex:none")}>Group</span>
                <span
                  style={css(
                    "min-width:0;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;letter-spacing:0;text-transform:none;color:#202A33",
                  )}
                >
                  {v.groupNameOut}
                </span>
              </div>
              <div
                style={css(
                  "display:flex;justify-content:space-between;gap:12px;border-bottom:1px dashed #D6C69A",
                )}
              >
                <span style={css("flex:none")}>Price</span>
                <span
                  style={css(
                    "white-space:nowrap;letter-spacing:0;color:#202A33",
                  )}
                >
                  {v.groupPriceOut}
                </span>
              </div>
              <div
                style={css(
                  "display:flex;justify-content:space-between;gap:12px;border-bottom:1px dashed #D6C69A",
                )}
              >
                <span style={css("flex:none")}>Cycle</span>
                <span
                  style={css(
                    "white-space:nowrap;letter-spacing:0;color:#202A33",
                  )}
                >
                  {v.cycleOut}
                </span>
              </div>
              <div
                style={css(
                  "display:flex;justify-content:space-between;gap:12px",
                )}
              >
                <span style={css("flex:none")}>Access</span>
                <span
                  style={css(
                    "white-space:nowrap;letter-spacing:0;color:#202A33",
                  )}
                >
                  {v.accessOut}
                </span>
              </div>
            </div>
            <div
              style={css(
                "position:absolute;bottom:12px;right:14px;font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:13px;letter-spacing:.08em;color:#A6314A;border:2px solid #A6314A;padding:2px 7px;border-radius:3px;transform:rotate(-8deg);mix-blend-mode:multiply",
              )}
            >
              READY
            </div>
          </div>
        </div>
      )}

      <div style={css("margin-top:auto;padding-top:26px")}>
        <button
          type="button"
          onClick={v.obNext}
          style={css(
            "width:100%;border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s",
          )}
        >
          {v.obCta}
        </button>
        <button
          type="button"
          onClick={v.go.empty}
          style={css(
            "display:block;margin:12px auto 0;border:none;background:none;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-decoration:underline;cursor:pointer",
          )}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
