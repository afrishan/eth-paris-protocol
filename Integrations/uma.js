import { ethers } from 'ethers';
import abi from './YourContractABI.json';

const createContractInstance = (contractAddress, providerOrSigner) => {
  return new ethers.Contract(contractAddress, abi, providerOrSigner);
};

export const getData = async (provider, contractAddress, assertionId) => {
    try {
        const contract = createContractInstance(contractAddress, provider);
        return await contract.getData(assertionId);
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
};

export const assertDataFor = async (signer, contractAddress, dataId, data, asserter) => {
    try {
      const contract = createContractInstance(contractAddress, signer);
      const transaction = await contract.assertDataFor(dataId, data, asserter);
      const receipt = await transaction.wait();
  
      const dataAssertedEvent = receipt.events?.find(e => e.event === 'DataAsserted');
      
      if (dataAssertedEvent && dataAssertedEvent.args) {
        return {
          dataId: dataAssertedEvent.args.dataId,
          data: dataAssertedEvent.args.data,
          asserter: dataAssertedEvent.args.asserter,
          assertionId: dataAssertedEvent.args.assertionId,
        };
      } else {
        throw new Error(`No 'DataAsserted' event found in the transaction receipt`);
      }
    } catch (error) {
      console.error(`Failed to assert data: ${error}`);
      throw error;  // Re-throw the error after logging it
    }
  };

export const assertionResolvedCallback = async (signer, contractAddress, assertionId, assertedTruthfully) => {
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

export const assertionDisputedCallback = async (signer, contractAddress, assertionId) => {
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