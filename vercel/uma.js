// createContractInstance.js
const ethers = require('ethers');

module.exports = async (req, res) => {
  const { contractAddress, privateKey, providerUrl } = req.body;

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  
  const functionSignature = 'function assertTruthWithDefaults(bytes calldata claim, address asserter) external returns (bytes32)';
  const iface = new ethers.utils.Interface([functionSignature]);

  const contract = new ethers.Contract(contractAddress, iface, wallet);

  res.status(200).json({ contract });
};

// getData.js

const createContractInstance = require('./createContractInstance');

module.exports = async (req, res) => {
  const { provider, contractAddress, assertionId } = req.body;

  try {
    const contract = createContractInstance(contractAddress, provider);
    const data = await contract.getData(assertionId);

    res.status(200).json(data);
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    res.status(500).json({ message: `Failed to fetch data: ${error}` });
  }
};

// assertTruth.js
const createContractInstance = require('./createContractInstance');

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

// assertionResolvedCallback.js

const createContractInstance = require('./createContractInstance');

module.exports = async (req, res) => {
  const { signer, contractAddress, assertionId, assertedTruthfully } = req.body;

  try {
    const contract = createContractInstance(contractAddress, signer);
    const transaction = await contract.assertionResolvedCallback(assertionId, assertedTruthfully);
    const receipt = await transaction.wait();

    res.status(200).json(receipt.events ? receipt.events : []);
  } catch (error) {
    console.error(`Failed to resolve assertion: ${error}`);
    res.status(500).json({ message: `Failed to resolve assertion: ${error}` });
  }
};

// assertionDisputedCallback.js

const createContractInstance = require('./createContractInstance');

module.exports = async (req, res) => {
  const { signer, contractAddress, assertionId } = req.body;

  try {
    const contract = createContractInstance(contractAddress, signer);
    const transaction = await contract.assertionDisputedCallback(assertionId);
    const receipt = await transaction.wait();

    res.status(200).json(receipt.events ? receipt.events : []);
  } catch (error) {
    console.error(`Failed to dispute assertion: ${error}`);
    res.status(500).json({ message: `Failed to dispute assertion: ${error}` });
  }
};
