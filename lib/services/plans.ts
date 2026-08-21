import { apiClient } from "./api-client";
import type { IPlan, MemberType } from "./types";

export function listPlans(groupId: string) {
  return apiClient<{ plans: IPlan[] }>(`/groups/${groupId}/plans`);
}

export function createPlan(groupId: string, input: { name: string; price: number; type: MemberType }) {
  return apiClient<{ plan: IPlan }>(`/groups/${groupId}/plans`, { method: "POST", body: input });
}

export function updatePlan(
  id: string,
  input: { name?: string; price?: number; type?: MemberType },
) {
  return apiClient<{ plan: IPlan }>(`/plans/${id}`, { method: "PATCH", body: input });
}

export function deletePlan(id: string) {
  return apiClient<void>(`/plans/${id}`, { method: "DELETE" });
}
