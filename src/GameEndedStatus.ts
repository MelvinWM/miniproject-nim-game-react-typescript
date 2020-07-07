
// Tagged union pattern.

export type GameEndedStatus =
  GameNotEnded |
  GameEnded;

export interface GameNotEnded {
  kind: "gamenotended";
}

export interface GameEnded {
  kind: "gameended";
  player1Winner: boolean;
}

export function getGameEndedStatus(
  nimHeapsNumberOfMatchsticks: Array<number>,
  isPlayer1sTurn: boolean
): GameEndedStatus {

  if (nimHeapsNumberOfMatchsticks.every(sticks => sticks === 0)) {
    return {
      kind: "gameended",
      // This is decided by whether it is "misère" or "normal". Here it is
      // misère, since Wikipedia claims that is the typical mode.
      player1Winner: isPlayer1sTurn,
    };
  }
  return {
    kind: "gamenotended",
  };
}

