import { MatchPlayer } from "./getPlayerInMatch";

export const isWonMatch = (matchPlayer: MatchPlayer): boolean => {
  if (matchPlayer.isRadiant && matchPlayer.radiant_win) {
    return true;
  }

  if (!matchPlayer.isRadiant && !matchPlayer.radiant_win) {
    return true;
  }

  return false;
};
