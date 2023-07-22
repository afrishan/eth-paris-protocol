const { EAS, SchemaEncoder, SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');

const provider= "https://eth-sepolia.public.blastapi.io"
const EASContract = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"
const privateKey = "0x1a87834cd2f80898b07ec6207d3b55fbafda432c95c65764f5da972fda1c3bec"

const getAttestation = async (uid, providerUrl = provider, EASContractAddress = EASContract) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const eas = new EAS(EASContractAddress);
        eas.connect(provider);
        return await eas.getAttestation(uid);
    } catch(error) {
        console.error(`Failed to get attestation: ${error}`);
    }
}

const getAttestationRecipient = async (uid, providerUrl = provider, EASContractAddress = EASContract) => {
    try {
        const attestation = await getAttestation(uid, providerUrl, EASContractAddress);
        if (!attestation) {
            throw new Error(`No attestation found for uid: ${uid}`);
        }
        return attestation.recipient;
    } catch(error) {
        console.error(`Failed to get attestation recipient: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
}

const getAttester = async (uid, providerUrl = provider, EASContractAddress = EASContract) => {
    try {
        const attestation = await getAttestation(uid, providerUrl, EASContractAddress);
        if (!attestation) {
            throw new Error(`No attestation found for uid: ${uid}`);
        }
        return attestation.attester;
    } catch(error) {
        console.error(`Failed to get attestation recipient: ${error}`);
        throw error;  // Re-throw the error after logging it
    }
}

const createOnchainAttestation = async (signerUrl, schema = "string ReviewTitle,string TimeAtCompany,uint8 YearsOfExperience,uint32 Salary,bool Bonus,string SummaryOfExperience", schemaUID = "0x4afe77c8ec03225280bfb1ceeab33d68e4d1504e0b23272960cc0485f8a18e1b", recipient_, EASContractAddress) => {
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

        // const receipt = await tx.tx.wait()

        // console.log('receipt', receipt)
        const newAttestationUID = await tx.wait();

        console.log("uid",newAttestationUID)
        return newAttestationUID;
    } catch(error) {
        console.error(`Failed to create onchain attestation: ${error}`);
    }
}


(async function() {
    // Define schema and related variables
    const schema = "string ReviewTitle,string TimeAtCompany,uint8 YearsOfExperience,uint32 Salary,bool Bonus,string SummaryOfExperience";  // Replace with actual schema
    const recipient = "0x2Db84F933bFd5b101fc6Eaaa850d6C0596A484B2";  // Replace with actual recipient address
    const schemaID = "0x4afe77c8ec03225280bfb1ceeab33d68e4d1504e0b23272960cc0485f8a18e1b"

    // Create an on-chain attestation
    const attestationUID = await createOnchainAttestation(provider, schema, schemaID, recipient, EASContract);
    console.log(`Created attestation with uid: ${attestationUID}`);

    // // // Retrieve attestation details
    const attestation = await getAttestation(attestationUID, provider, EASContract);
    console.log(`Retrieved attestation: ${attestation}`);

    // // // // Retrieve attestation recipient
    const attestationRecipient = await getAttestationRecipient(attestationUID, provider, EASContract);
    console.log(`Retrieved attestation recipient: ${attestationRecipient}`);

    // // // // Retrieve attester
    const attester = await getAttester(attestationUID, provider, EASContract);
    console.log(`Retrieved attester: ${attester}`);

})().catch(console.error);
