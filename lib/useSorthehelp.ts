"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  loginAction,
  signupAction,
  forgotPasswordAction,
  logoutAction,
  getSessionAction,
  updateMeAction,
  googleSignInAction,
  type IOwner,
} from "@/actions/auth";
import type { ActionResult } from "@/actions/common";
import * as groupsApi from "@/lib/services/groups";
import * as membersApi from "@/lib/services/members";
import * as plansApi from "@/lib/services/plans";
import type { IGroup, IMember, IPlan } from "@/lib/services/types";

const DAY = 86400000;
export const INK = "#202A33";
export const SOFT = "#6b6455";
export const FAINT = "#9c9484";
export const RULE = "#D6C69A";
export const CARD = "#FBF7EC";

export type MemberType = "one_time" | "recurring";
export type MemberStatus = "active" | "pending" | "due" | "lapsed" | "part";

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: MemberType;
  amount: number;
  paidAmount: number;
  note: string;
  link: string;
  group: string;
  dueDate?: number;
  earlyAccess?: boolean;
  planId: string | null;
}

export interface Plan {
  id: string;
  group: string;
  name: string;
  price: number;
  type: MemberType;
}

export type Screen =
  | "splash"
  | "login"
  | "signup"
  | "recover"
  | "pin"
  | "onboard"
  | "ledger"
  | "empty"
  | "member"
  | "groups"
  | "settings"
  | "paywall";

export type OnboardingVariant = "steps" | "checklist";

interface State {
  screen: Screen;
  identifier: string;
  password: string;
  ownerName: string;
  terms: boolean;
  pin: string[];
  pin2: string[];
  obStep: number;
  type: MemberType;
  groupName: string;
  groupPrice: string;
  tg: boolean;
  wa: boolean;
  lock: boolean;
  group: string;
  filter: "all" | MemberType;
  statusFilter: "all" | MemberStatus;
  query: string;
  selId: string;
  stampId: string | null;
  pickerOpen: boolean;
  authPending: boolean;
  owner: IOwner | null;
  revenue: number;
  members: Member[];
  plans: Plan[];
  // Real groups fetched from the backend (see lib/services/groups.ts).
  // `members`/`plans` above are still local mock data — only the Groups
  // list and creating a group are wired to the API so far. The two are
  // linked loosely by name: picking a real group sets `group` (the name
  // string) below, which the mock ledger/members screens already filter
  // by.
  backendGroups: IGroup[];
  backendGroupsLoading: boolean;
  // The real group currently open in the Ledger (Members) screen, if the
  // owner navigated there from a real backendGroups entry rather than the
  // mock demo groups. Drives which members list gets fetched below.
  activeGroupId: string | null;
  membersLoadedForGroupId: string | null;
  plansLoadedForGroupId: string | null;
  addOpen: boolean;
  newName: string;
  newAmount: string;
  newPhone: string;
  newEmail: string;
  newType: MemberType;
  newPlanId: string | "custom" | null;
  bulkOpen: boolean;
  bulkText: string;
  broadcastOpen: boolean;
  broadcastAudience: "group" | "all";
  broadcastSubject: string;
  broadcastBody: string;
  newPlanFormOpen: boolean;
  newPlanName: string;
  newPlanPrice: string;
  newPlanType: MemberType;
  payFor: string | null;
  payAmount: string;
  reminderTemplate: string;
  reminderEditOpen: boolean;
  reminderDraft: string;
  planFilter: string | "all";
  planFilterOpen: boolean;
  plansOpen: boolean;
  editingPlanId: string | null;
  planFormName: string;
  planFormPrice: string;
  planFormType: MemberType;
  planPickerFor: string | null;
  telegramChatIds: Record<string, string>;
  telegramSheetOpen: boolean;
  telegramDraft: string;
}

const initialPlans: Plan[] = [
  {
    id: "1",
    group: "Advanced Crochet",
    name: "Standard",
    price: 5000,
    type: "one_time",
  },
  {
    id: "2",
    group: "Iron Yard",
    name: "Standard",
    price: 8000,
    type: "recurring",
  },
  {
    id: "3",
    group: "Iron Yard",
    name: "Premium",
    price: 10000,
    type: "recurring",
  },
];

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Ngozi Okafor",
    phone: "0803 411 2288",
    email: "ngozi.okafor@example.com",
    type: "one_time",
    amount: 5000,
    paidAmount: 5000,
    note: "Advanced Crochet",
    link: "https://t.me/+abc123uniq",
    group: "Advanced Crochet",
    earlyAccess: false,
    planId: "1",
  },
  {
    id: "2",
    name: "Femi Adio",
    phone: "0701 992 4410",
    email: "femi.adio@example.com",
    type: "recurring",
    amount: 8000,
    paidAmount: 0,
    dueDate: Date.now() + 2 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
    planId: "2",
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    phone: "0812 555 0193",
    email: "",
    type: "recurring",
    amount: 8000,
    paidAmount: 3000,
    dueDate: Date.now() - 3 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
    planId: "2",
  },
  {
    id: "4",
    name: "Chiamaka Eze",
    phone: "0906 220 7734",
    email: "chiamaka.eze@example.com",
    type: "recurring",
    amount: 10000,
    paidAmount: 0,
    dueDate: Date.now() + 21 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
    planId: "3",
  },
  {
    id: "5",
    name: "Tolu Bankole",
    phone: "0705 118 6620",
    email: "tolu.bankole@example.com",
    type: "one_time",
    amount: 5000,
    paidAmount: 2000,
    note: "Advanced Crochet",
    link: "",
    group: "Advanced Crochet",
    earlyAccess: true,
    planId: "1",
  },
];

const DEFAULT_REMINDER_TEMPLATE =
  "Hi {name}, friendly reminder from {group} — {amount} is still outstanding. Kindly make payment to keep your access active. Thank you!";

function makeInitialState(startScreen: Screen): State {
  return {
    screen: startScreen,
    identifier: "",
    password: "",
    ownerName: "",
    terms: true,
    pin: ["", "", "", ""],
    pin2: ["", "", "", ""],
    obStep: 1,
    type: "one_time",
    groupName: "",
    groupPrice: "",
    tg: true,
    wa: true,
    lock: false,
    group: "Advanced Crochet",
    filter: "all",
    statusFilter: "all",
    query: "",
    selId: "2",
    stampId: null,
    pickerOpen: false,
    authPending: false,
    owner: null,
    revenue: 26000,
    members: initialMembers,
    plans: initialPlans,
    backendGroups: [],
    backendGroupsLoading: false,
    activeGroupId: null,
    membersLoadedForGroupId: null,
    plansLoadedForGroupId: null,
    addOpen: false,
    newName: "",
    newAmount: "",
    newPhone: "",
    newEmail: "",
    newType: "one_time",
    newPlanId: null,
    bulkOpen: false,
    bulkText: "",
    broadcastOpen: false,
    broadcastAudience: "group",
    broadcastSubject: "",
    broadcastBody: "",
    newPlanFormOpen: false,
    newPlanName: "",
    newPlanPrice: "",
    newPlanType: "one_time",
    payFor: null,
    payAmount: "",
    reminderTemplate: DEFAULT_REMINDER_TEMPLATE,
    reminderEditOpen: false,
    reminderDraft: "",
    planFilter: "all",
    planFilterOpen: false,
    plansOpen: false,
    editingPlanId: null,
    planFormName: "",
    planFormPrice: "",
    planFormType: "one_time",
    planPickerFor: null,
    telegramChatIds: {},
    telegramSheetOpen: false,
    telegramDraft: "",
  };
}

