# Connect 4

This is a single-page application for the game Connect 4. A user can create an online room and play remotely against another user who joins the room. Alternatively, a user can play locally against a computer player, or two users can play locally.

If you want to clone the repository, you'll need to add definitions for `publishKey` and `subscribeKey` at `src/pubnubKeys.js`.

## Play

On GitHub Pages at [https://kr-matthews.github.io/connect-4](https://kr-matthews.github.io/connect-4).

## Features

### Current

- Users enter into lobby. In the lobby they can create or join a(n online) room, or play locally against the computer or a friend.
- Users can change name or piece colour, and toggle site theme (light vs dark) or sound, at any point. These settings are remembered via local storage.
- Rooms can hold up to two users at once.
- Games can be played in rooms with two users.
- Game-play proceeds with standard connect 4 rules on a 6 (rows) x 7 (columns) board.
- Wins/draws/loses are tracked until a player leaves the room.
- Sounds to notify when events (players joining/leaving rooms, winning/losing/drawing, your turn to play, etc.) happen.

### Potential Future

See [enhancements](https://github.com/kr-matthews/connect-4/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement) on GitHub.

## Original Intentions

Best practices with state management and (custom) hooks. Separation of concerns (keeping views dumb and state logic within hooks) and better component management/organization -- including, and especially, testing. Using context for light/dark theme. Communication with a network (PubNub).

## Focus

- A lot of focus on state management and custom hooks -- there were multiple complete refactors of the `useGame` and `useRoom` hooks.
- Separation of concerns: Encapsulating sounds effects in sound effect custom hooks, for instance.
- Mounting and unmounting components: Side effects, and cleanup functions in particular.
- Event listeners, and queues for incoming messages.
- Providing clean data for computer players to use.
- Computer player strategy.
- Contexts, for site theme in particular.
- Reusable components: Game in rooms and in local play.
- Promises and asynchronous functions.
- Proper testing.
- Better git commit messages and descriptions.
- Using GitHub issues and projects.

## Flaws

See the [issues](https://github.com/kr-matthews/connect-4/issues) on GitHub.
