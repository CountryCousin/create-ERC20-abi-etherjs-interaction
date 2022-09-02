// import { ethers } from "ethers";
import abi from "./abi.js";
import openTab from "./tab.js";
const { ethers: etherjs } = ethers;

const rpcUrl = "https://rinkeby.infura.io/v3/d565af461936455db6ccfa6fe26f3332"
const signerProvider = new ethers.providers.Web3Provider(window.ethereum)

const provider = new etherjs.providers.JsonRpcProvider(rpcUrl)

const signer = signerProvider.getSigner()
const tokenAddress = "0xCeffEeCF546791448e9a7b0d1BDA19eDd29658B0"

const useContract = async(address, abi, isSigner=false)=>{
    const signerProvider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = signerProvider.getSigner()
    const provider = new etherjs.providers.JsonRpcProvider(rpcUrl)
    const newProvider = isSigner ? signer : provider;
    return new ethers.Contract(address, abi, newProvider)
}

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
  await getUserWallet();
}

const getUserWallet = async ()=> {
    let userAddress = await signer.getAddress()
    updateUserAddress(userAddress)
}

connectBtn.addEventListener("click", connectWallet)

function updateUserAddress(address) {
    userAddress.innerText = address;
  }

function tokenTemplateUpdate(name, symbol, totalSupply){
    return `<div class="flex justify-between items-center">
    <div>
        <div class="flex items-center">
            <div class="p-2 token-thumbnail w-10 h-10"> 
                <img src="https://bafybeiekvvr4iu4bqxm6de5tzxa3yfwqptmsg3ixpjr4edk5rkp3ddadaq.ipfs.dweb.link/" alt="token-img" />  </div>
            <div>
                <p class="font-semibold">${name} - ${symbol} </p>
                <p>Total Supply:${totalSupply}</p>
            </div>
        </div>
    </div>
    <div>0.0</div>
</div>`;
}

async function getTokenDetails(){
    loader.innerText = "Loading...."
    const token = await useContract(tokenAddress, abi);

    try {
        const [name, symbol, totalSupply] = await Promise.all([
            token.name(),
            token.symbol(),
            token.totalSupply(),
        ]);
        return { name, symbol, totalSupply: Number(totalSupply) } ;
    
    } catch(error){
        errored.innerText = "Error Occurred!";
        console.log("error occurred", error);
    }finally{
        loader.innerText = "";
    }
} 

async function InitData() {
    const { name, symbol, totalSupply } = await getTokenDetails();
    const template = tokenTemplateUpdate(name, symbol, totalSupply);
    token.innerHTML = template;
  }

  
  
  InitData();





