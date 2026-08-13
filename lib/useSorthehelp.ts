"use client";

import { useEffect, useRef, useState } from "react";

const DAY = 86400000;
export const INK = "#202A33";
export const SOFT = "#6b6455";
export const FAINT = "#9c9484";
export const RULE = "#D6C69A";
export const CARD = "#FBF7EC";

export type MemberType = "one_time" | "recurring";
export type MemberStatus = "active" | "pending" | "due" | "lapsed" | "part";

export interface Member {
  id: number;
  name: string;
  phone: string;
  type: MemberType;
  amount: number;
  paidAmount: number;
  note: string;
  link: string;
  group: string;
  dueDate?: number;
  earlyAccess?: boolean;
}

export type Screen =
  | "splash"
  | "login"
  | "signup"
  | "otp"
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
  phone: string;
  ownerName: string;
  terms: boolean;
  otp: string[];
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
  selId: number;
  stampId: number | null;
  toast: string;
  pickerOpen: boolean;
  resend: number;
  revenue: number;
  members: Member[];
  isNew: boolean;
  addOpen: boolean;
  newName: string;
  newAmount: string;
  newPhone: string;
  newType: MemberType;
  payFor: number | null;
  payAmount: string;
}

const initialMembers: Member[] = [
  {
    id: 1,
    name: "Ngozi Okafor",
    phone: "0803 411 2288",
    type: "one_time",
    amount: 5000,
    paidAmount: 5000,
    note: "Advanced Crochet",
    link: "https://t.me/+abc123uniq",
    group: "Advanced Crochet",
    earlyAccess: false,
  },
  {
    id: 2,
    name: "Femi Adio",
    phone: "0701 992 4410",
    type: "recurring",
    amount: 8000,
    paidAmount: 0,
    dueDate: Date.now() + 2 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
  },
  {
    id: 3,
    name: "Ibrahim Musa",
    phone: "0812 555 0193",
    type: "recurring",
    amount: 8000,
    paidAmount: 3000,
    dueDate: Date.now() - 3 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
  },
  {
    id: 4,
    name: "Chiamaka Eze",
    phone: "0906 220 7734",
    type: "recurring",
    amount: 10000,
    paidAmount: 0,
    dueDate: Date.now() + 21 * DAY,
    note: "Iron Yard",
    link: "",
    group: "Iron Yard",
  },
  {
    id: 5,
    name: "Tolu Bankole",
    phone: "0705 118 6620",
    type: "one_time",
    amount: 5000,
    paidAmount: 2000,
    note: "Advanced Crochet",
    link: "",
    group: "Advanced Crochet",
    earlyAccess: true,
  },
];

function makeInitialState(startScreen: Screen): State {
  return {
    screen: startScreen,
    phone: "",
    ownerName: "",
    terms: true,
    otp: ["", "", "", "", "", ""],
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
    selId: 2,
    stampId: null,
    toast: "",
    pickerOpen: false,
    resend: 24,
    revenue: 26000,
    members: initialMembers,
    isNew: true,
    addOpen: false,
    newName: "",
    newAmount: "",
    newPhone: "",
    newType: "one_time",
    payFor: null,
    payAmount: "",
  };
}

