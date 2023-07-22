# Protocol

Protocol

## Contributing

You will need a copy of [Foundry](https://github.com/foundry-rs/foundry) installed before proceeding. See the [installation guide](https://github.com/foundry-rs/foundry#installation) for details.

### Setup

```sh
git clone
cd protocol
forge install
```

### Run Tests

```sh
forge test
```

### Update Gas Snapshots

```sh
forge snapshot
```

### Deploying contracts

This repo uses [hardhat](https://hardhat.org/) for contract deployments because (as far as I'm aware) foundry doesn't have a tool for deterministic deployments yet.

**Install Dependencies**

```sh
pnpm i
```

**Deploy Contracts**

```sh
$ node deploy.js

```

Refer to the hardhat.config.ts file for the list of network names currently set up.
