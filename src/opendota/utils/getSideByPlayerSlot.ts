export type Side = "radiant" | "dire";

// radiant 0 1 2 3 4
// dire 128 129 130 131 132
export const getSideByPlayerSlot = (playerSlot: number): Side =>
  playerSlot < 128 ? "radiant" : "dire";
