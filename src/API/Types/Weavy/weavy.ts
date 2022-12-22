export type TWeavyJwtResponse = {
  data: TWeavyAccessToken;
};

export type TWeavyAccessToken = {
  accessToken: string;
};

export type TWeavyPostCountResponse = {
  data: number;
};

export type TWeavyBadgeCountResponse = {
  data: TWeavyBadgeCounts;
};

export type TWeavyBadgeCounts = {
  notifications: number;
  conversations: number;
};
