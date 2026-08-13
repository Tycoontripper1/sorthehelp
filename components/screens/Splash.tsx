"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Splash({ v }: { v: SorthehelpVals }) {
  return (
    <div
      style={css(
        "min-height:100dvh;display:flex;flex-direction:column;justify-content:space-between;padding:74px 26px 40px;box-sizing:border-box",
      )}
    >
      <div>
        <div
          style={css(
            "font-family:Fraunces,serif;font-weight:600;font-size:46px;letter-spacing:-.02em;line-height:1",
          )}
        >
          Sorthe
          <em style={css("font-style:italic;font-weight:500;color:#A6314A")}>
            help
          </em>
        </div>
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#9c9484;margin-top:14px",
          )}
        >
          Sorthehelp · v1 · Nigeria
        </div>
        <div
          style={css(
            "font-size:15px;line-height:1.55;color:#6b6455;margin-top:26px;max-width:300px;text-wrap:pretty",
          )}
        >
          Know who&apos;s paid, who&apos;s due, and who gets access. One book
          for one-time sales and recurring members.
        </div>

        <div style={css("position:relative;height:296px;margin:34px -6px 0")}>
          <div
            style={css(
              "position:absolute;top:16px;left:14px;right:34px;height:150px;background:#F3EBD8;border:1px solid #D6C69A;border-radius:4px;transform:rotate(-4deg);box-shadow:0 8px 20px -14px rgba(32,42,51,.5)",
            )}
          />
          <div
            style={css(
              "position:absolute;top:8px;left:34px;right:14px;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:0 14px 14px;transform:rotate(2.2deg);box-shadow:0 14px 28px -16px rgba(32,42,51,.55);overflow:hidden",
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
                  Ngozi Okafor
                </div>
                <div
                  style={css(
                    "font-size:11px;color:#6b6455;margin-top:2px;white-space:nowrap",
                  )}
                >
                  Advanced Crochet ·{" "}
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:.04em;color:#9c9484",
                    )}
                  >
                    one-time
                  </span>
                </div>
              </div>
              <span
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.04em;font-weight:600;background:#E3ECE3;color:#3F6B4F;padding:3px 7px;border-radius:3px",
                )}
              >
                Paid
              </span>
            </div>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-end;margin-top:14px",
              )}
            >
              <div>
                <div
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600",
                  )}
                >
                  ₦5,000
                </div>
                <div
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6b6455;margin-top:2px",
                  )}
                >
                  t.me/+abc123uniq
                </div>
              </div>
              <span
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:15px;letter-spacing:.08em;color:#A6314A;border:2.5px solid #A6314A;padding:2px 8px;border-radius:4px;transform:rotate(-9deg);mix-blend-mode:multiply",
                )}
              >
                PAID
              </span>
            </div>
          </div>
          <div
            style={css(
              "position:absolute;bottom:8px;left:6px;right:44px;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:13px 14px;transform:rotate(-1.6deg);box-shadow:0 14px 28px -16px rgba(32,42,51,.55)",
            )}
          >
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:flex-start",
              )}
            >
              <div>
                <div
                  style={css(
                    "font-family:Fraunces,serif;font-weight:600;font-size:17px",
                  )}
                >
                  Ibrahim Musa
                </div>
                <div
                  style={css("font-size:11.5px;color:#6b6455;margin-top:2px")}
                >
                  Iron Yard ·{" "}
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#9c9484",
                    )}
                  >
                    recurring
                  </span>
                </div>
              </div>
              <span
                style={css(
                  "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.04em;font-weight:600;background:#F0DCD3;color:#8C4A3A;padding:3px 7px;border-radius:3px",
                )}
              >
                Lapsed
              </span>
            </div>
            <div
              style={css(
                "display:flex;justify-content:space-between;align-items:baseline;margin-top:12px;font-family:'IBM Plex Mono',monospace;font-size:12px",
              )}
            >
              <span style={css("font-weight:600;font-size:13px")}>₦8,000</span>
              <span style={css("color:#8C4A3A")}>overdue 3 days</span>
            </div>
          </div>
        </div>
      </div>

      <div style={css("border-top:2px solid #202A33;padding-top:16px")}>
        <div style={css("display:flex;flex-direction:column;gap:10px")}>
          <button
            type="button"
            onClick={v.go.signup}
            style={css(
              "border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:15px;font-family:Inter,sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s",
            )}
          >
            Create an account
          </button>
          <button
            type="button"
            onClick={v.go.login}
            style={css(
              "border:1px solid #D6C69A;background:#FBF7EC;color:#202A33;border-radius:5px;padding:15px;font-family:Inter,sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s",
            )}
          >
            I already have one
          </button>
        </div>
        <div
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.06em;color:#9c9484;text-align:center;margin-top:16px;text-transform:uppercase",
          )}
        >
          Works offline after first sign-in
        </div>
      </div>
    </div>
  );
}
