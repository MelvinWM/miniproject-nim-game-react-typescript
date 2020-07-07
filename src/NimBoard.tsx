
import React from 'react';

import './NimBoard.css';

import { NimHeap } from "./NimHeap";

export interface NimBoardProps {
  readonly nimHeapsNumberOfMatchsticks: Array<number>;
  readonly onNimHeapClick: (matchesToSubtract: number, nimHeapIndex: number) => void;
  readonly isPlayer1: boolean;
}

interface NimBoardState {
}

export class NimBoard extends React.Component<NimBoardProps, NimBoardState> {

  render() {

    return (

      <div>
        <div>
          {
            this.props.nimHeapsNumberOfMatchsticks.map((numberOfMatchsticks, index) => {
              return NimBoard.renderNimHeap(
                index,
                numberOfMatchsticks,
                (matchesToSubtract: number) => this.props.onNimHeapClick(matchesToSubtract, index)
              );
            })
          }
        </div>
      </div>
    );
  }

  private static renderNimHeap(
    heapIndex: number,
    numberOfMatchsticks: number,
    handleNimHeapClick: (matchesToSubtract: number) => void,
  ) {

    return (
      <div
        key={heapIndex}
        className="NimBoard-nim-heap-row"
      >
        <NimHeap
          numberOfMatchsticks={numberOfMatchsticks}
          onClick={handleNimHeapClick}
        />
      </div>
    );
  }
}

