import {
  Wallet,
  Sigma,
  HeartPulse,
  Home as HomeIcon,
  Car,
  CalendarClock,
  Ruler,
  Briefcase,
  Layers,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  finanse: Wallet,
  matematyka: Sigma,
  zdrowie: HeartPulse,
  dom: HomeIcon,
  motoryzacja: Car,
  "czas-i-data": CalendarClock,
  przeliczniki: Ruler,
  biznes: Briefcase,
  inne: Layers,
};
