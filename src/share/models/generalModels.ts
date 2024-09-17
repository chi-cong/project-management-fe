export const OUserStorageVars = {
  AccessToken: "accessToken",
  RefreshToken: "refreshToken",
  Role: "role",
};

export type UserStorageVars =
  (typeof OUserStorageVars)[keyof typeof OUserStorageVars];
