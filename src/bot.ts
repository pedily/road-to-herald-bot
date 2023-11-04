import { Telegraf } from "telegraf";
import { getMatch } from "./opendota/api/match/match";
import {
  getRecentMatches,
  RecentMatches,
} from "./opendota/api/recentMatches/recentMatches";
import { getSideByPlayerSlot } from "./opendota/utils/getSideByPlayerSlot";
import { TEAMMATES, TARGET } from "./players";

const getPlayerFeedback = async (lastMatch: RecentMatches[number]) => {
  const side = getSideByPlayerSlot(lastMatch.player_slot);
  const isWon =
    side === "radiant" ? lastMatch.radiant_win : !lastMatch.radiant_win;

  const lostWithTeammates = await (async () => {
    if (isWon) return false;

    const lastMatchDetails = await getMatch(String(lastMatch.match_id));

    return !!lastMatchDetails.players.find((player) =>
      TEAMMATES.has(String(player.account_id))
    );
  })();

  console.log({
    lostWithTeammates,
    isWon,
  });

  if (isWon) {
    console.log("match was won");
    return;
  }

  if (!lostWithTeammates) {
    console.log("match was lost without teammates");
    return;
  }

  console.log("match was lost with teammates!");
  return "Komm PLAYERNAME, eins noch! Diesmal ohne Feed, versprochen!";
};

const motivate = async (
  playerId: string,
  handleFeedback: (text: string) => void
) => {
  console.log("starting to motivate!");
  let lastKnownMatchId = (await getRecentMatches(playerId))[0].match_id;

  setInterval(async () => {
    console.log("looking for new matches...");
    const recentMatches = await getRecentMatches(TARGET);

    if (recentMatches[0].match_id === lastKnownMatchId) {
      console.log("no new matches found :/");
      return;
    }

    console.log("new match result!");
    lastKnownMatchId = recentMatches[0].match_id;

    const feedback = await getPlayerFeedback(recentMatches[0]);

    if (feedback) {
      handleFeedback(feedback);
    }
  }, 1000 * 10);
};

export const createBot = (token: string) => {
  const bot = new Telegraf(token);

  let initialized = false;

  bot.use((context, next) => {
    if (!initialized) {
      initialized = true;
      motivate(TARGET, (message) => context.sendMessage(message));
      // context.sendMessage("Ich verkünde den Feed!");
    }

    next();
  });

  return bot;
};
