export interface NavItem {
  label: string;
  href: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export interface Location {
  city: string;
  address: string;
  phone: string;
  label: string;
}

export interface SellingStep {
  num: string;
  title: string;
  desc: string;
}

export type TrustIcon = "finland" | "security" | "payout";

export interface TrustBenefit {
  title: string;
  desc: string;
  icon: TrustIcon;
}
