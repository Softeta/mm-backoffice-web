import { TFunction } from "react-i18next";

function stringsToSItems<T>(
  arr: string[] = [],
  translationPrefix: string | undefined = undefined,
  t: TFunction<"translation", undefined> | undefined = undefined
): T[] {
  return [...arr].sort().map(
    (label) =>
      ({
        id: label,
        label:
          translationPrefix && t ? t(`${translationPrefix}.${label}`) : label,
      } as unknown as T)
  );
}

export { stringsToSItems };
