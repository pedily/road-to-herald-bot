import { opendota } from "../opendota";
import match from "./match.response.json";

export type Match = typeof match;

export const getMatch = async (matchId: string) => {
  const response = await opendota.get<Match>(`/matches/${matchId}`);

  return response.data;
};
