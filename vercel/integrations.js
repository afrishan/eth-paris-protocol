const axios = require('axios');

const createOnchainAttestation = async (signerUrl, recipient) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/createOnchainAttestation', {
            signerUrl,
            recipient
        });
        return res.data;
    } catch (err) {
        console.error('Error in On-chain Attestation:', err);
    }
};

const getAttestation = async (uid) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/getAttestation', {
            uid
        });
        return res.data;
    } catch (err) {
        console.error('Error in Getting Attestation:', err);
    }
};

const getAttestationRecipient = async (uid) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/getAttestationRecipient', {
            uid
        });
        return res.data;
    } catch (err) {
        console.error('Error in Getting Attestation Recipient:', err);
    }
};

const getAttester = async (uid) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/getAttester', {
            uid
        });
        return res.data;
    } catch (err) {
        console.error('Error in Getting Attester:', err);
    }
};

const issueDid = async () => {
    try {
        const res = await axios.get('https://myproject.vercel.app/api/issueDid');
        return res.data;
    } catch (err) {
        console.error('Error in Issuing DID:', err);
    }
};

const createProfile = async (did) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/createProfile', {
            did
        });
        return res.data;
    } catch (err) {
        console.error('Error in Creating Profile:', err);
    }
};

const issueClaim = async (did, UserID) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/issueClaim', {
            did,
            UserID
        });
        return res.data;
    } catch (err) {
        console.error('Error in Issuing Claim:', err);
    }
};

const assertTruth = async (data, asserter) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/assertTruth', {
            data,
            asserter
        });
        return res.data;
    } catch (err) {
        console.error('Error in Asserting Truth:', err);
    }
};

const getData = async (assertionId) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/getData', {
            assertionId
        });
        return res.data;
    } catch (err) {
        console.error('Error in Getting Data:', err);
    }
};

const assertionResolvedCallback = async (signer, assertionId, assertedTruthfully) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/assertionResolvedCallback', {
            signer,
            assertionId,
            assertedTruthfully
        });
        return res.data;
    } catch (err) {
        console.error('Error in Asserting Resolved Callback:', err);
    }
};

const assertionDisputedCallback = async (signer, assertionId) => {
    try {
        const res = await axios.post('https://myproject.vercel.app/api/assertionDisputedCallback', {
            signer,
            assertionId
        });
        return res.data;
    } catch (err) {
        console.error('Error in Asserting Disputed Callback:', err);
    }
};

module.exports = {
    createOnchainAttestation,
    getAttestation,
    getAttestationRecipient,
    getAttester,
    issueDid,
    createProfile,
    issueClaim,
    assertTruth,
    getData,
    assertionResolvedCallback,
    assertionDisputedCallback
};
