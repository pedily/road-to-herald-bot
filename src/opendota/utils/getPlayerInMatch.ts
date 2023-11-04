import { Match } from "../api/match/match";

export type MatchPlayer = Match["players"][number];

export const getPlayerInMatch = (playerId: string, match: Match): MatchPlayer =>
  match.players.find((player) => {
    player.account_id === Number(playerId);
  })!;
