import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { NimGame } from './NimGame';

function clickMatchsticks(numberOfMatchsticksToClick: number) {

  // Depending on implementation, clicking a single matchstick might
  // remove more than one matchstick.

  // Loop state.
  let nimHeaps = screen.queryAllByAltText('matchstick');
  let currentNumberOfClicks = 0;

  while (nimHeaps.length !== 0 && currentNumberOfClicks < numberOfMatchsticksToClick) {

    fireEvent.click(nimHeaps[0]);

    // Loop state.
    nimHeaps = screen.queryAllByAltText('matchstick');
    currentNumberOfClicks += 1;
  }
}

function queryWonTextElement() {
  return screen.queryByText('won!', { exact: false });
}

test('Text shows game has ended when it should have ended.', () => {

  render(<NimGame />);

  // Attempt to click all matchsticks.
  // 50 clicks should be much more than sufficient if there are 15 matchsticks.
  clickMatchsticks(50);

  // By presumably clicking all matchsticks, the game should
  // have ended by now.
  expect(queryWonTextElement()).toBeInTheDocument();
});

test('Text does not show game has ended when it should not have ended.', () => {

  render(<NimGame />);

  // Click at most 4 times.
  // This should not be sufficient to end the game if there
  // are 5 piles of matchsticks.
  clickMatchsticks(4);

  // The game should not have ended by now.
  expect(queryWonTextElement()).not.toBeInTheDocument();
});

