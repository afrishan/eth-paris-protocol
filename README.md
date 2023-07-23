# Protocol

## Project Description
Think Glassdoor but decentralised and truly privacy preserving.

- Video Submission - https://youtu.be/dRPc4wQTQPY
- Frontend design -  https://www.figma.com/file/KcD1bxvePfVcXvo0tUDrkc/Parity-Website-UI?type=design&node-id=0%3A1&mode=design&t=LNKUDEY2wuLeljgc-1


## Introduction 
As the global workforce continues to grow, jobseekers look for authentic insights to make informed career decisions. Parity is on a mission to empower individuals while safeguarding their privacy through the application of zk technology. With Parity we welcome a new era of transparency, where employees can attest or dispute their fair pay, all while remaining truly anonymous.

Our platform is made up of valuable insights that go beyond salary data. Real employee reviews provide a holistic picture of workplace cultures, offering genuine perspectives on company values and work-life balance.

## Why we built this 
The motivation for this project comes from the fact that the Parity team has personal experience with being underpaid in their web2 and web3 roles in comparison to colleagues. They would have benefitted from a product like Parity however it did not exist.

The use-case is proven. Glassdoor has over 55M+ monthly users, Parity follows a similar model but unlike traditional platforms, Parity does not centralise user information, reducing risks associated with data breaches and unauthorised access. We create a trustless environment the user retains ownership and sovereignty over their data.

Parity is more than just a tool, we empower employees to challenge wage disparities and foster environments where compensation is truly reflective of merit.

## How it's Made
Verification
 - With **UMA**, employers make an optimistic statement and place a bond stating that they pay their employees fairly. There is a set time period for Parity users to attest to this or dispute it.
- We use **EAS** to allow employees to attest and attribute their reviews to the relevant employers.
- We use **XMTP** to allow us to verify salaries paid in fiat through the file upload of an official offer letter/ payslips.
- **Chainlink** is also used for off-chain salary verification
- We implemented **Sismo** to verify that our reviewers work for the companies they say they do. Our closest competitor, Glassdoor does not verify that reviewers actually work for the companies they review, resulting in the high possibility of fake reviews.

Sign in process - Improved UX
- We implemented the **Biconomy** SDK to allow our users to sign in with email - mirroring a web2 UX. We also utilised the paymaster feature so that all transactions on Parity are gasless.
- We implemented **Polygon ID** to assign credentials to our users so that they can sign in with their Polygon ID and prefill fields in the succeeding onboarding process.
- **Walletconnect** & **Metamask** - Current solutions are not inclusive of web3 native projects e.g. DAOs. We implemented Wallet Connect & Metamask to provide a smooth UX to the crypto-native user.

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