export function useSorthehelp(
  startScreen: Screen = "splash",
  onboardingVariant: OnboardingVariant = "steps",
) {
  const [s, setS] = useState<State>(() => makeInitialState(startScreen));

  const say = (msg: string) => toast(msg);
  const sayOk = (msg: string) => toast.success(msg);

  /**
   * Shows a loading toast for the duration of an action, then swaps it in
   * place for a success or error toast — so the user always sees that
   * something is happening, not just a result that appears out of nowhere.
   */
  async function withToast<T>(
    promise: Promise<ActionResult<T>>,
    messages: { loading: string; success: string | ((data: T) => string) },
  ): Promise<ActionResult<T>> {
    const id = toast.loading(messages.loading);
    const result = await promise;
    if (result.ok) {
      const msg =
        typeof messages.success === "function"
          ? messages.success(result.data)
          : messages.success;
      toast.success(msg, { id });
    } else {
      toast.error(result.message, { id });
    }
    return result;
  }

  // Lazily confirm the session against GET /auth/me the first time the
  // profile screen is opened, rather than trusting the owner snapshot
  // returned at login forever.
  const fetchedProfile = useRef(false);
  useEffect(() => {
    if (s.screen !== "settings" || fetchedProfile.current) return;
    fetchedProfile.current = true;
    getSessionAction().then((result) => {
      if (result.ok) setS((prev) => ({ ...prev, owner: result.data.owner }));
    });
  }, [s.screen]);

  /** Re-fetches the owner's real groups from the backend and stores them in state. */
  const refreshGroups = async () => {
    setS((prev) => ({ ...prev, backendGroupsLoading: true }));
    try {
      const { groups } = await groupsApi.listGroups();
      setS((prev) => ({ ...prev, backendGroups: groups, backendGroupsLoading: false }));
    } catch {
      setS((prev) => ({ ...prev, backendGroupsLoading: false }));
    }
  };

  /**
   * Creates the real group behind step 2 of onboarding ("Create your first
   * group" — also reused by the Groups screen's "+ New group" button). Falls
   * back to the same placeholder name/price shown in the step's preview if
   * the owner left the fields blank.
   */
  const createGroupFromOnboarding = async () => {
    const name = s.groupName.trim() || "Advanced Crochet";
    const result = await withToast(
      groupsApi.createGroup({ name }).then(
        (data) => ({ ok: true as const, data }),
        (error: unknown) => ({
          ok: false as const,
          message: error instanceof Error ? error.message : "Could not create the group",
        }),
      ),
      { loading: "Creating group…", success: `"${name}" created` },
    );
    if (!result.ok) return;
    setS((prev) => ({
      ...prev,
      group: result.data.group.name,
      activeGroupId: result.data.group.id,
      backendGroups: [...prev.backendGroups, result.data.group],
    }));
  };

  // Same lazy pattern as the profile fetch above: load groups the first
  // time the Groups tab is opened, not on every render.
  const fetchedGroups = useRef(false);
  useEffect(() => {
    if (s.screen !== "groups" || fetchedGroups.current) return;
    fetchedGroups.current = true;
    refreshGroups();
  }, [s.screen]);

  /** Converts a real backend member into the shape the (still-mock) ledger UI expects. */
  const fromApiMember = (m: IMember, groupName: string): Member => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    email: m.email ?? "",
    type: m.type === "ONE_TIME" ? "one_time" : "recurring",
    amount: m.amount,
    paidAmount: m.paidAmount,
    note: groupName,
    link: m.link,
    group: groupName,
    dueDate: m.dueDate ? new Date(m.dueDate).getTime() : undefined,
    earlyAccess: m.earlyAccess,
    planId: m.planId,
  });

  // When the owner opens a real group's ledger, replace that group's
  // (mock) members with the real list from the backend. Runs once per
  // group — re-tap the same group and it won't re-fetch.
  useEffect(() => {
    if (s.screen !== "ledger" || !s.activeGroupId) return;
    if (s.membersLoadedForGroupId === s.activeGroupId) return;
    const groupId = s.activeGroupId;
    const groupName = s.group;
    membersApi.listMembers(groupId).then(
      ({ members }) => {
        setS((prev) => ({
          ...prev,
          members: [
            ...prev.members.filter((m) => m.group !== groupName),
            ...members.map((m) => fromApiMember(m, groupName)),
          ],
          membersLoadedForGroupId: groupId,
        }));
      },
      () => setS((prev) => ({ ...prev, membersLoadedForGroupId: groupId })),
    );
  }, [s.screen, s.activeGroupId, s.membersLoadedForGroupId, s.group]);

  /** Converts a real backend plan into the shape the (still-mock) Plans UI expects. */
  const fromApiPlan = (p: IPlan, groupName: string): Plan => ({
    id: p.id,
    group: groupName,
    name: p.name,
    price: p.price,
    type: p.type === "ONE_TIME" ? "one_time" : "recurring",
  });

  /** Fetches the active real group's plans and swaps them in for its mock ones, same pattern as the members effect above. Called when the Plans sheet opens rather than on a screen change, since plans live in a modal rather than their own screen. */
  const refreshPlansIfNeeded = () => {
    if (!s.activeGroupId || s.plansLoadedForGroupId === s.activeGroupId) return;
    const groupId = s.activeGroupId;
    const groupName = s.group;
    plansApi.listPlans(groupId).then(
      ({ plans }) => {
        setS((prev) => ({
          ...prev,
          plans: [
            ...prev.plans.filter((p) => p.group !== groupName),
            ...plans.map((p) => fromApiPlan(p, groupName)),
          ],
          plansLoadedForGroupId: groupId,
        }));
      },
      () => setS((prev) => ({ ...prev, plansLoadedForGroupId: groupId })),
    );
  };

  const signOut = async () => {
    await logoutAction();
    setS((prev) => ({ ...prev, owner: null, screen: "splash" }));
  };

  const saveProfile = async (input: { name?: string; payoutAccount?: string }) => {
    const result = await withToast(updateMeAction(input), {
      loading: "Saving…",
      success: "Profile updated",
    });
    if (result.ok) setS((prev) => ({ ...prev, owner: result.data.owner }));
  };

  const nav = (screen: Screen) => () =>
    setS((prev) => ({ ...prev, screen, stampId: null }));

  const naira = (n: number) => "₦" + Number(n).toLocaleString("en-NG");
  const shortDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  const daysUntil = (ts: number) => Math.round((ts - Date.now()) / DAY);

  const waLink = (phone: string, message: string) => {
    const digits = phone.replace(/\D/g, "");
    const intl = digits.startsWith("234")
      ? digits
      : "234" + digits.replace(/^0/, "");
    return "https://wa.me/" + intl + "?text=" + encodeURIComponent(message);
  };

  const openWhatsApp = (m: Member, message: string) => {
    if (!m.phone.trim()) {
      say("No WhatsApp number saved for " + m.name);
      return;
    }
    if (typeof window !== "undefined") {
      window.open(waLink(m.phone, message), "_blank", "noopener,noreferrer");
    }
    say("Opening WhatsApp for " + m.name);
  };

  /** Real members: ask the backend to render + log the reminder, then open its WhatsApp link. Mock members: build it locally, as before. */
  const remindMemberAction = async (m: Member) => {
    if (isRealId(m.id)) {
      const result = await withToast(
        membersApi.remindMember(m.id).then(
          (data) => ({ ok: true as const, data }),
          (error: unknown) => ({
            ok: false as const,
            message: error instanceof Error ? error.message : "Could not prepare reminder",
          }),
        ),
        { loading: "Preparing reminder…", success: "Opening WhatsApp for " + m.name },
      );
      if (!result.ok) return;
      if (typeof window !== "undefined") {
        window.open(result.data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }
    openWhatsApp(m, reminderMessage(m));
  };

  const reminderMessage = (m: Member) => {
    const balance = m.amount - m.paidAmount;
    const template = s.reminderTemplate.trim() || DEFAULT_REMINDER_TEMPLATE;
    return template
      .replace(/\{name\}/g, m.name)
      .replace(/\{group\}/g, m.note)
      .replace(/\{amount\}/g, naira(balance));
  };

  const statusOf = (m: Member): MemberStatus => {
    if (m.type === "one_time") {
      if (m.paidAmount >= m.amount) return "active";
      if (m.paidAmount > 0) return "part";
      return "pending";
    }
    const d = daysUntil(m.dueDate!);
    return d < 0 ? "lapsed" : d <= 3 ? "due" : "active";
  };

  const badgeOf = (st: MemberStatus, m: Member): [string, string, string] => {
    if (m.type === "one_time") {
      if (st === "active") return ["Paid", "#E3ECE3", "#3F6B4F"];
      if (st === "part") return ["Part paid", "#E9F0FA", "#2E5C8A"];
      return ["Pending", "#ECE7DA", FAINT];
    }
    if (st === "lapsed") return ["Lapsed", "#F0DCD3", "#8C4A3A"];
    if (st === "due") return ["Due soon", "#F9E3CC", "#BC6C25"];
    return ["Active", "#E3ECE3", "#3F6B4F"];
  };

  const dueText = (m: Member, st: MemberStatus) => {
    if (m.type === "one_time") {
      if (st === "active") return "Paid · one-time";
      if (st === "part") return naira(m.paidAmount) + " of " + naira(m.amount);
      return "Awaiting payment";
    }
    const d = daysUntil(m.dueDate!);
    if (st === "lapsed")
      return (
        "Overdue by " +
        Math.abs(d) +
        " day" +
        (Math.abs(d) === 1 ? "" : "s") +
        " · due " +
        shortDate(m.dueDate!)
      );
    if (d === 0) return "Due today";
    return (
      "Due in " +
      d +
      " day" +
      (d === 1 ? "" : "s") +
      " · " +
      shortDate(m.dueDate!)
    );
  };

  const openAdd = () => {
    setS((prev) => {
      const firstPlan = prev.plans.find((p) => p.group === prev.group);
      return {
        ...prev,
        addOpen: true,
        newPlanId: firstPlan ? firstPlan.id : "custom",
        newPlanFormOpen: false,
        newPlanName: "",
        newPlanPrice: "",
        newPlanType: "one_time",
      };
    });
    refreshPlansIfNeeded();
  };
  const closeAdd = () =>
    setS((prev) => ({
      ...prev,
      addOpen: false,
      newName: "",
      newPhone: "",
      newEmail: "",
      newAmount: "",
      newType: "one_time",
      newPlanId: null,
      newPlanFormOpen: false,
      newPlanName: "",
      newPlanPrice: "",
    }));
  const pickNewMemberPlan = (id: string | "custom") =>
    setS((prev) => ({ ...prev, newPlanId: id, newPlanFormOpen: false }));
  const toggleNewPlanForm = () =>
    setS((prev) => ({
      ...prev,
      newPlanFormOpen: !prev.newPlanFormOpen,
      newPlanName: "",
      newPlanPrice: "",
    }));
  const createInlinePlan = async () => {
    if (!s.newPlanName.trim()) {
      say("Name the plan first");
      return;
    }
    const price = Number(s.newPlanPrice) || 0;
    if (price <= 0) {
      say("Set a price for the plan");
      return;
    }
    const name = s.newPlanName.trim();
    const type = s.newPlanType;
    const groupName = s.group;

    if (s.activeGroupId) {
      const result = await withToast(
        plansApi
          .createPlan(s.activeGroupId, {
            name,
            price,
            type: type === "one_time" ? "ONE_TIME" : "RECURRING",
          })
          .then(
            (data) => ({ ok: true as const, data }),
            (error: unknown) => ({
              ok: false as const,
              message: error instanceof Error ? error.message : "Could not create plan",
            }),
          ),
        { loading: "Creating plan…", success: "Plan created" },
      );
      if (!result.ok) return;
      const plan = fromApiPlan(result.data.plan, groupName);
      setS((prev) => ({
        ...prev,
        plans: [...prev.plans, plan],
        newPlanId: plan.id,
        newPlanFormOpen: false,
        newPlanName: "",
        newPlanPrice: "",
      }));
      return;
    }

    setS((prev) => {
      const plan: Plan = { id: tempId(), group: groupName, name, price, type };
      return {
        ...prev,
        plans: [...prev.plans, plan],
        newPlanId: plan.id,
        newPlanFormOpen: false,
        newPlanName: "",
        newPlanPrice: "",
      };
    });
    sayOk("Plan created");
  };
  /** Local-only id for mock (non-backend) members/plans — never sent anywhere. */
  const tempId = () => `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  /** Real backend records have a cuid id; mock/demo ones use the "local-" prefix from tempId() above. That's the only signal we need to route an action to the API instead of local state. */
  const isRealId = (id: string) => !id.startsWith("local-");

  const confirmAdd = async () => {
    if (!s.newName.trim()) {
      say("Add a name first");
      return;
    }
    const usingPlan =
      s.newPlanId !== null && s.newPlanId !== "custom"
        ? s.plans.find((p) => p.id === s.newPlanId)
        : null;
    const amount = usingPlan ? usingPlan.price : Number(s.newAmount) || 0;
    const type = usingPlan ? usingPlan.type : s.newType;
    if (!usingPlan && amount <= 0) {
      say("Set an amount first");
      return;
    }
    const name = s.newName.trim();
    const phone = s.newPhone.trim();
    const email = s.newEmail.trim();
    const groupName = s.group;
    const closeModal = () =>
      setS((prev) => ({
        ...prev,
        addOpen: false,
        newName: "",
        newPhone: "",
        newEmail: "",
        newAmount: "",
        newType: "one_time",
        newPlanId: null,
      }));

    if (s.activeGroupId) {
      // Real group — create the member on the backend.
      const result = await withToast(
        membersApi
          .createMember(s.activeGroupId, {
            name,
            phone: phone || undefined,
            email: email || undefined,
            amount,
            type: type === "one_time" ? "ONE_TIME" : "RECURRING",
          })
          .then(
            (data) => ({ ok: true as const, data }),
            (error: unknown) => ({
              ok: false as const,
              message: error instanceof Error ? error.message : "Could not add member",
            }),
          ),
        { loading: "Adding member…", success: `${name} added to ${groupName}` },
      );
      if (!result.ok) return;
      const member = fromApiMember(result.data.member, groupName);
      setS((prev) => ({ ...prev, members: [...prev.members, member] }));
      closeModal();
      return;
    }

    // Demo group — keep the local-only mock behaviour.
    const member: Member = {
      id: tempId(),
      name,
      phone,
      email,
      type,
      amount,
      paidAmount: 0,
      note: groupName,
      link: "",
      group: groupName,
      dueDate: type === "recurring" ? Date.now() + 30 * DAY : undefined,
      planId: usingPlan ? usingPlan.id : null,
    };
    setS((prev) => ({ ...prev, members: [...prev.members, member] }));
    closeModal();
    sayOk(name + " added to " + groupName);
  };

  const openBulk = () =>
    setS((prev) => {
      const firstPlan = prev.plans.find((p) => p.group === prev.group);
      return {
        ...prev,
        addOpen: false,
        bulkOpen: true,
        bulkText: "",
        newPlanId: firstPlan ? firstPlan.id : "custom",
        newPlanFormOpen: false,
      };
    });
  const closeBulk = () =>
    setS((prev) => ({ ...prev, bulkOpen: false, bulkText: "" }));
  const confirmBulk = () => {
    const lines = s.bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      say("Paste at least one member first");
      return;
    }

    const usingPlan =
      s.newPlanId !== null && s.newPlanId !== "custom"
        ? s.plans.find((p) => p.id === s.newPlanId)
        : null;
    const amount = usingPlan ? usingPlan.price : Number(s.newAmount) || 0;
    const type = usingPlan ? usingPlan.type : s.newType;
    if (!usingPlan && amount <= 0) {
      say("Set an amount, or pick a plan, first");
      return;
    }

    let added = 0;
    setS((prev) => {
      const created: Member[] = [];
      for (const line of lines) {
        const [rawName, rawPhone = "", rawEmail = ""] = line.split(",");
        const name = (rawName ?? "").trim();
        if (!name) continue;
        created.push({
          id: tempId(),
          name,
          phone: rawPhone.trim(),
          email: rawEmail.trim(),
          type,
          amount,
          paidAmount: 0,
          note: prev.group,
          link: "",
          group: prev.group,
          dueDate: type === "recurring" ? Date.now() + 30 * DAY : undefined,
          planId: usingPlan ? usingPlan.id : null,
        });
      }
      added = created.length;
      return {
        ...prev,
        members: [...prev.members, ...created],
        bulkOpen: false,
        bulkText: "",
        newAmount: "",
        newType: "one_time",
        newPlanId: null,
      };
    });
    if (added > 0) {
      say(added + (added === 1 ? " member" : " members") + " added to " + s.group);
    } else {
      say("No valid names found — one member per line");
    }
  };

  const openBroadcast = () =>
    setS((prev) => ({
      ...prev,
      broadcastOpen: true,
      broadcastAudience: "group",
      broadcastSubject: "",
      broadcastBody: "",
    }));
  const closeBroadcast = () =>
    setS((prev) => ({ ...prev, broadcastOpen: false }));
  const setBroadcastAudience = (audience: "group" | "all") =>
    setS((prev) => ({ ...prev, broadcastAudience: audience }));
  const sendBroadcastMock = () => {
    if (!s.broadcastSubject.trim()) {
      say("Add a subject first");
      return;
    }
    if (!s.broadcastBody.trim()) {
      say("Write a message first");
      return;
    }
    const audienceMembers =
      s.broadcastAudience === "group"
        ? s.members.filter((m) => m.group === s.group)
        : s.members;
    const recipientCount = audienceMembers.filter((m) => m.email.trim()).length;
    setS((prev) => ({
      ...prev,
      broadcastOpen: false,
      broadcastSubject: "",
      broadcastBody: "",
    }));
    if (recipientCount === 0) {
      say("No one in that audience has an email on file yet");
      return;
    }
    say(
      "Sent to " +
        recipientCount +
        (recipientCount === 1 ? " member" : " members"),
    );
  };

  const openTelegramSettings = () =>
    setS((prev) => ({
      ...prev,
      telegramSheetOpen: true,
      telegramDraft: prev.telegramChatIds[prev.group] ?? "",
    }));
  const closeTelegramSettings = () =>
    setS((prev) => ({ ...prev, telegramSheetOpen: false, telegramDraft: "" }));
  const saveTelegramSettings = () => {
    if (!s.telegramDraft.trim()) {
      say("Paste a chat ID first");
      return;
    }
    setS((prev) => ({
      ...prev,
      telegramChatIds: { ...prev.telegramChatIds, [prev.group]: prev.telegramDraft.trim() },
      telegramSheetOpen: false,
      telegramDraft: "",
    }));
    sayOk("Telegram connected for " + s.group);
  };
  const disconnectTelegram = () => {
    setS((prev) => {
      const next = { ...prev.telegramChatIds };
      delete next[prev.group];
      return { ...prev, telegramChatIds: next, telegramSheetOpen: false, telegramDraft: "" };
    });
    sayOk("Telegram disconnected for " + s.group);
  };

  const openPlans = () => {
    setS((prev) => ({
      ...prev,
      plansOpen: true,
      editingPlanId: null,
      planFormName: "",
      planFormPrice: "",
      planFormType: "one_time",
    }));
    refreshPlansIfNeeded();
  };
  const closePlans = () =>
    setS((prev) => ({
      ...prev,
      plansOpen: false,
      editingPlanId: null,
      planFormName: "",
      planFormPrice: "",
    }));
  const startEditPlan = (id: string) => {
    const plan = s.plans.find((p) => p.id === id);
    if (!plan) return;
    setS((prev) => ({
      ...prev,
      editingPlanId: id,
      planFormName: plan.name,
      planFormPrice: String(plan.price),
      planFormType: plan.type,
    }));
  };
  const cancelPlanEdit = () =>
    setS((prev) => ({
      ...prev,
      editingPlanId: null,
      planFormName: "",
      planFormPrice: "",
      planFormType: "one_time",
    }));
  const savePlan = async () => {
    if (!s.planFormName.trim()) {
      say("Name the plan first");
      return;
    }
    const price = Number(s.planFormPrice) || 0;
    if (price <= 0) {
      say("Set a price for the plan");
      return;
    }
    const editingId = s.editingPlanId;
    const name = s.planFormName.trim();
    const type = s.planFormType;
    const groupName = s.group;
    const resetForm = () =>
      setS((prev) => ({
        ...prev,
        editingPlanId: null,
        planFormName: "",
        planFormPrice: "",
        planFormType: "one_time",
      }));

    if (s.activeGroupId) {
      const apiType = type === "one_time" ? "ONE_TIME" : "RECURRING";
      const result =
        editingId && isRealId(editingId)
          ? await withToast(
              plansApi.updatePlan(editingId, { name, price, type: apiType }).then(
                (data) => ({ ok: true as const, data }),
                (error: unknown) => ({
                  ok: false as const,
                  message: error instanceof Error ? error.message : "Could not update plan",
                }),
              ),
              { loading: "Saving plan…", success: "Plan updated" },
            )
          : await withToast(
              plansApi.createPlan(s.activeGroupId, { name, price, type: apiType }).then(
                (data) => ({ ok: true as const, data }),
                (error: unknown) => ({
                  ok: false as const,
                  message: error instanceof Error ? error.message : "Could not create plan",
                }),
              ),
              { loading: "Creating plan…", success: "Plan created" },
            );
      if (!result.ok) return;
      const plan = fromApiPlan(result.data.plan, groupName);
      setS((prev) => ({
        ...prev,
        plans: editingId
          ? prev.plans.map((p) => (p.id === plan.id ? plan : p))
          : [...prev.plans, plan],
      }));
      resetForm();
      // Assigned members' amount/type may have changed server-side (see
      // server/prisma/schema.prisma: editing a plan cascades to its
      // members) — refetch so the ledger reflects it.
      if (editingId) {
        setS((prev) => ({ ...prev, membersLoadedForGroupId: null }));
      }
      return;
    }

    // Demo group — local-only plan, same as before.
    setS((prev) => {
      if (editingId === null) {
        const plan: Plan = { id: tempId(), group: groupName, name, price, type };
        return { ...prev, plans: [...prev.plans, plan] };
      }
      return {
        ...prev,
        plans: prev.plans.map((p) =>
          p.id === editingId ? { ...p, name, price, type } : p,
        ),
        members: prev.members.map((m) =>
          m.planId === editingId
            ? {
                ...m,
                amount: price,
                type,
                dueDate: type === "recurring" && !m.dueDate ? Date.now() + 30 * DAY : m.dueDate,
              }
            : m,
        ),
      };
    });
    resetForm();
    sayOk(editingId === null ? "Plan created" : "Plan updated");
  };

  const deletePlan = async (id: string) => {
    if (isRealId(id)) {
      const result = await withToast(
        plansApi.deletePlan(id).then(
          () => ({ ok: true as const, data: null }),
          (error: unknown) => ({
            ok: false as const,
            message: error instanceof Error ? error.message : "Could not remove plan",
          }),
        ),
        { loading: "Removing plan…", success: "Plan removed" },
      );
      if (!result.ok) return;
    }
    setS((prev) => ({
      ...prev,
      plans: prev.plans.filter((p) => p.id !== id),
      // The backend unlinks members from a deleted plan (custom pricing)
      // rather than deleting them — mirror that locally too.
      members: prev.members.map((m) =>
        m.planId === id ? { ...m, planId: null } : m,
      ),
      planFilter: prev.planFilter === id ? "all" : prev.planFilter,
      editingPlanId: prev.editingPlanId === id ? null : prev.editingPlanId,
    }));
    if (!isRealId(id)) sayOk("Plan removed");
  };

  const openPlanFilter = () => setS((prev) => ({ ...prev, planFilterOpen: true }));
  const closePlanFilter = () =>
    setS((prev) => ({ ...prev, planFilterOpen: false }));

  const openPlanPicker = (id: string) =>
    setS((prev) => ({ ...prev, planPickerFor: id }));
  const closePlanPicker = () =>
    setS((prev) => ({ ...prev, planPickerFor: null }));
  const assignMemberPlan = async (planId: string | "custom") => {
    const id = s.planPickerFor;
    if (id === null) return;
    const plan = planId === "custom" ? null : s.plans.find((p) => p.id === planId);
    if (planId !== "custom" && !plan) return;

    if (isRealId(id)) {
      const result = await withToast(
        membersApi.assignMemberPlan(id, plan ? plan.id : null).then(
          (data) => ({ ok: true as const, data }),
          (error: unknown) => ({
            ok: false as const,
            message: error instanceof Error ? error.message : "Could not update the plan",
          }),
        ),
        {
          loading: "Updating plan…",
          success: plan ? "Plan assigned" : "Switched to custom pricing",
        },
      );
      if (!result.ok) return;
      const groupName = s.members.find((m) => m.id === id)?.group ?? s.group;
      const updated = fromApiMember(result.data.member, groupName);
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) => (m.id === id ? updated : m)),
        planPickerFor: null,
      }));
      return;
    }

    if (!plan) {
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === id ? { ...m, planId: null } : m,
        ),
        planPickerFor: null,
      }));
      sayOk("Switched to custom pricing");
      return;
    }
    setS((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === id
          ? {
              ...m,
              planId: plan.id,
              amount: plan.price,
              type: plan.type,
              dueDate:
                plan.type === "recurring"
                  ? m.dueDate ?? Date.now() + 30 * DAY
                  : undefined,
            }
          : m,
      ),
      planPickerFor: null,
    }));
    sayOk("Moved to " + plan.name);
  };

  const openReminderEdit = () =>
    setS((prev) => ({
      ...prev,
      reminderEditOpen: true,
      reminderDraft: prev.reminderTemplate.trim() || DEFAULT_REMINDER_TEMPLATE,
    }));
  const closeReminderEdit = () =>
    setS((prev) => ({ ...prev, reminderEditOpen: false, reminderDraft: "" }));
  const saveReminderEdit = () => {
    setS((prev) => ({
      ...prev,
      reminderTemplate: prev.reminderDraft.trim() || DEFAULT_REMINDER_TEMPLATE,
      reminderEditOpen: false,
      reminderDraft: "",
    }));
    sayOk("Reminder message updated");
  };

  const closePay = () =>
    setS((prev) => ({ ...prev, payFor: null, payAmount: "" }));
  const confirmPay = async () => {
    const id = s.payFor;
    if (id === null) return;
    const amount = Number(s.payAmount) || 0;
    if (amount <= 0) {
      say("Enter an amount first");
      return;
    }
    const target = s.members.find((m) => m.id === id);
    if (!target) return;

    if (isRealId(id)) {
      const result = await withToast(
        membersApi.logPayment(id, amount).then(
          (data) => ({ ok: true as const, data }),
          (error: unknown) => ({
            ok: false as const,
            message: error instanceof Error ? error.message : "Could not log payment",
          }),
        ),
        { loading: "Logging payment…", success: `${target.name} · ${naira(amount)} logged` },
      );
      if (!result.ok) return;
      const cycleDone = target.paidAmount + amount >= target.amount;
      const updated = fromApiMember(result.data.member, target.group);
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) => (m.id === id ? updated : m)),
        payFor: null,
        payAmount: "",
        stampId: cycleDone ? id : prev.stampId,
      }));
      return;
    }

    setS((prev) => ({
      ...prev,
      members: prev.members.map((m) => {
        if (m.id !== id) return m;
        const cycleDone =
          m.type === "recurring" && m.paidAmount + amount >= m.amount;
        return {
          ...m,
          paidAmount: cycleDone
            ? 0
            : Math.min(m.paidAmount + amount, m.amount),
          dueDate: cycleDone ? Date.now() + 30 * DAY : m.dueDate,
        };
      }),
      revenue: prev.revenue + amount,
      payFor: null,
      payAmount: "",
      stampId:
        target.paidAmount + amount >= target.amount ? id : prev.stampId,
    }));
    sayOk(target.name + " · " + naira(amount) + " logged");
  };

  const markPaid = async (id: string) => {
    const target = s.members.find((m) => m.id === id);
    if (!target) return;

    if (isRealId(id)) {
      const result = await withToast(
        membersApi.markMemberPaid(id).then(
          (data) => ({ ok: true as const, data }),
          (error: unknown) => ({
            ok: false as const,
            message: error instanceof Error ? error.message : "Could not mark as paid",
          }),
        ),
        { loading: "Marking as paid…", success: `${target.name} marked as paid` },
      );
      if (!result.ok) return;
      const updated = fromApiMember(result.data.member, target.group);
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) => (m.id === id ? updated : m)),
        stampId: id,
      }));
      return;
    }

    setS((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id !== id
          ? m
          : m.type === "one_time"
            ? { ...m, paidAmount: m.amount }
            : { ...m, paidAmount: 0, dueDate: Date.now() + 30 * DAY },
      ),
      revenue: prev.revenue + target.amount,
      stampId: id,
    }));
    sayOk(target.name + " marked as paid");
  };

  const scr = s.screen;
  const variant = onboardingVariant;

  const screens: Screen[] = [
    "splash",
    "login",
    "signup",
    "recover",
    "pin",
    "onboard",
    "ledger",
    "empty",
    "member",
    "groups",
    "settings",
    "paywall",
  ];
  const go = {} as Record<Screen, () => void>;
  screens.forEach((k) => {
    go[k] = nav(k);
  });

  const q = s.query.trim().toLowerCase();
  const planName = (planId: string | null) =>
    planId === null ? null : s.plans.find((p) => p.id === planId)?.name ?? null;

  const visible = s.members
    .filter((m) => m.group === s.group)
    .filter((m) => s.filter === "all" || m.type === s.filter)
    .filter((m) => s.statusFilter === "all" || statusOf(m) === s.statusFilter)
    .filter((m) => s.planFilter === "all" || m.planId === s.planFilter)
    .filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q),
    );

  const rows = visible.map((m) => {
    const st = statusOf(m);
    const [badge, badgeBg, badgeFg] = badgeOf(st, m);
    const paidOneTime = m.type === "one_time" && m.paidAmount >= m.amount;
    return {
      id: m.id,
      name: m.name,
      note: m.note,
      planLabel: planName(m.planId) ?? "Custom",
      typeLabel: m.type === "one_time" ? "one-time" : "recurring",
      badge,
      badgeBg,
      badgeFg,
      amount: naira(m.amount),
      dueText: dueText(m, st),
      showPay: !paidOneTime,
      showLog: !paidOneTime,
      showSend: paidOneTime,
      showRemind:
        (m.type === "one_time" && !(m.paidAmount >= m.amount)) ||
        st === "due" ||
        st === "lapsed",
      stamped: s.stampId === m.id,
      pay: () => markPaid(m.id),
      logPayment: () => {
        setS((prev) => ({ ...prev, payFor: m.id }));
        say("Logging payment for " + m.name);
      },
      remind: () => remindMemberAction(m),
      send: () => {
        if (!m.link.trim()) {
          setS((prev) => ({ ...prev, selId: m.id, screen: "member" }));
          say("Add an access link for " + m.name + " first");
          return;
        }
        openWhatsApp(
          m,
          "Hi " +
            m.name +
            ", here's your access link for " +
            m.note +
            ": " +
            m.link,
        );
      },
      open: () => setS((prev) => ({ ...prev, selId: m.id, screen: "member" })),
    };
  });

  const inGroup = s.members.filter((m) => m.group === s.group);
  const count = (st: MemberStatus) =>
    inGroup.filter((m) => statusOf(m) === st).length;
  const notificationCount = s.members.filter((m) => {
    const st = statusOf(m);
    return st === "due" || st === "lapsed";
  }).length;
  const openNotifications = () => {
    if (notificationCount === 0) {
      say("You're all caught up — nothing due or lapsed");
      return;
    }
    say(
      notificationCount +
        (notificationCount === 1 ? " member needs" : " members need") +
        " a reminder — due or lapsed",
    );
  };
  const groupCollected = inGroup.reduce((sum, m) => sum + m.paidAmount, 0);
  const groupTarget = inGroup.reduce((sum, m) => sum + m.amount, 0);
  const groupPercent =
    groupTarget > 0 ? Math.round((groupCollected / groupTarget) * 100) : 0;
  const broadcastPool =
    s.broadcastAudience === "group" ? inGroup : s.members;
  const broadcastRecipientCount = broadcastPool.filter((m) =>
    m.email.trim(),
  ).length;
  const statDef: [MemberStatus, string, string][] = [
    ["active", "Active", "#3F6B4F"],
    ["part", "Part", "#2E5C8A"],
    ["due", "Due", "#BC6C25"],
    ["lapsed", "Lapsed", "#8C4A3A"],
    ["pending", "Pending", FAINT],
  ];
  const stats = statDef.map(([k, label, color]) => ({
    n: count(k),
    label,
    color,
    shadow:
      s.statusFilter === k ? "0 0 0 2px " + INK : "0 1px 0 rgba(32,42,51,.05)",
    tap: () =>
      setS((prev) => ({
        ...prev,
        statusFilter: prev.statusFilter === k ? "all" : k,
      })),
  }));

  const filterDef: ["all" | MemberType, string][] = [
    ["all", "All"],
    ["one_time", "One-time"],
    ["recurring", "Recurring"],
  ];
  const filters = filterDef.map(([k, label]) => ({
    label,
    tap: () => setS((prev) => ({ ...prev, filter: k })),
    bg: s.filter === k ? INK : "transparent",
    fg: s.filter === k ? "#EFE7D3" : SOFT,
    border: s.filter === k ? INK : RULE,
  }));

  const plansForGroup = s.plans.filter((p) => p.group === s.group);

  const planFilterDefs = [
    { id: "all" as string | "all", label: "All plans" },
    ...plansForGroup.map((p) => ({ id: p.id as string | "all", label: p.name })),
  ];
  const planFilters = planFilterDefs.map((p) => ({
    label: p.label,
    tap: () =>
      setS((prev) => ({ ...prev, planFilter: p.id, planFilterOpen: false })),
    active: s.planFilter === p.id,
  }));
  const planFilterLabel =
    planFilterDefs.find((p) => p.id === s.planFilter)?.label ?? "All plans";

  const pickerMember = s.members.find((m) => m.id === s.planPickerFor) || null;
  const planPickerOptions = pickerMember
    ? [
        ...s.plans
          .filter((p) => p.group === pickerMember.group)
          .map((p) => ({
            id: p.id as string | "custom",
            label: p.name,
            sub:
              naira(p.price) + (p.type === "recurring" ? " · 30 days" : " · once"),
          })),
        {
          id: "custom" as string | "custom",
          label: "Custom",
          sub: naira(pickerMember.amount) + " · current amount",
        },
      ].map((p) => ({
        label: p.label,
        sub: p.sub,
        tap: () => assignMemberPlan(p.id),
        active: p.id === "custom" ? pickerMember.planId === null : pickerMember.planId === p.id,
        bg:
          (p.id === "custom" ? pickerMember.planId === null : pickerMember.planId === p.id)
            ? INK
            : "transparent",
        fg:
          (p.id === "custom" ? pickerMember.planId === null : pickerMember.planId === p.id)
            ? "#EFE7D3"
            : INK,
        subFg:
          (p.id === "custom" ? pickerMember.planId === null : pickerMember.planId === p.id)
            ? "#D6C69A"
            : SOFT,
        border:
          (p.id === "custom" ? pickerMember.planId === null : pickerMember.planId === p.id)
            ? INK
            : RULE,
      }))
    : [];

  const newMemberPlans = [
    ...plansForGroup.map((p) => ({
      id: p.id as string | "custom",
      label: p.name,
      sub: naira(p.price) + (p.type === "recurring" ? " · 30 days" : " · once"),
    })),
    { id: "custom" as string | "custom", label: "Custom", sub: "Set a one-off amount" },
  ].map((p) => ({
    label: p.label,
    sub: p.sub,
    tap: () => pickNewMemberPlan(p.id),
    active: s.newPlanId === p.id,
    bg: s.newPlanId === p.id ? INK : "transparent",
    fg: s.newPlanId === p.id ? "#EFE7D3" : INK,
    subFg: s.newPlanId === p.id ? "#D6C69A" : SOFT,
    border: s.newPlanId === p.id ? INK : RULE,
  }));

  const planManageRows = plansForGroup.map((p) => ({
    id: p.id,
    name: p.name,
    priceLabel: naira(p.price) + (p.type === "recurring" ? " · every 30 days" : " · one-time"),
    memberCount: s.members.filter((m) => m.planId === p.id).length,
    editing: s.editingPlanId === p.id,
    edit: () => startEditPlan(p.id),
    remove: () => deletePlan(p.id),
  }));

  const selMember = s.members.find((x) => x.id === s.selId) || s.members[0];
  const selStatus = statusOf(selMember);
  const [selBadge, selBadgeBg, selBadgeFg] = badgeOf(selStatus, selMember);
  const sel = {
    name: selMember.name,
    note: selMember.note,
    email: selMember.email,
    emailTag: selMember.email ? "on file" : "not collected",
    emailTagColor: selMember.email ? "#3F6B4F" : FAINT,
    planLabel: planName(selMember.planId) ?? "Custom",
    typeLabel: selMember.type === "one_time" ? "one-time" : "recurring",
    badge: selBadge,
    badgeBg: selBadgeBg,
    badgeFg: selBadgeFg,
    amount: naira(selMember.amount),
    dueShort:
      selMember.type === "one_time"
        ? selMember.paidAmount >= selMember.amount
          ? "Done"
          : "On payment"
        : shortDate(selMember.dueDate!),
    link: selMember.link,
    linkTag: selMember.link ? "invite set" : "no link yet",
    linkTagColor: selMember.link ? "#3F6B4F" : FAINT,
    collected: naira(
      selMember.type === "one_time"
        ? selMember.paidAmount >= selMember.amount
          ? selMember.amount
          : 0
        : selMember.amount * 3,
    ),
    showPart:
      selMember.paidAmount > 0 && selMember.paidAmount < selMember.amount,
    canLog: !(
      selMember.type === "one_time" &&
      selMember.paidAmount >= selMember.amount
    ),
    paidPercent: Math.round((selMember.paidAmount / selMember.amount) * 100),
    paidAmount: naira(selMember.paidAmount),
    balanceLeft: naira(selMember.amount - selMember.paidAmount),
    earlyTrack: selMember.earlyAccess ? "#3F6B4F" : "#D6C69A",
    earlyKnob: selMember.earlyAccess ? "22px" : "2px",
    history:
      selMember.type === "one_time"
        ? [
            {
              date: shortDate(Date.now() - 6 * DAY),
              what: "Added to " + selMember.note,
              amt: "—",
              color: FAINT,
            },
            {
              date: shortDate(Date.now() - 2 * DAY),
              what:
                selMember.paidAmount >= selMember.amount
                  ? "Marked as paid (transfer)"
                  : "Reminder sent on WhatsApp",
              amt:
                selMember.paidAmount >= selMember.amount
                  ? naira(selMember.amount)
                  : "—",
              color:
                selMember.paidAmount >= selMember.amount ? "#3F6B4F" : FAINT,
            },
          ]
        : [
            {
              date: shortDate(Date.now() - 62 * DAY),
              what: "Marked as paid (cash)",
              amt: naira(selMember.amount),
              color: "#3F6B4F",
            },
            {
              date: shortDate(Date.now() - 32 * DAY),
              what: "Marked as paid (transfer)",
              amt: naira(selMember.amount),
              color: "#3F6B4F",
            },
            {
              date: shortDate(Date.now() - 2 * DAY),
              what: "Marked as paid (cash)",
              amt: naira(selMember.amount),
              color: "#3F6B4F",
            },
          ],
  };

  const payMember = s.members.find((m) => m.id === s.payFor) || null;
  const payBalance = payMember
    ? Math.max(payMember.amount - payMember.paidAmount, 0)
    : 0;

  // Groups screen data — sourced from the real backend list (s.backendGroups),
  // not the mock members. Each backend group already comes with its own
  // memberCount/cycle/statusNote computed server-side (see
  // server/src/controllers/group.controller.ts:summarize).
  const dueNoteColor = (statusNote: string): string => {
    if (statusNote.endsWith("lapsed")) return "#8C4A3A";
    if (statusNote.endsWith("due")) return "#BC6C25";
    if (statusNote.endsWith("part")) return "#2E5C8A";
    if (statusNote.endsWith("pending")) return FAINT;
    return "#3F6B4F"; // "all settled"
  };
  const groups = s.backendGroups.map((g) => ({
    name: g.name,
    cycle: g.cycle === "ONE_TIME" ? "one-time" : "every 30 days",
    price: g.planCount + (g.planCount === 1 ? " plan" : " plans"),
    members: g.memberCount,
    dueNote: g.statusNote ?? "all settled",
    dueColor: dueNoteColor(g.statusNote ?? "all settled"),
    border: s.group === g.name ? INK : RULE,
    tap: () =>
      setS((prev) => ({
        ...prev,
        group: g.name,
        activeGroupId: g.id,
        screen: "ledger",
        statusFilter: "all",
      })),
  }));

  const tabDef: [Screen, string, string][] = [
    ["ledger", "▤", "Members"],
    ["groups", "◫", "Groups"],
    ["settings", "◍", "You"],
  ];
  const tabs = tabDef.map(([k, icon, label]) => ({
    icon,
    label,
    tap: nav(k),
    color:
      scr === k ||
      (k === "ledger" && (scr === "member" || scr === "empty")) ||
      (k === "groups" && scr === "paywall")
        ? INK
        : FAINT,
  }));

  const settingRows = [
    {
      title: "Email or phone",
      sub: "Used to sign in",
      value:
        s.owner?.email || s.owner?.phone || s.identifier || "amaka@example.com",
      valueColor: SOFT,
      tap: go.pin,
    },
    {
      title: "Payouts",
      sub: "Where collected money lands",
      value: s.owner?.payoutAccount || "Not set",
      valueColor: s.owner?.payoutAccount ? SOFT : "#A9781F",
      tap: go.paywall,
    },
    {
      title: "Telegram bot",
      sub: "Connected per group — open a group's Telegram setting",
      value: "Per group",
      valueColor: FAINT,
      tap: () => say("Open a group on the Members tab, then tap Telegram"),
    },
    {
      title: "Reminder message",
      sub: "The text sent on WhatsApp",
      value: "Edit",
      valueColor: SOFT,
      tap: openReminderEdit,
    },
    {
      title: "Plan",
      sub: (s.owner?.planTier ?? "FREE") === "FREE" ? "Free · 2 groups" : s.owner!.planTier,
      value: "Upgrade",
      valueColor: "#8C4A3A",
      tap: go.paywall,
    },
  ];

  const obBars = (
    [
      [1, "Kind"],
      [2, "Group"],
      [3, "Access"],
    ] as [number, string][]
  ).map(([i, label]) => ({
    n: "0" + i,
    label,
    bg: i <= s.obStep ? INK : RULE,
    fg: i <= s.obStep ? INK : FAINT,
  }));

  const isOne = s.type === "one_time";
  const checkDone = (s.type ? 1 : 0) + (s.groupName ? 1 : 0) + 1;
  const checkRows = [
    {
      title: "What are you tracking?",
      sub: "One-time access or recurring payments",
      value: isOne ? "One-time" : "Recurring",
      mark: "✓",
      dotBg: "#E3ECE3",
      dotFg: "#3F6B4F",
      tap: () =>
        setS((prev) => ({ ...prev, type: isOne ? "recurring" : "one_time" })),
    },
    {
      title: "Your first group",
      sub: "Name it and set the price",
      value: s.groupName || "Set",
      mark: s.groupName ? "✓" : "2",
      dotBg: s.groupName ? "#E3ECE3" : "#EFE7D3",
      dotFg: s.groupName ? "#3F6B4F" : FAINT,
      tap: () =>
        setS((prev) => ({
          ...prev,
          groupName: "Advanced Crochet",
          groupPrice: "5000",
        })),
    },
    {
      title: "How access is delivered",
      sub: "Telegram links and reminders",
      value: s.tg ? "Telegram" : "Off",
      mark: "✓",
      dotBg: "#E3ECE3",
      dotFg: "#3F6B4F",
      tap: () => setS((prev) => ({ ...prev, tg: !prev.tg })),
    },
  ];

  const pinCells = s.pin.map((ch, i) => ({
    ch: ch ? "•" : "·",
    tap: () =>
      setS((prev) => {
        const p = prev.pin.slice();
        p[i] = "4";
        return { ...prev, pin: p };
      }),
  }));
  const pinCells2 = s.pin2.map((ch) => ({ ch: ch ? "•" : "·" }));

  const identifierDisplay =
    s.owner?.email || s.owner?.phone || s.identifier || "amaka@example.com";

  return {
    go,
    today: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    isSplash: scr === "splash",
    isLogin: scr === "login",
    isSignup: scr === "signup",
    isRecover: scr === "recover",
    isPin: scr === "pin",
    isObSteps: scr === "onboard" && variant === "steps",
    isObCheck: scr === "onboard" && variant === "checklist",
    isApp: [
      "ledger",
      "empty",
      "member",
      "groups",
      "settings",
      "paywall",
    ].includes(scr),
    isLedger: scr === "ledger",
    isEmpty: scr === "empty",
    isMember: scr === "member",
    isGroups: scr === "groups",
    isSettings: scr === "settings",
    isPaywall: scr === "paywall",

    identifier: s.identifier,
    onIdentifier: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, identifier: e.target.value })),
    password: s.password,
    onPassword: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, password: e.target.value })),
    ownerName: s.ownerName,
    onOwner: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, ownerName: e.target.value })),
    ownerNameOut: s.owner?.name || s.ownerName || "Amaka Nwosu",
    termsMark: s.terms ? "✓" : "",
    toggleTerms: () => setS((prev) => ({ ...prev, terms: !prev.terms })),
    identifierDisplay,
    pinCells,
    pinCells2,
    loginWithPassword: async () => {
      if (!s.identifier.trim() || !s.password) {
        say("Enter your email/phone and password");
        return;
      }
      setS((prev) => ({ ...prev, authPending: true }));
      const result = await withToast(
        loginAction({ identifier: s.identifier.trim(), password: s.password }),
        {
          loading: "Signing in…",
          success: (data) =>
            "Welcome back" + (data.owner.name ? ", " + data.owner.name : ""),
        },
      );
      setS((prev) => ({ ...prev, authPending: false }));
      if (!result.ok) return;
      setS((prev) => ({ ...prev, screen: "ledger", owner: result.data.owner }));
    },
    signupWithPassword: async () => {
      if (!s.identifier.trim()) {
        say("Add an email or phone number");
        return;
      }
      if (s.password.length < 8) {
        say("Password must be at least 8 characters");
        return;
      }
      if (!s.terms) {
        say("Agree to the terms to continue");
        return;
      }
      const identifier = s.identifier.trim();
      const isEmail = identifier.includes("@");
      setS((prev) => ({ ...prev, authPending: true }));
      const result = await withToast(
        signupAction({
          email: isEmail ? identifier : undefined,
          phone: isEmail ? undefined : identifier,
          name: s.ownerName.trim() || undefined,
          password: s.password,
        }),
        {
          loading: "Creating your account…",
          success: isEmail
            ? "Account created — check your email to verify it"
            : "Account created — let's get you set up",
        },
      );
      setS((prev) => ({ ...prev, authPending: false }));
      if (!result.ok) return;
      setS((prev) => ({
        ...prev,
        screen: "onboard",
        obStep: 1,
        owner: result.data.owner,
      }));
    },
    forgotPassword: async () => {
      const identifier = s.identifier.trim();
      if (!identifier.includes("@")) {
        say("Enter the email you signed up with first");
        return;
      }
      setS((prev) => ({ ...prev, authPending: true }));
      const result = await withToast(forgotPasswordAction({ email: identifier }), {
        loading: "Sending reset link…",
        success: "If an account exists for this email, a reset link has been sent",
      });
      setS((prev) => ({ ...prev, authPending: false }));
      if (result.ok) setS((prev) => ({ ...prev, screen: "login" }));
    },
    googleAuth: async (idToken: string) => {
      setS((prev) => ({ ...prev, authPending: true }));
      const result = await withToast(googleSignInAction({ idToken }), {
        loading: "Signing in with Google…",
        success: (data) =>
          "Welcome" + (data.owner.name ? ", " + data.owner.name : ""),
      });
      setS((prev) => ({ ...prev, authPending: false }));
      if (!result.ok) return;
      setS((prev) => ({
        ...prev,
        owner: result.data.owner,
        screen: result.data.isNewOwner ? "onboard" : "ledger",
        obStep: result.data.isNewOwner ? 1 : prev.obStep,
      }));
    },

    obStep: s.obStep,
    obBars,
    obIs1: s.obStep === 1,
    obIs2: s.obStep === 2,
    obIs3: s.obStep === 3,
    obCta: s.obStep === 3 ? "Open Sorthehelp" : "Continue",
    obNext: () => {
      if (s.obStep === 2) createGroupFromOnboarding();
      if (s.obStep === 3) {
        setS((prev) => ({ ...prev, screen: "ledger" }));
      } else {
        setS((prev) => ({ ...prev, obStep: prev.obStep + 1 }));
      }
    },
    obBack: () =>
      s.obStep === 1
        ? setS((prev) => ({ ...prev, screen: "login" }))
        : setS((prev) => ({ ...prev, obStep: prev.obStep - 1 })),
    pickOneTime: () => setS((prev) => ({ ...prev, type: "one_time" })),
    pickRecurring: () => setS((prev) => ({ ...prev, type: "recurring" })),
    oneTimeBg: isOne ? "#FBF7EC" : "transparent",
    oneTimeBorder: isOne ? INK : RULE,
    oneTimeMark: isOne ? "✓" : "",
    recurBg: isOne ? "transparent" : "#FBF7EC",
    recurBorder: isOne ? RULE : INK,
    recurMark: isOne ? "" : "✓",
    oneTimePillBg: isOne ? INK : CARD,
    oneTimePillFg: isOne ? "#EFE7D3" : SOFT,
    recurPillBg: isOne ? CARD : INK,
    recurPillFg: isOne ? SOFT : "#EFE7D3",
    groupName: s.groupName,
    onGroupName: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, groupName: e.target.value })),
    groupPrice: s.groupPrice,
    onGroupPrice: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, groupPrice: e.target.value })),
    groupNameOut: s.groupName || "Advanced Crochet",
    groupPriceOut: s.groupPrice ? naira(Number(s.groupPrice)) : "₦5,000",
    cycleOut: isOne ? "Once" : "Every 30 days",
    typeWord: isOne ? "one-time" : "recurring",
    previewDue: isOne ? "Awaiting payment" : "Due in 30 days",
    accessOut: s.tg
      ? "Telegram link"
      : s.wa
        ? "Reminders only"
        : "Tracking only",
    tgTrack: s.tg ? "#3F6B4F" : "#E6DBBE",
    tgKnob: s.tg ? "20px" : "2px",
    toggleTg: () => setS((prev) => ({ ...prev, tg: !prev.tg })),
    waTrack: s.wa ? "#3F6B4F" : "#E6DBBE",
    waKnob: s.wa ? "20px" : "2px",
    toggleWa: () => setS((prev) => ({ ...prev, wa: !prev.wa })),
    lockTrack: s.lock ? "#3F6B4F" : "#E6DBBE",
    lockKnob: s.lock ? "20px" : "2px",
    toggleLock: () => setS((prev) => ({ ...prev, lock: !prev.lock })),
    checkRows,
    checkDone,

    revenue: naira(s.revenue),
    groupCollectedLabel: naira(groupCollected),
    groupTargetLabel: naira(groupTarget),
    groupPercent,
    notificationCount,
    openNotifications,
    stats,
    query: s.query,
    onQuery: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, query: e.target.value })),
    clearQuery: () => setS((prev) => ({ ...prev, query: "" })),
    filters,
    rows,
    groups,
    tabs,
    settingRows,
    reminderEditOpen: s.reminderEditOpen,
    reminderDraft: s.reminderDraft,
    setReminderDraft: (v: string) =>
      setS((prev) => ({ ...prev, reminderDraft: v })),
    closeReminderEdit,
    saveReminderEdit,
    groupLabel: s.group,
    sel,
    onLink: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === prev.selId ? { ...m, link: v } : m,
        ),
      }));
    },
    onEmail: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === prev.selId ? { ...m, email: v } : m,
        ),
      }));
    },
    openPay: () => {
      setS((prev) => ({ ...prev, payFor: prev.selId }));
      say("Logging payment for " + sel.name);
    },
    toggleEarly: () => {
      setS((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === prev.selId ? { ...m, earlyAccess: !m.earlyAccess } : m,
        ),
      }));
    },
    paySel: () => markPaid(s.selId),
    remindSel: () => remindMemberAction(selMember),

    addOpen: s.addOpen,
    openAdd,
    closeAdd,
    confirmAdd,
    bulkOpen: s.bulkOpen,
    openBulk,
    closeBulk,
    confirmBulk,
    bulkText: s.bulkText,
    setBulkText: (v: string) => setS((prev) => ({ ...prev, bulkText: v })),
    bulkCount: s.bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean).length,
    broadcastOpen: s.broadcastOpen,
    openBroadcast,
    closeBroadcast,
    sendBroadcastMock,
    broadcastAudience: s.broadcastAudience,
    setBroadcastAudience,
    broadcastSubject: s.broadcastSubject,
    setBroadcastSubject: (v: string) =>
      setS((prev) => ({ ...prev, broadcastSubject: v })),
    broadcastBody: s.broadcastBody,
    setBroadcastBody: (v: string) =>
      setS((prev) => ({ ...prev, broadcastBody: v })),
    broadcastRecipientCount,
    newName: s.newName,
    setNewName: (v: string) => setS((prev) => ({ ...prev, newName: v })),
    newPhone: s.newPhone,
    setNewPhone: (v: string) => setS((prev) => ({ ...prev, newPhone: v })),
    newEmail: s.newEmail,
    setNewEmail: (v: string) => setS((prev) => ({ ...prev, newEmail: v })),
    newAmount: s.newAmount,
    setNewAmount: (v: string) => setS((prev) => ({ ...prev, newAmount: v })),
    newType: s.newType,
    pickType: (t: MemberType) => setS((prev) => ({ ...prev, newType: t })),
    newMemberPlans,
    newPlanIsCustom: s.newPlanId === "custom",
    newPlanFormOpen: s.newPlanFormOpen,
    toggleNewPlanForm,
    newPlanName: s.newPlanName,
    setNewPlanName: (v: string) =>
      setS((prev) => ({ ...prev, newPlanName: v })),
    newPlanPrice: s.newPlanPrice,
    setNewPlanPrice: (v: string) =>
      setS((prev) => ({ ...prev, newPlanPrice: v })),
    newPlanType: s.newPlanType,
    pickNewPlanType: (t: MemberType) =>
      setS((prev) => ({ ...prev, newPlanType: t })),
    createInlinePlan,

    telegramConnected: Boolean(s.telegramChatIds[s.group]),
    telegramChatIdLabel: s.telegramChatIds[s.group] || "Not connected",
    telegramSheetOpen: s.telegramSheetOpen,
    openTelegramSettings,
    closeTelegramSettings,
    telegramDraft: s.telegramDraft,
    setTelegramDraft: (v: string) =>
      setS((prev) => ({ ...prev, telegramDraft: v })),
    saveTelegramSettings,
    disconnectTelegram,

    planFilters,
    planFilterLabel,
    planFilterOpen: s.planFilterOpen,
    openPlanFilter,
    closePlanFilter,
    plansOpen: s.plansOpen,
    openPlans,
    closePlans,
    planManageRows,
    isEditingPlan: s.editingPlanId !== null,
    planFormName: s.planFormName,
    setPlanFormName: (v: string) =>
      setS((prev) => ({ ...prev, planFormName: v })),
    planFormPrice: s.planFormPrice,
    setPlanFormPrice: (v: string) =>
      setS((prev) => ({ ...prev, planFormPrice: v })),
    planFormType: s.planFormType,
    pickPlanFormType: (t: MemberType) =>
      setS((prev) => ({ ...prev, planFormType: t })),
    savePlan,
    cancelPlanEdit,

    selId: s.selId,
    planPickerFor: s.planPickerFor,
    planPickerName: pickerMember ? pickerMember.name : "",
    planPickerOptions,
    openPlanPicker,
    closePlanPicker,

    payFor: s.payFor,
    payAmount: s.payAmount,
    setPayAmount: (v: string) => setS((prev) => ({ ...prev, payAmount: v })),
    payName: payMember ? payMember.name : "",
    payNote: payMember ? payMember.note : "",
    payBalanceLabel: naira(payBalance),
    setHalf: () =>
      setS((prev) => ({ ...prev, payAmount: String(Math.round(payBalance / 2)) })),
    setFull: () =>
      setS((prev) => ({ ...prev, payAmount: String(payBalance) })),
    closePay,
    confirmPay,

    authPending: s.authPending,
    emailVerified: Boolean(s.owner?.emailVerified),
    signOut,
    saveProfile,
  };
}

export type SorthehelpVals = ReturnType<typeof useSorthehelp>;
