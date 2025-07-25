import { ethers } from "ethers";
import abi from "../abi/LongLiveABI.json";

const CONTRACT_ADDRESS = "0x15b50ec4ed379191600FB6B4281C0e072A519759";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  return { provider, signer, contract };
};