export function useSorthehelp(
  startScreen: Screen = "splash",
  onboardingVariant: OnboardingVariant = "steps",
) {
  const [s, setS] = useState<State>(() => makeInitialState(startScreen));
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setS((prev) =>
        prev.screen === "otp" && prev.resend > 0
          ? { ...prev, resend: prev.resend - 1 }
          : prev,
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const say = (msg: string) => {
    setS((prev) => ({ ...prev, toast: msg }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setS((prev) => ({ ...prev, toast: "" })),
      2200,
    );
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

  const statusOf = (m: Member): MemberStatus => {
    if (m.type === "one_time")
      return m.paidAmount >= m.amount ? "active" : "pending";
    const d = daysUntil(m.dueDate!);
    return d < 0 ? "lapsed" : d <= 3 ? "due" : "active";
  };

  const badgeOf = (st: MemberStatus, m: Member): [string, string, string] => {
    if (m.type === "one_time")
      return st === "active"
        ? ["Paid", "#E3ECE3", "#3F6B4F"]
        : ["Pending", "#ECE7DA", FAINT];
    if (st === "lapsed") return ["Lapsed", "#F0DCD3", "#8C4A3A"];
    if (st === "due") return ["Due soon", "#F3E7CB", "#A9781F"];
    return ["Active", "#E3ECE3", "#3F6B4F"];
  };

  const dueText = (m: Member, st: MemberStatus) => {
    if (m.type === "one_time")
      return m.paidAmount >= m.amount ? "Paid · one-time" : "Awaiting payment";
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

  const openAdd = () => setS((prev) => ({ ...prev, addOpen: true }));
  const closeAdd = () =>
    setS((prev) => ({
      ...prev,
      addOpen: false,
      newName: "",
      newPhone: "",
      newAmount: "",
      newType: "one_time",
    }));
  const confirmAdd = () => {
    if (!s.newName.trim()) {
      say("Add a name first");
      return;
    }
    const amount = Number(s.newAmount) || 0;
    setS((prev) => {
      const nextId =
        prev.members.reduce((max, m) => Math.max(max, m.id), 0) + 1;
      const member: Member = {
        id: nextId,
        name: prev.newName.trim(),
        phone: prev.newPhone.trim(),
        type: prev.newType,
        amount,
        paidAmount: 0,
        note: prev.group,
        link: "",
        group: prev.group,
        dueDate:
          prev.newType === "recurring" ? Date.now() + 30 * DAY : undefined,
      };
      return {
        ...prev,
        members: [...prev.members, member],
        addOpen: false,
        newName: "",
        newPhone: "",
        newAmount: "",
        newType: "one_time",
      };
    });
    say(s.newName.trim() + " added to " + s.group);
  };

  const closePay = () =>
    setS((prev) => ({ ...prev, payFor: null, payAmount: "" }));
  const confirmPay = () => {
    const id = s.payFor;
    if (id === null) return;
    const amount = Number(s.payAmount) || 0;
    if (amount <= 0) {
      say("Enter an amount first");
      return;
    }
    const target = s.members.find((m) => m.id === id);
    setS((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id !== id
          ? m
          : {
              ...m,
              paidAmount: Math.min(m.paidAmount + amount, m.amount),
              dueDate:
                m.type === "recurring" && m.paidAmount + amount >= m.amount
                  ? Date.now() + 30 * DAY
                  : m.dueDate,
            },
      ),
      revenue: prev.revenue + amount,
      payFor: null,
      payAmount: "",
      stampId:
        target && target.paidAmount + amount >= target.amount ? id : prev.stampId,
    }));
    say((target ? target.name : "Payment") + " · " + naira(amount) + " logged");
  };

  const markPaid = (id: number) => {
    setS((prev) => {
      const target = prev.members.find((m) => m.id === id);
      return {
        ...prev,
        members: prev.members.map((m) =>
          m.id !== id
            ? m
            : m.type === "one_time"
              ? { ...m, paidAmount: m.amount }
              : { ...m, dueDate: Date.now() + 30 * DAY },
        ),
        revenue: prev.revenue + (target ? target.amount : 0),
        stampId: id,
      };
    });
    const m = s.members.find((x) => x.id === id);
    say((m ? m.name : "Member") + " marked as paid");
  };

  const scr = s.screen;
  const variant = onboardingVariant;

  const screens: Screen[] = [
    "splash",
    "login",
    "signup",
    "otp",
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

  const visible = s.members
    .filter((m) => m.group === s.group)
    .filter((m) => s.filter === "all" || m.type === s.filter)
    .filter((m) => s.statusFilter === "all" || statusOf(m) === s.statusFilter);

  const rows = visible.map((m) => {
    const st = statusOf(m);
    const [badge, badgeBg, badgeFg] = badgeOf(st, m);
    const paidOneTime = m.type === "one_time" && m.paidAmount >= m.amount;
    return {
      id: m.id,
      name: m.name,
      note: m.note,
      typeLabel: m.type === "one_time" ? "one-time" : "recurring",
      badge,
      badgeBg,
      badgeFg,
      amount: naira(m.amount),
      dueText: dueText(m, st),
      showPay: !paidOneTime,
      showPart: m.paidAmount > 0 && m.paidAmount < m.amount,
      showSend: paidOneTime,
      showRemind:
        (m.type === "one_time" && !(m.paidAmount >= m.amount)) ||
        st === "due" ||
        st === "lapsed",
      stamped: s.stampId === m.id,
      pay: () => markPaid(m.id),
      logPart: () => {
        setS((prev) => ({ ...prev, payFor: m.id }));
        say("Logging partial payment for " + m.name);
      },
      remind: () => say("Opening WhatsApp for " + m.name),
      open: () => setS((prev) => ({ ...prev, selId: m.id, screen: "member" })),
    };
  });

  const inGroup = s.members.filter((m) => m.group === s.group);
  const count = (st: MemberStatus) =>
    inGroup.filter((m) => statusOf(m) === st).length;
  const statDef: [MemberStatus, string, string][] = [
    ["active", "Active", "#3F6B4F"],
    ["due", "Due soon", "#A9781F"],
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

  const selMember = s.members.find((x) => x.id === s.selId) || s.members[0];
  const selStatus = statusOf(selMember);
  const [selBadge, selBadgeBg, selBadgeFg] = badgeOf(selStatus, selMember);
  const sel = {
    name: selMember.name,
    note: selMember.note,
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

  const groupDefs = [
    {
      name: "Advanced Crochet",
      cycle: "one-time",
      price: "₦5,000",
      members: 2,
      dueNote: "1 pending",
      dueColor: FAINT,
    },
    {
      name: "Iron Yard",
      cycle: "every 30 days",
      price: "₦8,000+",
      members: 3,
      dueNote: "1 lapsed",
      dueColor: "#8C4A3A",
    },
  ];
  const groups = groupDefs.map((g) => ({
    ...g,
    border: s.group === g.name ? INK : RULE,
    tap: () =>
      setS((prev) => ({
        ...prev,
        group: g.name,
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
      title: "Phone number",
      sub: "Used to sign in",
      value: "+234 801 234 5678",
      valueColor: SOFT,
      tap: go.pin,
    },
    {
      title: "Payouts",
      sub: "Where collected money lands",
      value: "Not set",
      valueColor: "#A9781F",
      tap: go.paywall,
    },
    {
      title: "Telegram bot",
      sub: "For automatic invite links",
      value: "v2",
      valueColor: FAINT,
      tap: () => say("Automatic links arrive with the backend (v2)"),
    },
    {
      title: "Reminder message",
      sub: "The text sent on WhatsApp",
      value: "Edit",
      valueColor: SOFT,
      tap: () => say("Reminder template editor"),
    },
    {
      title: "Plan",
      sub: "Free · 2 groups",
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

  const digits = "482913";
  const otpCells = s.otp.map((ch, i) => ({
    ch: ch || "·",
    tap: () =>
      setS((prev) => {
        const o = prev.otp.slice();
        o[i] = digits[i];
        return { ...prev, otp: o };
      }),
  }));
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

  const phoneDisplay = s.phone ? "+234 " + s.phone : "+234 801 234 5678";

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
    isOtp: scr === "otp",
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

    phone: s.phone,
    onPhone: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, phone: e.target.value })),
    ownerName: s.ownerName,
    onOwner: (e: React.ChangeEvent<HTMLInputElement>) =>
      setS((prev) => ({ ...prev, ownerName: e.target.value })),
    ownerNameOut: s.ownerName || "Amaka Nwosu",
    termsMark: s.terms ? "✓" : "",
    toggleTerms: () => setS((prev) => ({ ...prev, terms: !prev.terms })),
    phoneDisplay,
    otpCells,
    pinCells,
    pinCells2,
    resendIn: "0:" + String(Math.max(s.resend, 0)).padStart(2, "0"),
    fillCode: () => setS((prev) => ({ ...prev, otp: digits.split("") })),
    sendCodeNew: () =>
      setS((prev) => ({ ...prev, screen: "otp", isNew: true, resend: 24 })),
    sendCodeReturning: () =>
      setS((prev) => ({ ...prev, screen: "otp", isNew: false, resend: 24 })),
    verify: () =>
      s.isNew
        ? setS((prev) => ({ ...prev, screen: "onboard", obStep: 1 }))
        : setS((prev) => ({ ...prev, screen: "ledger" })),
    verifyCta: s.isNew ? "Verify and set up" : "Verify and open Sorthehelp",
    otpNote: s.isNew
      ? "New account · we will set your first group up next"
      : "Signing back in · your book is where you left it",

    obStep: s.obStep,
    obBars,
    obIs1: s.obStep === 1,
    obIs2: s.obStep === 2,
    obIs3: s.obStep === 3,
    obCta: s.obStep === 3 ? "Open Sorthehelp" : "Continue",
    obNext: () =>
      s.obStep === 3
        ? setS((prev) => ({ ...prev, screen: "ledger" }))
        : setS((prev) => ({ ...prev, obStep: prev.obStep + 1 })),
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
    stats,
    filters,
    rows,
    groups,
    tabs,
    settingRows,
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
    remindSel: () => say("Opening WhatsApp for " + sel.name),

    addOpen: s.addOpen,
    openAdd,
    closeAdd,
    confirmAdd,
    newName: s.newName,
    setNewName: (v: string) => setS((prev) => ({ ...prev, newName: v })),
    newPhone: s.newPhone,
    setNewPhone: (v: string) => setS((prev) => ({ ...prev, newPhone: v })),
    newAmount: s.newAmount,
    setNewAmount: (v: string) => setS((prev) => ({ ...prev, newAmount: v })),
    newType: s.newType,
    pickType: (t: MemberType) => setS((prev) => ({ ...prev, newType: t })),

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

    toast: s.toast,
  };
}

export type SorthehelpVals = ReturnType<typeof useSorthehelp>;
