const axios = require('axios');
const baseUrl = process.env.BASE_URL;
const axiosHeaders = {
    headers: {
        'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
    },
};

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