import type { UserStorageVars } from "src/share/models";

export const localStorageUtil = {
  get: (itemKey: UserStorageVars): string | undefined => {
    const jsonString: string | null = localStorage.getItem(itemKey);
    if (typeof jsonString === "string") {
      return JSON.parse(jsonString);
    }
  },
  delete: (itemKey: UserStorageVars): void => {
    localStorage.removeItem(itemKey);
  },
  set: (itemKey: UserStorageVars, value: unknown): void => {
    localStorage.setItem(itemKey, JSON.stringify(value));
  },
};

export const sessionStorageUtil = {
  get: (itemKey: UserStorageVars): unknown => {
    const jsonString: string | null = sessionStorage.getItem(itemKey);
    if (typeof jsonString === "string") {
      return JSON.parse(jsonString);
    }
  },
  delete: (itemKey: UserStorageVars): void => {
    sessionStorage.removeItem(itemKey);
  },
  set: (itemKey: UserStorageVars, value: unknown): void => {
    sessionStorage.setItem(itemKey, JSON.stringify(value));
  },
};
