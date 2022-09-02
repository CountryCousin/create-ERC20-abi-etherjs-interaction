### Use the provider to display token details

### Determine to use provider or signer, for readonly provider

### Contract Instance takes in , "contract address, abi, provider or signer"

### To view contract details - ContractInstance.FunctionName(args)

for example
function nameOfOwner() public view returns(address) {return OwnerAddress}

const nameOfOwner = await ContractInstance.nameOfOwner()

### UI Updates

- Set the tokenTemplate as a function to receive dynamic data - tokenTemplate
- Create a function to get the data from the blockchain - getTokenDetails
- Create a global init Function to set the result of getTokenDetails function to the tokenTemplate;
- Set the innerHTML of tokensDetails(inside html file) to the result of tokenTemplate
