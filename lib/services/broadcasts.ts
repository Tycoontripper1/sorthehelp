import { apiClient } from "./api-client";
import type { IBroadcast } from "./types";

export function listBroadcasts(groupId?: string) {
  const qs = groupId ? `?groupId=${encodeURIComponent(groupId)}` : "";
  return apiClient<{ broadcasts: IBroadcast[] }>(`/broadcasts${qs}`);
}

export function sendBroadcast(input: { groupId?: string; subject: string; body: string }) {
  return apiClient<{ broadcast: IBroadcast }>("/broadcasts", { method: "POST", body: input });
}

export function getAudienceCount(groupId?: string) {
  const qs = groupId ? `?groupId=${encodeURIComponent(groupId)}` : "";
  return apiClient<{ count: number }>(`/broadcasts/audience${qs}`);
}
