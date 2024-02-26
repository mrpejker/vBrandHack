# vBrandHack

# Project vBrandHack

vBrandHack is a Web3-powered tool for gamified user journeys. In the current prototype, we combine gaming, Avalanche blockchain smart contracts, and Particle user-friendly authorization to build a unique experience for social media marketing (SMM) campaigns. This project was designed and developed during the Avalanche Frontier: Decentralized Consumer Application Hackathon to illustrate the concept of a user engagement platform with a Web3 data management system. It also shows the potential for a creator economy, inviting users to access a marketplace of SMM campaigns where they can join as ambassadors and help brands amplify their outreach.

## Components

### Frontend: SMM Campaigns Marketplace

The front-end of the project presents a collection of available where users can browse and participate in various SMM campaigns. It's designed to connect brands with individuals, enabling effective promotion and outreach through social media channels.

### Mini-Game: Catcher (Phaser)

The project features a captivating mini-game developed using Phaser, a popular framework for creating games. This game challenges players to catch falling objects, offering a fun and interactive way to engage with the platform.

### Blockchain: Avalanche Smart Contracts

In Avalanche blockchain, the project deploys [smart contracts](https://testnet.snowtrace.io/address/0x49f169Af61F3736fa6153DFEeB8868a5c93E33B4) for NFT minting as a reward for SMM campaign. These contracts are developed with Remix IDE and OpenZeppelin, ensuring reliability and security in operations such as rewards distribution and campaign agreements. The Particle solution is integrated for authorization.

### Authentication: Particle for Web2

To streamline user access and interaction, the project integrates Particle for web2 authorization. This component ensures a seamless and secure login process, allowing users to participate in campaigns, play the mini-game, and engage with the platform without complex blockchain wallet setups.

## Further development

- Integration with our main platform at [vSelf](https://vself.app/);
- Tooling to launch and customize campaigns from brand-focused dashboard: choose images and descriptions for SBT rewards, access analytics, choose and tune up mini-games for engagement;
- AI assisted content and game creation;
- Tokenization layer to reward influencers.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo
- [Ambassador flow](https://youtu.be/NG-LlZULArM): join a campaign as an authorized ambassador and get a unique shareble link to your audience;
- [User flow](https://youtu.be/cOmzHR1ljxQ): join a campaign as a regular participant, play a branded game, and authorize with Particle to claim your NFT prize.

<img width="1358" alt="image" src="https://github.com/mrpejker/vBrandHack/assets/8280427/3fe9527c-8380-42dd-ae1e-6ca8ba832d87">
<img width="1214" alt="image" src="https://github.com/mrpejker/vBrandHack/assets/8280427/b284332c-11a4-4d2e-8e7c-0e358020e85f">


## Getting Started

To get started with the project, follow these steps:

### Clone this repository

```bash
git clone https://github.com/mrpejker/vBrandHack.git
cd vBrandHack
```

### Install dependencies

```
yarn install
```

OR

```
npm install
```

### Set environment variables

This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:

- `VITE_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `VITE_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `VITE_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `VITE_PRIVATE_KEY`, private key for the Avalanche C-Chain.

### Start the project

```
npm run dev
```

OR

```
yarn dev
```

### Test the project

You can test the project [here](https://v-brand-hack-eta.vercel.app/).
