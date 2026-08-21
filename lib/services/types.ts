export type MemberType = "ONE_TIME" | "RECURRING";
export type MemberStatus = "active" | "pending" | "part" | "due" | "lapsed";
export type EntryType = "ADDED" | "PAYMENT" | "MARK_PAID" | "REMINDER" | "NOTE";

export interface IGroup {
  id: string;
  ownerId: string;
  name: string;
  telegramChatId: string | null;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  planCount: number;
  collected: number;
  cycle?: "ONE_TIME" | "RECURRING";
  statusNote?: string;
  plans?: IPlan[];
}

export interface IPlan {
  id: string;
  groupId: string;
  name: string;
  price: number;
  type: MemberType;
  createdAt: string;
  updatedAt: string;
}

export interface IMember {
  id: string;
  groupId: string;
  planId: string | null;
  name: string;
  phone: string;
  email: string | null;
  type: MemberType;
  amount: number;
  paidAmount: number;
  link: string;
  dueDate: string | null;
  earlyAccess: boolean;
  createdAt: string;
  updatedAt: string;
  status: MemberStatus;
  planName?: string | null;
  groupName?: string | null;
}

export interface IEntry {
  id: string;
  memberId: string;
  type: EntryType;
  amount: number | null;
  method: string | null;
  note: string | null;
  createdAt: string;
}

export interface IBroadcast {
  id: string;
  ownerId: string;
  groupId: string | null;
  subject: string;
  body: string;
  recipientCount: number;
  sentAt: string;
}
