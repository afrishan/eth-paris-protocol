const ethers = require('ethers');

// const createContractInstance = (contractAddress, providerOrSigner) => {
//   return new ethers.Contract(contractAddress, abi, providerOrSigner);
// };

const createContractInstance = (contractAddress="0x6D865795C1Cf73ef8CD5bE685B06e896A73A25eB", privateKey=process.env.PRIVATE_KEY, providerUrl="https://eth-goerli.g.alchemy.com/v2/b2d3ZxjLwwS0SdoF7bcwNnkmRzfR2BXh") => {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const functionSignature = 'function assertTruthWithDefaults(bytes calldata claim, address asserter) external returns (bytes32)';
    const iface = new ethers.utils.Interface([functionSignature]);
    return new ethers.Contract(contractAddress, iface, wallet);
  };

const getData = async (provider="https://eth-goerli.g.alchemy.com/v2/b2d3ZxjLwwS0SdoF7bcwNnkmRzfR2BXh", contractAddress="0x6D865795C1Cf73ef8CD5bE685B06e896A73A25eB", assertionId) => {
    try {
        const contract = createContractInstance(contractAddress, provider);
        return await contract.getData(assertionId);
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
};

const assertTruth = async (data=ethers.utils.formatBytes32String("I pay my employees fairly 1"), asserter="0x2Db84F933bFd5b101fc6Eaaa850d6C0596A484B2") => {
    try {
      const contract = createContractInstance();
      const transaction = await contract.assertTruthWithDefaults(data, asserter, {
        gasLimit: "2000000",
        gasPrice: "2000000000"
      });
      const receipt = await transaction.wait();
  
      const AssertionId = receipt.events[2].topics[0];
      return AssertionId;
      
    } catch (error) {
      console.error(`Failed to assert data: ${error}`);
      throw error;  // Re-throw the error after logging it
    }
  };

const assertionResolvedCallback = async (signer, contractAddress, assertionId, assertedTruthfully) => {
    try {
        const contract = createContractInstance(contractAddress, signer);
        const transaction = await contract.assertionResolvedCallback(assertionId, assertedTruthfully);
        const receipt = await transaction.wait();
        return receipt.events ? receipt.events : [];
    } catch (error) {
        console.error(`Failed to resolve assertion: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
};

const assertionDisputedCallback = async (signer, contractAddress, assertionId) => {
    try {
        const contract = createContractInstance(contractAddress, signer);
        const transaction = await contract.assertionDisputedCallback(assertionId);
        const receipt = await transaction.wait();
        return receipt.events ? receipt.events : [];
    } catch (error) {
        console.error(`Failed to dispute assertion: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
};

(async function() {await assertTruth()})()