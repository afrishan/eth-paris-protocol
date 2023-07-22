require('dotenv').config();

const { execSync } = require('child_process');

const RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const command = `forge create --rpc-url ${RPC_URL} \
  --private-key ${PRIVATE_KEY} \
  --etherscan-api-key ${ETHERSCAN_API_KEY} \
  --verify \
  src/Counter.sol:Counter`;

execSync(command, { stdio: 'inherit' });
