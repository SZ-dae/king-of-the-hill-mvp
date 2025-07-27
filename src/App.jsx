import { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import { createWeb3Modal, defaultConfig, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'

// --- .env 파일에서 환경 변수 가져오기 ---
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

// --- Web3Modal 설정 ---
const bscMainnet = {
  chainId: 56, name: 'BNB Smart Chain', currency: 'BNB', explorerUrl: 'https://bscscan.com', rpcUrl: 'https://bsc-dataseed.binance.org/'
};
const bscTestnet = {
  chainId: 97, name: 'BNB Smart Chain Testnet', currency: 'tBNB', explorerUrl: 'https://testnet.bscscan.com', rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
};
const metadata = {
  name: 'King of the Hill', description: 'A Web3 Experiment in pure competition', url: 'https://your-dapp-url.com', icons: ['https://your-dapp-url.com/favicon.ico']
};
createWeb3Modal({
  ethersConfig: defaultConfig({ metadata, defaultChainId: 97 }),
  chains: [bscMainnet, bscTestnet],
  projectId,
  enableAnalytics: false,
  featuredWalletIds: ['metaMask', 'binance', 'trust'],
  excludeWalletIds: [
    'web3auth',
    'walletConnect',
    'coinbase',
    'rainbow',
    'safe',
    'zerion',
    'okx'
  ]
});

// --- 스마트 컨트랙트 ABI ---
const CONTRACT_ABI = [
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "addDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "becomeKing", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "claimReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "_usd1", "type": "address" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" },
    { "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "king", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "addedAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTotalDeposit", "type": "uint256" }], "name": "DepositAdded", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "NewKing", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "king", "type": "address" }, { "indexed": true, "internalType": "address", "name": "claimer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "prizeAmount", "type": "uint256" }], "name": "RewardClaimed", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "nextRoundPool", "type": "uint256" }], "name": "RoundStarted", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "rescueTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "ADD_DEPOSIT_MIN_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "currentDeposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "currentKing", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "DEV_FEE_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "DURATION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getGameInfo", "outputs": [{ "internalType": "address", "name": "_currentKing", "type": "address" }, { "internalType": "uint256", "name": "_currentDeposit", "type": "uint256" }, { "internalType": "uint256", "name": "_rewardPool", "type": "uint256" }, { "internalType": "uint256", "name": "_rolloverAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_remainingTime", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getRemainingTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "minDeposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "rewardPool", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "ROLLOVER_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "rolloverAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "usd1", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }
];

// --- 헬퍼 함수 및 아이콘 ---
const parseErrorMessage = (error) => {
    const message = error.reason || error.message || error?.data?.message || "An unknown error occurred.";
    if (message.includes("user rejected transaction")) return "요청을 거부하셨습니다.";
    if (message.includes("Deposit must be higher")) return "현재 킹의 입금액보다 더 많아야 합니다.";
    if (message.includes("Only the current king can")) return "오직 현재 킹만 이 행동을 할 수 있습니다.";
    if (message.includes("The king's reign is not over")) return "아직 왕의 재위 기간이 끝나지 않았습니다.";
    if (message.includes("insufficient funds")) return "지갑의 잔액이 부족합니다.";
    if (message.includes("Reign ended, king must claim first")) return "이전 왕의 재위 기간이 종료되었습니다. 보상 수령이 먼저 진행되어야 합니다.";
    if (message.includes("Must add at least 5%")) return "최소 5% 이상 추가 입금해야 합니다.";
    return "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
};
const formatTime = (seconds) => {
    if (seconds === undefined || seconds < 0) return "00:00:00";
    if (seconds === 0) return "수령 가능!";
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const IconCrown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;

// --- 메인 앱 컴포넌트 ---
export default function App() {
    const [contract, setContract] = useState(null);
    const [usd1Decimals, setUsd1Decimals] = useState(18);

    const [gameInfo, setGameInfo] = useState({
        currentKing: ethers.constants.AddressZero,
        currentDeposit: "0.0",
        rewardPool: "0.0",
        rolloverAmount: "0.0",
        remainingTime: 0,
        lastSyncTime: Date.now()
    });
    const [txStatus, setTxStatus] = useState({ message: "", type: "" });
    const [amount, setAmount] = useState("");
    const [displayTime, setDisplayTime] = useState(0);

    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    const readOnlyContract = useMemo(() => {
        if (!CONTRACT_ADDRESS) return null;
        const provider = new ethers.providers.JsonRpcProvider(bscTestnet.rpcUrl);
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    }, []);

    useEffect(() => {
        if (isConnected && walletProvider && address) {
            const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
            const ethersSigner = ethersProvider.getSigner();
            const ethersContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersSigner);
            setContract(ethersContract);
        } else {
            setContract(null);
        }
    }, [isConnected, walletProvider, address]);

    const updateGameInfo = useCallback(async () => {
        const contractToUse = contract || readOnlyContract;
        if (!contractToUse) return;
        try {
            const info = await contractToUse.getGameInfo();
            if (usd1Decimals === 18 && contractToUse.provider) { 
                const usd1Address = await contractToUse.usd1();
                const usd1Contract = new ethers.Contract(usd1Address, ["function decimals() view returns (uint8)"], contractToUse.provider);
                const decimals = await usd1Contract.decimals();
                setUsd1Decimals(decimals);
            }

            setGameInfo({
                currentKing: info._currentKing,
                currentDeposit: ethers.utils.formatUnits(info._currentDeposit, usd1Decimals),
                rewardPool: ethers.utils.formatUnits(info._rewardPool, usd1Decimals),
                rolloverAmount: ethers.utils.formatUnits(info._rolloverAmount, usd1Decimals),
                remainingTime: Number(info._remainingTime),
                lastSyncTime: Date.now()
            });
        } catch (error) {
            console.error("게임 정보 업데이트 실패:", error);
        }
    }, [contract, readOnlyContract, usd1Decimals]);

    useEffect(() => {
        updateGameInfo();
    }, [updateGameInfo]);
    
    useEffect(() => {
        if (contract) {
            const updateListener = () => setTimeout(updateGameInfo, 1000); 
            contract.on("NewKing", updateListener);
            contract.on("DepositAdded", updateListener);
            contract.on("RewardClaimed", updateListener);
            return () => {
                contract.off("NewKing", updateListener);
                contract.off("DepositAdded", updateListener);
                contract.off("RewardClaimed", updateListener);
            };
        }
    }, [contract, updateGameInfo]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (gameInfo.currentKing !== ethers.constants.AddressZero) {
                const timeSinceLastSync = Math.floor((Date.now() - gameInfo.lastSyncTime) / 1000);
                const newDisplayTime = Math.max(0, gameInfo.remainingTime - timeSinceLastSync);
                setDisplayTime(newDisplayTime);
            } else {
                setDisplayTime(0);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [gameInfo]);

    const handleTransaction = async (action) => {
        if (!isConnected || !walletProvider) {
            setTxStatus({ message: "지갑이 연결되지 않았습니다.", type: "error" }); return;
        }
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        const signer = ethersProvider.getSigner();
        const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        setTxStatus({ message: "트랜잭션을 준비 중입니다...", type: "info" });
        try {
            if (action === "becomeKing" || action === "addDeposit") {
                if (!amount || isNaN(amount) || Number(amount) <= 0) {
                    throw new Error("유효한 입금 수량을 입력해주세요.");
                }
                const parsedAmount = ethers.utils.parseUnits(amount, usd1Decimals);
                const usd1Address = await contractWithSigner.usd1();
                const usd1Contract = new ethers.Contract(usd1Address, ["function balanceOf(address) view returns (uint256)", "function allowance(address, address) view returns (uint256)", "function approve(address, uint256) returns (bool)"], signer);

                const userBalance = await usd1Contract.balanceOf(address);
                if (userBalance.lt(parsedAmount)) {
                    throw new Error("USD1 잔액이 부족합니다.");
                }

                const currentAllowance = await usd1Contract.allowance(address, contractWithSigner.address);
                if (currentAllowance.lt(parsedAmount)) {
                    setTxStatus({ message: "USD1 토큰 사용을 승인해주세요...", type: "info" });
                    const approveTx = await usd1Contract.approve(contractWithSigner.address, parsedAmount);
                    await approveTx.wait();
                }

                setTxStatus({ message: "왕좌에 도전하는 중입니다...", type: "info" });
                const tx = action === "becomeKing" ? await contractWithSigner.becomeKing(parsedAmount) : await contractWithSigner.addDeposit(parsedAmount);
                await tx.wait();
                setTxStatus({ message: "성공! 새로운 역사가 시작됩니다.", type: "success" });
            } else if (action === "claimReward") {
                setTxStatus({ message: "보상 수령을 요청하는 중입니다...", type: "info" });
                const tx = await contractWithSigner.claimReward();
                await tx.wait();
                setTxStatus({ message: "성공! 보상이 올바르게 지급되었습니다.", type: "success" });
            }
            setAmount("");
            await updateGameInfo();
        } catch (error) {
            console.error(error);
            setTxStatus({ message: parseErrorMessage(error), type: "error" });
        }
    };
    
    const isKing = useMemo(() => address && gameInfo.currentKing.toLowerCase() === address.toLowerCase(), [address, gameInfo.currentKing]);
    const isGameActive = useMemo(() => gameInfo.currentKing !== ethers.constants.AddressZero, [gameInfo.currentKing]);
    const roundNeedsReset = useMemo(() => displayTime === 0 && isGameActive, [displayTime, isGameActive]);

    return (
        <>
            <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="flex justify-between items-center mb-10">
                        <div className="text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">King of the Hill</h1>
                            <p className="text-md text-gray-300">최후의 1인이 모든 것을 차지합니다.</p>
                        </div>
                        <w3m-button />
                    </header>
                    
                    {!isConnected ? (
                        <div className="text-center bg-gray-800 p-10 rounded-xl">
                            <h2 className="text-2xl font-bold mb-4">게임에 참여하려면 지갑을 연결하세요</h2>
                            <p className="text-gray-400">우측 상단의 버튼을 눌러 시작할 수 있습니다.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <h2 className="text-sm font-bold text-yellow-400 mb-2 flex items-center gap-2"><IconCrown /> 현재 킹</h2>
                                    <p className="text-lg font-mono break-all" title={gameInfo.currentKing}>{gameInfo.currentKing === ethers.constants.AddressZero ? "없음" : `${gameInfo.currentKing.substring(0, 6)}...${gameInfo.currentKing.substring(38)}`}</p>
                                    <p className="text-2xl font-bold mt-2">{gameInfo.currentDeposit} <span className="text-sm text-gray-400">USD1</span></p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <h2 className="text-sm font-bold text-yellow-400 mb-2 flex items-center gap-2"><IconTrophy /> 총 보상 풀</h2>
                                    <p className="text-4xl font-bold text-green-400">{gameInfo.rewardPool}</p>
                                    <p className="text-sm text-gray-400 mt-1">다음 라운드 이월금: {gameInfo.rolloverAmount} USD1</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                    <h2 className="text-sm font-bold text-yellow-400 mb-2">남은 시간</h2>
                                    {isGameActive ? (
                                        <p className="text-4xl font-bold font-mono">{formatTime(displayTime)}</p>
                                    ) : (
                                        <p className="text-2xl font-bold text-gray-400 pt-2">게임 시작 대기 중</p>
                                    )}
                                    <button 
                                        onClick={() => handleTransaction("claimReward")}
                                        disabled={!roundNeedsReset}
                                        className="w-full mt-2 py-2 px-4 text-sm font-bold rounded-lg transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white"
                                    >
                                        라운드 종료 및 보상 분배
                                    </button>
                                </div>
                            </div>
                            
                            {roundNeedsReset ? (
                                <div className="bg-blue-500/20 text-blue-300 p-6 rounded-xl shadow-lg text-center">
                                    <h2 className="text-2xl font-bold mb-2">이전 라운드 종료됨</h2>
                                    <p>새로운 라운드를 시작하려면 누구나 '라운드 종료 및 보상 분배' 버튼을 누를 수 있습니다.</p>
                                </div>
                            ) : (
                                <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold mb-4">{isKing ? "👑 왕좌 방어하기" : "⚔️ 왕좌에 도전하기"}</h2>
                                    <p className="text-gray-400 mb-6">{isKing ? "추가 입금을 통해 왕좌를 굳건히 하고 타이머를 초기화하세요." : "현재 킹보다 더 많은 금액을 입금하여 새로운 역사를 만드세요."}</p>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <input
                                            type="number"
                                            placeholder="입금할 USD1 수량"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full sm:w-auto flex-grow bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <button
                                            onClick={() => handleTransaction(isKing ? "addDeposit" : "becomeKing")}
                                            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                                        >
                                            {isKing ? "추가 입금" : "왕좌 차지하기"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {txStatus.message && (
                                <div className={`mt-6 p-4 rounded-lg text-center ${
                                    txStatus.type === 'success' ? 'bg-green-500/20 text-green-400' :
                                    txStatus.type === 'error' ? 'bg-red-500/20 text-red-400' :
                                    'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {txStatus.message}
                                </div>
                            )}
                            <div className="text-center mt-10 p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
                                <p className="font-bold text-red-400">⚠️ 경고 (WARNING)</p>
                                <p className="text-sm text-gray-300 mt-2">
                                    이 DApp은 감사를 받지 않은 실험적인 프로젝트입니다. 참여로 인해 발생하는 모든 금전적 손실의 책임은 전적으로 본인에게 있습니다. 재미를 위한 소액으로만 참여하시기 바랍니다.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}