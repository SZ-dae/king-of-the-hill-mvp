👑 King of the Hill: A Web3 Experiment
"Can a pure on-chain model of competition, risk, and reward drive real liquidity and user engagement? This project is our experiment to find out."

<!-- 나중에 실제 DApp 스크린샷 이미지 링크를 여기에 추가하세요. -->

<!--  -->

🎯 The Grand Purpose (The "Why")
In a Web3 world filled with complex, often meaningless airdrops and convoluted funding models, we asked a simple question: What is the most minimal structure required to incentivize real participation?

This MVP is not just another DApp. It is a behavioral economics experiment designed to test a core hypothesis. We believe that a transparent, high-stakes game-theoretic model, built on the simplest possible rules, can be more effective at attracting capital and engagement than many existing, more complex systems.

This is our search for the "Minimal Viable Incentive."

⚔️ The Game: How It Works
King of the Hill is a high-risk, high-reward game on the BNB Chain where the last one standing takes all. There is only the throne, the timer, and the ever-growing prize pool.

Core Game Rules
Become the King (becomeKing): To claim the throne, you must deposit more USD1 than the current King in a single transaction.

Defend the Throne (addDeposit): As the King, you can add to your deposit at any time to strengthen your position (must be at least 5% of your current total). Each new deposit you make resets the 24-hour countdown timer.

Survive for 24 Hours: If you remain King for a full 24-hour period without being dethroned, the prize is yours to claim.

The Prize (claimReward): After 24 hours, anyone can trigger the claimReward function. This ensures the game never gets stuck. The prize pool is automatically sent to the rightful King, and a new round begins.

Fees & Sustainability: Every deposit is subject to a 5% fee, distributed as follows:

3% Rollover: Injected directly into the prize pool for the next round, ensuring the game always has a compelling starting pot.

2% Dev Fee: To support the ongoing development and maintenance of this experiment.

🛡️ Security & Transparency
This is a high-risk experiment, and transparency is our highest priority.

AI Audited: The smart contract has undergone multiple preliminary audits by leading AI models (Gemini, OpenAI's GPT-4.1, and xAI's Grok) to identify and mitigate potential vulnerabilities. All critical and high-severity findings have been addressed.

Open Source: The full source code for the smart contract (hardhat-workspace) and the front-end (long-live-frontend) is available in this repository for public review.

Non-Custodial & Pausable: The contract is designed to be non-custodial. We, the developers, have no special access to the prize pool. An emergency pause function is included, which can only be triggered by the owner in the event of a critical vulnerability discovery.

View the live contract on BscScan: [Your Contract Address on BscScan]

⚠️ WARNING
This DApp is an experimental project. The smart contract has NOT been audited by a professional human security firm. Participate at your own risk. All financial losses incurred through participation are solely your responsibility. Please only participate with funds you are willing to lose for the sake of this experiment.

🚀 How to Run Locally
This project is a monorepo with two main parts: hardhat-workspace for the smart contract and long-live-frontend for the React application.

1. Smart Contract (Hardhat)
# Navigate to the hardhat directory
cd hardhat-workspace

# Install dependencies
npm install

# Compile the contracts
npx hardhat compile

2. Front-End (React + Vite)
# Navigate to the front-end directory
cd long-live-frontend

# Install dependencies
npm install

# Set up environment variables
# Create a file named .env.local in the long-live-frontend root.
# Add your WalletConnect Project ID and the deployed contract address:
# VITE_WALLETCONNECT_PROJECT_ID="YOUR_PROJECT_ID"
# VITE_CONTRACT_ADDRESS="YOUR_TESTNET_CONTRACT_ADDRESS"

# Run the development server
npm run dev

🔮 Future Vision
This MVP is just the beginning. If our core hypothesis is proven correct, this simple game can evolve into a novel, community-driven platform for:

Meme Coin Launchpads: Where projects compete for the throne to raise initial funding.

Public Goods Funding: Where the prize pool is directed towards a community-voted cause.

Governance Experiments: Where the "King" gains temporary voting power in a DAO.

Join us in this experiment to discover the true nature of Web3 incentives.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
