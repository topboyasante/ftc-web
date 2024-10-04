import {
  format,
  FormatDistanceFnOptions,
  FormatDistanceToken,
  formatDistanceToNow,
  Locale,
} from "date-fns";
import { enUS } from "date-fns/locale";

const customLocale: Locale = {
  ...enUS,
  formatDistance: (
    token: FormatDistanceToken,
    count: number,
    options?: {
      addSuffix?: FormatDistanceFnOptions["addSuffix"];
      comparison?: FormatDistanceFnOptions["comparison"];
    }
  ) => {
    let result = enUS.formatDistance!(token, count, options);

    result = result.replace("about ", "");

    return result;
  },
};

export function getFormattedDate(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true, locale: customLocale });
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy");
}

export function formatTime(dateString: Date) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
