# Solidity Project Skeleton

A quick project setup with all the good stuff for developing on solidity.

## Installation

> You will need to install the [Ganache Suite] as an external tool

### Clone the repo

Clone the repo and run `git flow init -d` *we use git flow in this repo as branching strategy

### PNPM

> If you do not have `pnpm` run `npm i -g pnpm` and then use that instead of `npm` henceforth

```bash
pnpm i
```

## Usage

To run the suite of tests for the contracts

```bash
pnpm run test
```

To run the linter

```bash
pnpm run lint
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Commit messages

Messages should follow the [Conventional Commits] pattern, which is based on [Semantic Commit Messages]

## License

[MIT](https://choosealicense.com/licenses/mit/)

[Ganache Suite]:https://www.trufflesuite.com/ganache
[Semantic Commit Messages]:https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
[Conventional Commits]:https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary
