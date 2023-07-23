const { EAS, SchemaEncoder } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');
const provider = process.env.PROVIDER_URL;
const EASContract = process.env.EAS_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

// getAttestation.js

module.exports = async (req, res) => {
    const uid = req.query.uid;
    const providerUrl = req.query.providerUrl || provider;
    const EASContractAddress = req.query.EASContractAddress || EASContract;

    try {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const eas = new EAS(EASContractAddress);
        eas.connect(provider);
        const attestation = await eas.getAttestation(uid);
        res.status(200).json(attestation);
    } catch(error) {
        console.error(`Failed to get attestation: ${error}`);
        res.status(500).send(`Failed to get attestation: ${error}`);
    }
}

// getAttestationRecipient.js

module.exports = async (req, res) => {
    const uid = req.query.uid;
    const providerUrl = req.query.providerUrl || provider;
    const EASContractAddress = req.query.EASContractAddress || EASContract;

    try {
        const attestation = await getAttestation(uid, providerUrl, EASContractAddress);
        if (!attestation) {
            throw new Error(`No attestation found for uid: ${uid}`);
        }
        res.status(200).json(attestation.recipient);
    } catch(error) {
        console.error(`Failed to get attestation recipient: ${error}`);
        res.status(500).send(`Failed to get attestation recipient: ${error}`);
    }
}

// getAttester.js

module.exports = async (req, res) => {
    const uid = req.query.uid;
    const providerUrl = req.query.providerUrl || provider;
    const EASContractAddress = req.query.EASContractAddress || EASContract;

    try {
        const attestation = await getAttestation(uid, providerUrl, EASContractAddress);
        if (!attestation) {
            throw new Error(`No attestation found for uid: ${uid}`);
        }
        res.status(200).json(attestation.attester);
    } catch(error) {
        console.error(`Failed to get attestation recipient: ${error}`);
        res.status(500).send(`Failed to get attestation recipient: ${error}`);
    }
}

// createOnchainAttestation.js

module.exports = async (req, res) => {
    const signerUrl = req.query.signerUrl;
    const schema = req.query.schema || "string ReviewTitle,string TimeAtCompany,uint8 YearsOfExperience,uint32 Salary,bool Bonus,string SummaryOfExperience";
    const schemaUID = req.query.schemaUID || "0x4afe77c8ec03225280bfb1ceeab33d68e4d1504e0b23272960cc0485f8a18e1b";
    const recipient_ = req.query.recipient_;
    const EASContractAddress = req.query.EASContractAddress;

    try {
        const signer = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(signerUrl));
        const eas = new EAS(EASContractAddress);
        eas.connect(signer);
        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
            { name: "ReviewTitle", value: "testTitle1", type: "string" },
            { name: "TimeAtCompany", value: "TestTime1", type: "string" },
            { name: "YearsOfExperience", value: 5, type: "uint8" },
            { name: "Salary", value: 100000, type: "uint32" },
            { name: "Bonus", value: false, type: "bool" },
            { name: "SummaryOfExperience", value: "TestExperience1", type: "string"},
        ]);
        const tx = await eas.attest({
            schema: schemaUID,
            data: {
                recipient: recipient_,
                expirationTime: 0,
                revocable: true,
                data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();

        res.status(200).json(newAttestationUID);
    } catch(error) {
        console.error(`Failed to create onchain attestation: ${error}`);
        res.status(500).send(`Failed to create onchain attestation: ${error}`);
    }
}
