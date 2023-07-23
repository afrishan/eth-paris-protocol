const axios = require('axios');
const baseUrl = process.env.BASE_URL;
const axiosHeaders = {
    headers: {
        'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
    },
};

// issueDid.js
module.exports = async (req, res) => {
    const polygonDidBody = {
        keyType: 'bjj',
        type: 'polygonid'
    };

    try {
        const didResp = await axios.post(`${baseUrl}/dids`, polygonDidBody, axiosHeaders);
        res.status(200).json(didResp.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to issue DID: ${error}`);
    }
}

// createProfile.js

module.exports = async (req, res) => {
    const did = req.query.did;
    const reqBody = {
        "name": "My Test Polygon ID DID",
        "did": did,
        "description": "Testing out the Issuer Profiles api"
    };

    try {
        const profile = await axios.post(`${baseUrl}/profiles`, reqBody, axiosHeaders);
        res.status(200).json(profile.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to create profile: ${error}`);
    }
}

// issueClaim.js

module.exports = async (req, res) => {
    const did = req.query.did;
    const UserID = req.query.UserID;

    const requestBody = {
        schema: 'https://api.jsonbin.io/v3/qs/64bc55f98e4aa6225ec1fb4d',
        claims: ['id'],
        credentialOptions: {
            anchor: false,
            persist: false,
            emailMessage: '',
            credential: {
                schema: 'https://api.jsonbin.io/v3/qs/64bc55f98e4aa6225ec1fb4d',
                issuer: did,
                name: 'UID',
                type: ["VerifiableCredential"],
                subject: {
                    UID: UserID,
                }
            },
            distribute: true
        }
    };

    try {
        const claim = await axios.post(`${baseUrl}/credentials/request-claims`, requestBody, axiosHeaders);
        res.status(200).json(claim.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to issue claim: ${error}`);
    }
}
