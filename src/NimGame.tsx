
import React from 'react';

import './NimGame.css';

import { NimBoard } from "./NimBoard";
import { NimGameStatusInfo } from "./NimGameStatusInfo";

interface NimHistorySlice {
  readonly nimHeapsNumberOfMatchsticks: Array<number>;
}

interface NimGameProps {

}

interface NimGameState {
  // May not be empty. First element is initial state.
  readonly history: Array<NimHistorySlice>;
  // Step number 0 is game start.
  readonly stepNumber: number;
}

export class NimGame extends React.Component<NimGameProps, NimGameState> {

  constructor(props: NimGameProps) {
    super(props);

    this.state = {
      history: [
        {
          nimHeapsNumberOfMatchsticks: [1, 2, 3, 4, 5],
        },
      ],
      stepNumber: 0,
    };
  }

  render() {

    const currentHistorySlice = this.getCurrentHistorySlice();
    const isPlayer1 = this.getIsPlayer1();

    return (
      <div>

        <div className="NimGame-split NimGame-left">
          <NimGameStatusInfo
            nimHeapsNumberOfMatchsticks={currentHistorySlice.nimHeapsNumberOfMatchsticks}

            isPlayer1={isPlayer1}
          />
          <NimBoard
            nimHeapsNumberOfMatchsticks={currentHistorySlice.nimHeapsNumberOfMatchsticks}

            onNimHeapClick={
              (matchesToSubtract: number, nimHeapIndex: number) => {

                const copiedHeaps = currentHistorySlice.nimHeapsNumberOfMatchsticks.slice();
                copiedHeaps[nimHeapIndex] = copiedHeaps[nimHeapIndex] - matchesToSubtract;

                let newHistory: Array<NimHistorySlice>;
                {
                  const historyUntilAndWithCurrentHistorySlice = this.state.history.slice(0, this.state.stepNumber + 1);
                  const newHistorySlice = {
                    nimHeapsNumberOfMatchsticks: copiedHeaps,
                  };
                  newHistory = historyUntilAndWithCurrentHistorySlice.concat([newHistorySlice]);
                }

                this.setState({
                  history: newHistory,
                  stepNumber: this.state.stepNumber + 1,
                });
              }
            }

            isPlayer1={isPlayer1}
          />
        </div>

        <div className="NimGame-split NimGame-right">
          <div>Game history</div>
          <ul className="NimGame-history-list">{this.renderNimGameHistory()}</ul>
        </div>

      </div>
    );
  }

  private getCurrentHistorySlice() {
    return this.state.history[this.state.stepNumber];
  }

  private getIsPlayer1() {
    return this.state.stepNumber % 2 === 0;
  }

  private rewindState(newStepNumber: number) {
    this.setState({
      stepNumber: newStepNumber,
    });
  }

  private renderNimGameHistory() {
    return this.state.history.map((historySlice, index) => {

      const description = index === 0 ?
        "Go to game start." :
        `Go to move #${index}.`;

      const listItemTextColor = index === this.state.stepNumber ?
        "white" :
        "gray";

      return (
        <li
          className="NimGame-history-list-item"
          key={index}
          style={{color: listItemTextColor}}
          onClick={() => this.rewindState(index)}
        >
          {description}
        </li>
      );
    });
  }
}

