
import React from 'react';

import { getGameEndedStatus } from "./GameEndedStatus";

interface NimGameStatusInfoProps {

  readonly nimHeapsNumberOfMatchsticks: Array<number>;
  readonly isPlayer1: boolean;
}

export class NimGameStatusInfo extends React.Component<NimGameStatusInfoProps> {

  render() {

    const gameEndedStatus = getGameEndedStatus(
      this.props.nimHeapsNumberOfMatchsticks,
      this.props.isPlayer1
    );

    const statusText = (() => {
      switch (gameEndedStatus.kind) {
        case "gamenotended": return `Next player: ${this.props.isPlayer1 ? "1" : "2"}.`;
        case "gameended": return `Player ${gameEndedStatus.player1Winner ? "1" : "2"} won!`;
      }
    })();

    return (
      <div>{statusText}</div>
    );
  }
}

