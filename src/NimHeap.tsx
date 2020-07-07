
import React from 'react';

import './NimHeap.css';
import matchstick from './matchstick.svg';

export interface NimHeapProps {
  readonly numberOfMatchsticks: number;
  readonly onClick: (matchesToSubtract: number) => void,
}

interface NimHeapState {
  // Highlight when hovering over matchstick to show how many
  // matchsticks will be taken when clicked.
  readonly indexHighlighted: number;
}

export class NimHeap extends React.Component<NimHeapProps, NimHeapState> {

  constructor(props: NimHeapProps) {
    super(props);

    this.state = {
      indexHighlighted: -1,
    };
  }

  render() {

    const matchsticks = Array
      .from(Array(this.props.numberOfMatchsticks).keys())
      .map(i => {

        const backgroundColor = i <= this.state.indexHighlighted ?
          "#282c34" :
          "transparent";

        return (
          <img
            key={this.props.numberOfMatchsticks - i}

            className="NimHeap-matchstick-image" src={matchstick} alt="matchstick"

            // TODO: As of Chromium version 83, there might be issues with 'onMouseEnter'
            //   not being called when the element itself is moved under the cursor.
            //   See for instance http://jsfiddle.net/r8rckL34/4/ .
            //   This author is not quite sure how best to handle or mitigate this.

            onMouseEnter={() => this.setState({indexHighlighted: i})}
            onMouseLeave={() => this.setState({indexHighlighted: -1})}

            onClick={() => {

              this.setState({
                indexHighlighted: -1,
              });

              this.props.onClick(i + 1);
            }}

            style={{backgroundColor: backgroundColor}}
          />
        );
      });

    return (
      <div>
        {matchsticks}
      </div>
    );
  }
}

