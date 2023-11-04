import { opendota } from "../opendota";
import recentMatches from "./recentMatches.response.json";

export type RecentMatches = typeof recentMatches;

export const getRecentMatches = async (playerId: string) => {
  const response = await opendota.get<RecentMatches>(
    `/players/${playerId}/recentMatches`
  );

  return response.data;
};
