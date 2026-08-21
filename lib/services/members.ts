import { apiClient } from "./api-client";
import type { IEntry, IMember, MemberStatus, MemberType } from "./types";

export function listMembers(
  groupId: string,
  query: { type?: MemberType; status?: MemberStatus; planId?: string; q?: string } = {},
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return apiClient<{ members: IMember[] }>(
    `/groups/${groupId}/members${qs ? `?${qs}` : ""}`,
  );
}

export function createMember(
  groupId: string,
  input: {
    name: string;
    phone?: string;
    email?: string;
    planId?: string;
    amount?: number;
    type?: MemberType;
  },
) {
  return apiClient<{ member: IMember }>(`/groups/${groupId}/members`, {
    method: "POST",
    body: input,
  });
}

export function getMember(id: string) {
  return apiClient<{ member: IMember; entries: IEntry[] }>(`/members/${id}`);
}

export function updateMember(
  id: string,
  input: { email?: string; link?: string; earlyAccess?: boolean },
) {
  return apiClient<{ member: IMember }>(`/members/${id}`, { method: "PATCH", body: input });
}

export function assignMemberPlan(id: string, planId: string | null) {
  return apiClient<{ member: IMember }>(`/members/${id}/plan`, {
    method: "PATCH",
    body: { planId },
  });
}

export function deleteMember(id: string) {
  return apiClient<void>(`/members/${id}`, { method: "DELETE" });
}

export function logPayment(id: string, amount: number) {
  return apiClient<{ member: IMember }>(`/members/${id}/payments`, {
    method: "POST",
    body: { amount },
  });
}

export function markMemberPaid(id: string) {
  return apiClient<{ member: IMember }>(`/members/${id}/mark-paid`, { method: "POST" });
}

export function remindMember(id: string) {
  return apiClient<{ text: string; whatsappUrl: string }>(`/members/${id}/remind`, {
    method: "POST",
  });
}

export function listMemberEntries(id: string) {
  return apiClient<{ entries: IEntry[] }>(`/members/${id}/entries`);
}
