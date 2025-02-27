import { Languages } from "./enums";

export function setDirction(locale: Languages) {
  return locale === Languages.ARABIC ? "rtl" : "ltr";
}
export function setDirctionReverse(locale: Languages) {
  return locale === Languages.ARABIC ? "ltr" : "rtl";
}
export function setTextDirection(locale: Languages) {
  return locale === Languages.ARABIC ? "text-right" : "text-left";
}
export function setposition(locale: Languages) {
  return locale === Languages.ARABIC ? "bottom-right" : "bottom-left";
}
