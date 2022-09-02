// https://github.com/Uniswap/token-lists/blob/main/test/schema/example.tokenlist.json
export default list = {
  name: "My Token List",

  tokens: [
    {
      chainId: 1,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      logoURI:
        "https://bafybeiekvvr4iu4bqxm6de5tzxa3yfwqptmsg3ixpjr4edk5rkp3ddadaq.ipfs.dweb.link/",
      tags: ["stablecoin"],
    },
    {
      chainId: 1,
      address: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
      symbol: "cUSDC",
      name: "Compound USD Coin",
      decimals: 8,
      logoURI:
        "https://bafybeic2tvsrvsvyx4inv6svpnlunw7cncugllbnqmy3c5yugvcprsekju.ipfs.dweb.link/",
      tags: ["compound"],
    },
  ],
};
