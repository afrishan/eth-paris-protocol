const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // this will load environment variables from a .env file into process.env

const DID = "did:polygonid:polygon:mumbai:2qH6jB3zwCssVqKc6435tssPk9qcm9KZ1cc5YTYic4"
const axiosHeaders = {
    headers: {
      'DOCK-API-TOKEN': process.env.PRIVATE_KEY
    },
  };

const baseUrl = 'https://api-testnet.dock.io'; //Replace with your actual base URL

const issueDid = async () => {
    const polygonDidBody = {
        keyType: 'bjj',
        type: 'polygonid'
    };
    const didResp = await axios.post(`${baseUrl}/dids`, polygonDidBody, axiosHeaders);
    console.log(didResp)
    return didResp;
};

const createProfile = async (did) => {
    const reqBody = {
        "name": "My Test Polygon ID DID",
        "did": did,
        "description": "Testing out the Issuer Profiles api"
    };
    return await axios.post(`${baseUrl}/profiles`, reqBody, axiosHeaders);
};

const issueClaim = async (did, UserID) => {
    const requestBody = {
        schema: 'https://api.jsonbin.io/v3/qs/64bc55f98e4aa6225ec1fb4d',
        claims: [ 'id' ],
        credentialOptions: {
            anchor: false,
            persist: false,
            emailMessage: '',
            credential: {
                schema: 'https://api.jsonbin.io/v3/qs/64bc55f98e4aa6225ec1fb4d',
                issuer: did,
                name: 'UID',
                type: [ "VerifiableCredential" ],
                subject: {
                    UID: UserID,
                }
            },
            distribute: true
        }
    };

    const claim = await axios.post(`${baseUrl}/credentials/request-claims`, requestBody, axiosHeaders);
    console.log(claim.data)
    return claim
};


export { issueClaim, issueDid, createProfile, DID }

// console.log(issueClaim(DID, "x2"))
// console.log(issueDid())