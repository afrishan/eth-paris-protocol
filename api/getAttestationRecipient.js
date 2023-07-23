const { EAS } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');
const provider = process.env.PROVIDER_URL;
const EASContract = process.env.EAS_CONTRACT_ADDRESS;

// getAttestationRecipient.js

module.exports = async (req, res) => {
    const uid = req.query.uid;
    const providerUrl = req.query.providerUrl || provider;
    const EASContractAddress = req.query.EASContractAddress || EASContract;

    try {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const eas = new EAS(EASContractAddress);
        eas.connect(provider);

        const attestation = await eas.getAttestation(uid);
        if (!attestation) {
            throw new Error(`No attestation found for uid: ${uid}`);
        }
        res.status(200).json(attestation.recipient);
    } catch(error) {
        console.error(`Failed to get attestation recipient: ${error}`);
        res.status(500).send(`Failed to get attestation recipient: ${error}`);
    }
}