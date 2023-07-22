const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // this will load environment variables from a .env file into process.env


const axiosHeaders = {
    headers: {
      'DOCK-API-TOKEN': "eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiI5NDczIiwiaWF0IjoxNjkwMDQxNjUxLCJleHAiOjQ3NjkzMzc2NTF9.UN1tVxAWNqJj-ATELwJAHeHTWxx9MoMI4g-OIeU3u7zSAkdqpWNs05K5JPlrHnlGddDjm6_CvXS13ormNFJ17g"
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


console.log(issueClaim("did:polygonid:polygon:mumbai:2qH6jB3zwCssVqKc6435tssPk9qcm9KZ1cc5YTYic4", "x2"))
// console.log(issueDid())