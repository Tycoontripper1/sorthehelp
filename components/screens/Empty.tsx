"use client";

import { css } from "@/lib/css";
import type { SorthehelpVals } from "@/lib/useSorthehelp";

export function Empty({ v }: { v: SorthehelpVals }) {
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
              help now
            </em>
          </div>
          <button
            type="button"
            onClick={v.go.groups}
            style={css(
              "display:flex;align-items:center;gap:6px;margin-top:7px;border:1px solid #D6C69A;background:#FBF7EC;border-radius:20px;padding:5px 11px;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6b6455;cursor:pointer",
            )}
          >
            {v.groupLabel} ▾
          </button>
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
          ₦0
        </span>
      </div>
      <div
        style={css(
          "background:#FBF7EC;border:1px solid #D6C69A;border-radius:4px;box-shadow:0 1px 0 rgba(32,42,51,.05),0 6px 16px -8px rgba(32,42,51,.18);margin-top:40px;padding:44px 24px;text-align:center",
        )}
      >
        <div
          style={css(
            "font-family:Fraunces,serif;font-style:italic;font-size:21px;color:#202A33",
          )}
        >
          Nothing written here yet
        </div>
        <div
          style={css(
            "font-size:13px;color:#6b6455;margin-top:8px;line-height:1.6",
          )}
        >
          Add the first person who paid you, or paste a list of names and
          numbers and sort them out after.
        </div>
        <div
          style={css(
            "display:flex;flex-direction:column;gap:9px;margin-top:22px",
          )}
        >
          <button
            type="button"
            onClick={() => {
              v.go.ledger();
              v.openAdd();
            }}
            style={css(
              "border:1px solid #202A33;background:#202A33;color:#EFE7D3;border-radius:5px;padding:13px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            Add a member
          </button>
          <button
            type="button"
            onClick={() => {
              v.go.ledger();
              v.openBulk();
            }}
            style={css(
              "border:1px solid #D6C69A;background:#fff;color:#202A33;border-radius:5px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif",
            )}
          >
            Paste a list
          </button>
        </div>
      </div>
      <div
        style={css(
          "font-family:'IBM Plex Mono',monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:#9c9484;text-align:center;margin-top:20px",
        )}
      >
        Nothing leaves this phone until you send it
      </div>
    </div>
  );
}
