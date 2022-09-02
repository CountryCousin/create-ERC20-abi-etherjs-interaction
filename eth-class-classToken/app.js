import abi from "./abi.js";
import openTab from "./tab.js";
const { ethers: etherjs } = ethers;

const rpcUrl = "https://goerli.infura.io/v3/ba80361523fe423bb149026a490266f0"; // where did he get this from
const signerProvider = new etherjs.providers.Web3Provider(window.ethereum);

const provider = new etherjs.providers.JsonRpcProvider(rpcUrl);

const signer = signerProvider.getSigner(); // why didn't we pass an argument here; are we just aiming for the first signer??
const tokenAddress = "0xC770d227Eb937D7D3A327e68180772571C24525F"; // did he create a coin with this address

const useContract = async (address, abi, isSigner = false) => {
  const providerSigner = new etherjs.providers.Web3Provider(window.ethereum);
  const signer = providerSigner.getSigner();
  const provider = new etherjs.providers.JsonRpcProvider(rpcUrl);
  const newProvider = isSigner ? signer : provider;
  return new ethers.Contract(address, abi, newProvider);
};

// view functions
// new ethers.Contract(address, abi, provider)

//state  mutating functions
// new ethers.Contract(address, abi, signer)

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
  await getUserWallet();
};

const getUserWallet = async () => {
  let userAddress = await signer.getAddress(); // is getAddress() a method under signer...
  //   connectedWallet = userAddress;
  updateUserAddress(userAddress);
  //   console.log(connectedWallet, "connected wallet");
};

// export default {
//   openTab, //whats the use of this??
// };

// elements
// const button = document.getElementById("connectBtn");
// const userAddress = document.getElementById("userAddress");

// Event Listeners

connectBtn.addEventListener("click", connectWallet);

function updateUserAddress(address) {
  userAddress.innerText = address;
}

function tokenTemplateUpdate(name, symbol, totalSupply) {
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

async function getTokenDetails() {
  loader.innerText = "Loading..."; // where is "loader" coming from
  const token = await useContract(tokenAddress, abi);
  try {
    const [name, symbol, totalSupply] = await Promise.all([
      token.name(),
      token.symbol(),
      token.totalSupply(),
    ]);
    return { name, symbol, totalSupply: Number(totalSupply) };
  } catch (error) {
    errored.innerText = "Error Occurred!";
    console.log("error occurred", error);
  } finally {
    loader.innerText = "";
  }
}

async function InitData() {
  const { name, symbol, totalSupply } = await getTokenDetails();
  const template = tokenTemplateUpdate(name, symbol, totalSupply);
  token.innerHTML = template;
}

InitData();

// tokenDetails();
