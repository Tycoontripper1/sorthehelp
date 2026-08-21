import { apiClient } from "./api-client";
import type { IGroup, IPlan } from "./types";

export function listGroups() {
  return apiClient<{ groups: IGroup[] }>("/groups");
}

export function getGroup(id: string) {
  return apiClient<{ group: IGroup & { plans: IPlan[] } }>(`/groups/${id}`);
}

export function createGroup(input: { name: string }) {
  return apiClient<{ group: IGroup }>("/groups", { method: "POST", body: input });
}

export function updateGroup(id: string, input: { name?: string; telegramChatId?: string | null }) {
  return apiClient<{ group: IGroup }>(`/groups/${id}`, { method: "PATCH", body: input });
}

export function deleteGroup(id: string) {
  return apiClient<void>(`/groups/${id}`, { method: "DELETE" });
}
