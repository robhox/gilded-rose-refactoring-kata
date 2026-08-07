# Gilded Rose Refactoring Kata

A TypeScript solution to the [Gilded Rose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata), including the new Conjured item behaviour described in the [requirements](./GildedRoseRequirements.md).

## Prerequisites

- Node.js
- npm

## Install

Install the locked dependency versions:

```sh
npm ci
```

## Compile

Compile the TypeScript sources to `dist/`:

```sh
npm run compile
```

## Run

After compiling, run the inventory simulation:

```sh
node dist/test/golden-master-text-test.js
```

It runs for two days by default. Pass a number to choose the duration:

```sh
node dist/test/golden-master-text-test.js 10
```

## Test

Run the Jest test suite and generate coverage:

```sh
npm run test:jest
```

The HTML coverage report is generated at `coverage/lcov-report/index.html`.

Run Jest continuously while working:

```sh
npm run test:jest:watch
```

## Approach

The original implementation was first protected with characterization tests and a Jest snapshot of the inventory simulation. The production code was then refactored through small, behaviour-preserving commits before implementing Conjured items with dedicated tests.

The resulting design keeps the public `Item` API unchanged and delegates each item category to focused update logic. Conjured items are identified by the `Conjured` name prefix and degrade twice as fast as ordinary items, including after their sell-by date.

## Project structure

- `app/gilded-rose.ts`: inventory update implementation.
- `test/jest/gilded-rose.spec.ts`: unit and boundary tests for each item category.
- `test/jest/approvals.spec.ts`: snapshot-based characterization tests.
- `test/golden-master-text-test.ts`: inventory simulation used by the approval test.
- `GildedRoseRequirements.md`: kata requirements.

## AI usage

OpenAI Codex was used as a pair-programming assistant to discuss technical trade-offs, suggest test cases and incremental refactoring steps, and review the project configuration and documentation.

Each change was reviewed and understood before being accepted, then validated through Jest tests, snapshots and coverage. The final implementation decisions and commit structure remain my responsibility.