const ethers = require('ethers');

const createContractInstance = (contractAddress=process.env.CONTRACT_ADDRESS_UMA, providerUrl=process.env.PROVIDER_GOERLI) => {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const functionSignature = 'function assertTruthWithDefaults(bytes calldata claim, address asserter) external returns (bytes32)';
    const iface = new ethers.utils.Interface([functionSignature]);
    return new ethers.Contract(contractAddress, iface, wallet);
};


module.exports = async (req, res) => {
    const { data, asserter } = req.body;
  
    try {
      const contract = createContractInstance();
      const transaction = await contract.assertTruthWithDefaults(data, asserter, {
        gasLimit: "2000000",
        gasPrice: "2000000000"
      });
      const receipt = await transaction.wait();
  
      const AssertionId = receipt.events[2].topics[0];
  
      res.status(200).json(AssertionId);
    } catch (error) {
      console.error(`Failed to assert data: ${error}`);
      res.status(500).json({ message: `Failed to assert data: ${error}` });
    }
  };
