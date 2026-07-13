import {
  Landmark, CreditCard, Tag, Percent, Cake, HeartPulse,
  Banknote, Ruler, Fuel, Plug, Calculator,
} from 'lucide-react';

export const ICONS = {
  Landmark, CreditCard, Tag, Percent, Cake, HeartPulse,
  Banknote, Ruler, Fuel, Plug, Calculator,
};

export function getIcon(name) {
  return ICONS[name] || Calculator;
}
