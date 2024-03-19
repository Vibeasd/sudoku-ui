# SudokuUi

This is the documentation of the sudoku client site application.

## To start

Just clone the the repository and install the dependencies by:

```bash
npm i
```

And start the development server with:

```bash
npm start
```

OR

Just play with the deployed version: https://github.com/Vibeasd/sudoku-ui

## Requirements

-   Choose a difficulty for the board (easy/medium/hard/random) and then start the game.
-   Enter numbers in the empty squares (not allowed to change the prefilled squares)
-   Have a “Validate” button to verify if they have solved it.
-   Have a “Solve” button that auto-solves the puzzle.

## How it works?

```mermaid
sequenceDiagram
    actor User
    participant Menu
    participant Game Board
    participant Store
    participant Backend API
    User->>Menu: Selects game settings
    Menu->>Store: Save state
    Store->>Backend API: Fetch board
    Menu->>Game Board: Redirect
    User->>Game Board: Playing the game
    Game Board->>Store: Updates the state
    User->>Game Board: Validates the board
    Store->>Backend API: Validate
    Game Board->>User: Notifies the user about the state
    User->>Game Board: Solves the board
    Store->>Backend API: Solve
    Game Board->>User: Notifies the user about the state
```
