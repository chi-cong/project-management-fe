export const localStorageUtil = {
  get: (itemKey: string): string | undefined => {
    const jsonString: string | null = localStorage.getItem(itemKey);
    if (typeof jsonString === "string") {
      return JSON.parse(jsonString);
    }
  },
  delete: (itemKey: string): void => {
    localStorage.removeItem(itemKey);
  },
  set: (itemKey: string, value: unknown): void => {
    localStorage.setItem(itemKey, JSON.stringify(value));
  },
};
export const sessionStorageUtil = {
  get: (itemKey: string): unknown => {
    const jsonString: string | null = sessionStorage.getItem(itemKey);
    if (typeof jsonString === "string") {
      return JSON.parse(jsonString);
    }
  },
  delete: (itemKey: string): void => {
    sessionStorage.removeItem(itemKey);
  },
  set: (itemKey: string, value: unknown): void => {
    sessionStorage.setItem(itemKey, JSON.stringify(value));
  },
};
