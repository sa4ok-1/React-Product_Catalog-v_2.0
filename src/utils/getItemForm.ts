export const getItemForm = (count: number, t: (key: string) => string) => {
  if (count === 1) {
    return t("items.one");
  } else if (count >= 2 && count <= 4) {
    return t("items.few");
  } else {
    return t("items.many");
  }
};
