export const TEAMMATES = new Set(
  ...(process.env["TEAMMATE_PLAYER_IDS"]?.split(",").map((id) => id.trim()) ??
    [])
);

export const TARGET = process.env["TARGET_PLAYER_ID"]?.trim() as string;
