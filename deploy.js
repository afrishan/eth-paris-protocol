require('dotenv').config();

const { execSync } = require('child_process');

const RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

let command;

command = `forge create --rpc-url ${RPC_URL} \
  --constructor-args "0xd7689d36e3813e9f11f8c3ddcc695737"\
  --private-key ${PRIVATE_KEY} \
  --etherscan-api-key ${ETHERSCAN_API_KEY} \
  --verify \
  src/ParityProtocol.sol:ParityProtocol`;

execSync(command, { stdio: 'inherit' });