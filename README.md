# 👑 King of the Hill: A Web3 Experiment

**Can a pure on-chain model of competition, risk, and reward drive real liquidity and user engagement? This project is our experiment to find out.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=flat&logo=solidity)](https://soliditylang.org/)
[![Made with React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)

---

## 🎯 The Grand Purpose (The "Why")

In a Web3 world filled with complex, often meaningless airdrops and convoluted funding models, we asked a simple question: What is the most minimal structure required to incentivize real participation?

This MVP is not just another DApp. It is a **behavioral economics experiment** designed to test a core hypothesis. We believe that a transparent, high-stakes game-theoretic model, built on the simplest possible rules, can be more effective at attracting capital and engagement than many existing, more complex systems.

This is our search for the **"Minimal Viable Incentive."**

---

## ⚔️ The Game: How It Works

**King of the Hill** is a high-risk, high-reward game on the BNB Chain where the last one standing takes all. There is no team, no pre-mine, and no complex tokenomics. There is only the throne, the timer, and the ever-growing prize pool.

### Core Game Rules

1.  **Become the King (`becomeKing`)**: To claim the throne, you must deposit more USD1 than the current King.
2.  **Defend the Throne (`addDeposit`)**: As the King, you can add to your deposit at any time to strengthen your position. Each new deposit you make resets the 24-hour countdown timer.
3.  **Survive for 24 Hours**: If you remain King for a full 24-hour period without being dethroned, the prize is yours to claim.
4.  **The Prize (`claimReward`)**: After 24 hours, **anyone** can trigger the `claimReward` function. This ensures the game never gets stuck. The prize pool is automatically sent to the rightful King, and a new round begins.
5.  **Fees & Sustainability**: Every deposit is subject to a 5% fee, distributed as follows:
    * **3% Rollover**: Injected directly into the prize pool for the *next* round, ensuring the game always has a compelling starting pot.
    * **2% Dev Fee**: To support the ongoing development and maintenance of this experiment.

---

## 🛡️ Security & Transparency

This is a high-risk experiment, and transparency is our highest priority.

* **AI Audited**: The smart contract has undergone multiple preliminary audits by leading AI models (Gemini, OpenAI's GPT-4.1, and xAI's Grok) to identify and mitigate potential vulnerabilities. All critical and high-severity findings have been addressed.
* **Open Source**: The full source code for the smart contract and the front-end is available in this repository for public review. We encourage the community to inspect it.
* **Non-Custodial & Pausable**: The contract is designed to be non-custodial. We, the developers, have no special access to the prize pool. An emergency `pause` function is included, which can only be triggered by the owner in the event of a critical vulnerability discovery.

**View the live contract on BscScan:** `[Your Contract Address on BscScan]`

> ### ⚠️ **WARNING**
> This DApp is an experimental project. The smart contract has **NOT** been audited by a professional human security firm. Participate at your own risk. All financial losses incurred through participation are solely your responsibility. **Please only participate with funds you are willing to lose for the sake of this experiment.**

---

## 🚀 How to Run Locally

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    * Create a file named `.env.local` in the project root.
    * Add your WalletConnect Project ID and the deployed contract address:
        ```
        VITE_WALLETCONNECT_PROJECT_ID="YOUR_PROJECT_ID"
        VITE_CONTRACT_ADDRESS="YOUR_TESTNET_CONTRACT_ADDRESS"
        ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🔮 Future Vision

This MVP is just the beginning. If our core hypothesis is proven correct, this simple game can evolve into a novel, community-driven platform for:

* **Meme Coin Launchpads**: Where projects compete for the throne to raise initial funding.
* **Public Goods Funding**: Where the prize pool is directed towards a community-voted cause.
* **Governance Experiments**: Where the "King" gains temporary voting power in a DAO.

Join us in this experiment to discover the true nature of Web3 incentives.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.