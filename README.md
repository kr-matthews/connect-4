# Connect 4 [WIP]

This is a single-page application for one human player to create or join a room and play connect 4 against an opponent (human over the internet, or local computer player) in that room.

## Play

On GitHub Pages at [https://kr-matthews.github.io/connect-4](https://kr-matthews.github.io/connect-4).

But note that this is still a work in progress, so there is only partial functionality there right now, and much of the display is temporary.

## Features

### Current

WIP

### Potential Future

- Users enter into lobby, from which they can create or join a room.
- Users can change name/piece colour/light-vs-dark theme/etc. at any point, and these are remembered via local storage.
- Rooms can hold up to two users at once.
- Games can be played in rooms with two users.
- Game-play proceeds with standard connect 4 rules on a 6 (rows) x 7 (columns) board -- possibly with the option to select a custom board size.
- Wins/draws/loses are tracked until a player leaves the room.

- Possibly a computer player, or several.
- Possibly with animation of pieces dropping into columns.
- Possibly with sounds to signal when other users join a room or play a piece.

### Backup Plan

If I can't get a live connection figured out, then I'll just split the screen down the middle, each side mocking a single device/screen.

## Intentions

Best practices with state management and (custom) hooks. Separation of concerns (keeping views dumb and state logic within hooks) and better component management/organization -- including, and especially, testing. Using context for light/dark theme. Communication with a network -- potentially PubNub.

## Focus

A lot of focus on state management and custom hooks -- there were multiple complete refactors of the `useGame` hook.

WIP

## Flaws

WIP
