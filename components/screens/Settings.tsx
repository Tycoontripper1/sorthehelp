"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Settings({ v }: { v: SorthehelpVals }) {
  return (
    <div>
      <div
        style={css(
          "font-family:Fraunces,serif;font-weight:600;font-size:28px;letter-spacing:-.01em",
        )}
      >
        Profile
      </div>
      <div
        style={css(
          "display:flex;align-items:center;gap:13px;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);padding:15px;margin-top:16px",
        )}
      >
        <div
          style={css(
            "flex:none;width:46px;height:46px;border-radius:50%;background:#E6DBBE;border:1px solid #D6C69A;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:600;color:#6b6455",
          )}
        >
          AN
        </div>
        <div style={css("flex:1;min-width:0")}>
          <div
            style={css(
              "font-family:Fraunces,serif;font-size:18px;font-weight:600",
            )}
          >
            {v.ownerNameOut}
          </div>
          <div
            style={css(
              "font-family:'IBM Plex Mono',monospace;font-size:12px;color:#6b6455;margin-top:2px",
            )}
          >
            {v.phoneDisplay}
          </div>
        </div>
        <span
          style={css(
            "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#3F6B4F;background:#E3ECE3;border-radius:3px;padding:3px 7px",
          )}
        >
          Verified
        </span>
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:12px;overflow:hidden",
        )}
      >
        {v.settingRows.map((r, i) => (
          <button
            key={i}
            type="button"
            onClick={r.tap}
            style={css(
              "width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:12px;border:none;border-bottom:1px dashed #D6C69A;background:none;padding:14px 15px;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            <span>
              <span
                style={css(
                  "display:block;font-size:14px;font-weight:600;color:#202A33",
                )}
              >
                {r.title}
              </span>
              <span
                style={css(
                  "display:block;font-size:11.5px;color:#6b6455;margin-top:2px",
                )}
              >
                {r.sub}
              </span>
            </span>
            <span
              style={css(
                `font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:${r.valueColor};white-space:nowrap`,
              )}
            >
              {r.value}
            </span>
          </button>
        ))}
      </div>
      <div
        style={css(
          "display:flex;justify-content:space-between;align-items:center;background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;padding:14px 15px;margin-top:12px",
        )}
      >
        <div>
          <div style={css("font-size:14px;font-weight:600")}>
            Lock with a PIN
          </div>
          <div style={css("font-size:11.5px;color:#6b6455;margin-top:2px")}>
            For phones more than one person holds
          </div>
        </div>
        <button
          type="button"
          onClick={v.toggleLock}
          style={css(
            `flex:none;width:44px;height:26px;border-radius:14px;border:1px solid #D6C69A;background:${v.lockTrack};position:relative;cursor:pointer;padding:0`,
          )}
        >
          <span
            style={css(
              `position:absolute;top:2px;left:${v.lockKnob};width:20px;height:20px;border-radius:50%;background:#FBF7EC;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:left .16s`,
            )}
          />
        </button>
      </div>
      <button
        type="button"
        onClick={v.go.splash}
        style={css(
          "width:100%;margin-top:16px;border:1px solid #D6C69A;background:#fff;color:#8C4A3A;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
        )}
      >
        Sign out
      </button>
      <div
        style={css(
          "font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:#9c9484;text-align:center;margin-top:14px",
        )}
      >
        Sorthehelp v1.0 · offline ready
      </div>
    </div>
  );
}
