const Web3 = require('web3');

class Web3Tools {
    /**
     * Initializes the Web3Tools instance with the specified provider URL and timeout.
     * @param {string} providerUrl - The URL of the Ethereum node provider.
     * @param {number} [timeout=10000] - Timeout value for requests to the provider (in milliseconds).
     */
    constructor(providerUrl, timeout = 10000) {
        // Create a new Web3 instance with the provided provider URL and timeout
        this._web3 = new Web3(providerUrl, { timeout });
    }

    /**
     * Fetches the transaction receipt by transaction hash.
     * A transaction receipt contains information about the execution status and events emitted by a transaction.
     * @param {string} txHash - The hash of the transaction.
     * @returns {Promise<Object|null>} - A promise that resolves with the transaction receipt object or null if not found.
     */
    async fetchTransactionReceipt(txHash) {
        return this._web3.eth.getTransactionReceipt(txHash);
    }

    /**
     * Fetches block details by block number or hash.
     * A block contains a set of transactions and other metadata.
     * @param {number|string} blockNumber - The number or hash of the block.
     * @returns {Promise<Object|null>} - A promise that resolves with the block object or null if not found.
     */
    async fetchBlockDetails(blockNumber) {
        return this._web3.eth.getBlock(blockNumber);
    }

    /**
     * Estimates gas usage for a transaction object.
     * Gas is a unit of computation cost on the Ethereum network.
     * @param {Object} txObject - The transaction object.
     * @returns {Promise<number>} - A promise that resolves with the estimated gas value.
     */
    async estimateGasUsage(txObject) {
        return this._web3.eth.estimateGas(txObject);
    }

    /**
     * Fetches the current gas price.
     * Gas price determines the fee paid by the sender for a transaction to be included in a block.
     * @returns {Promise<string>} - A promise that resolves with the current gas price in wei.
     */
    async fetchGasPrice() {
        return this._web3.eth.getGasPrice();
    }

    /**
     * Fetches the list of user accounts available on the connected Ethereum node.
     * These accounts can be used to send transactions and interact with smart contracts.
     * @returns {Promise<Array<string>>} - A promise that resolves with an array of account addresses.
     */
    async fetchUserAccounts() {
        return this._web3.eth.getAccounts();
    }

    /**
     * Deploys a contract with the specified ABI, bytecode, sender address, and gas limit.
     * @param {Array<Object>} abi - The ABI (Application Binary Interface) of the contract.
     * @param {string} bytecode - The compiled bytecode of the contract.
     * @param {string} from - The address of the account deploying the contract.
     * @param {number} gas - The gas limit for contract deployment.
     * @returns {Promise<Object>} - A promise that resolves with the deployed contract instance.
     */
    async deployContract(abi, bytecode, from, gas) {
        const contract = new this._web3.eth.Contract(abi);
        const deployment = contract.deploy({ data: bytecode });
        return deployment.send({ from, gas });
    }

    /**
     * Fetches the network ID of the connected Ethereum network.
     * Network ID is a unique identifier for different Ethereum networks (e.g., mainnet, ropsten, rinkeby).
     * @returns {Promise<number>} - A promise that resolves with the network ID.
     */
    async fetchNetworkId() {
        return this._web3.eth.net.getId();
    }

    /**
     * Fetches the number of the latest block on the Ethereum blockchain.
     * @returns {Promise<number>} - A promise that resolves with the latest block number.
     */
    async fetchLatestBlockNumber() {
        return this._web3.eth.getBlockNumber();
    }

    /**
     * Fetches the number of transactions in a given block.
     * @param {number|string} blockNumber - The number or hash of the block.
     * @returns {Promise<number>} - A promise that resolves with the transaction count.
     */
    async fetchBlockTransactionCount(blockNumber) {
        return this._web3.eth.getBlockTransactionCount(blockNumber);
    }

    /**
     * Retrieves the balance of the specified Ethereum account.
     * @param {string} address - The address of the Ethereum account.
     * @returns {Promise<string>} - A promise that resolves with the account balance in wei.
     */
    async getBalance(address) {
        return this._web3.eth.getBalance(address);
    }

    /**
     * Retrieves the number of transactions sent from the specified Ethereum account.
     * @param {string} address - The address of the Ethereum account.
     * @returns {Promise<number>} - A promise that resolves with the transaction count.
     */
    async getTransactionCount(address) {
        return this._web3.eth.getTransactionCount(address);
    }

    /**
     * Retrieves the bytecode of the deployed smart contract at the specified address.
     * @param {string} address - The address of the deployed smart contract.
     * @returns {Promise<string>} - A promise that resolves with the bytecode of the contract.
     */
    async getCode(address) {
        return this._web3.eth.getCode(address);
    }

    /**
     * Retrieves the transaction details by transaction hash.
     * @param {string} txHash - The hash of the transaction.
     * @returns {Promise<Object|null>} - A promise that resolves with the transaction object or null if not found.
     */
    async getTransaction(txHash) {
        return this._web3.eth.getTransaction(txHash);
    }

    /**
     * Retrieves past logs that match the specified filter options.
     * Logs are generated by events emitted by smart contracts during transaction execution.
     * @param {Object} filterOptions - The filter options for logs.
     * @returns {Promise<Array<Object>>} - A promise that resolves with an array of log objects.
     */
    async getPastLogs(filterOptions) {
        return this._web3.eth.getPastLogs(filterOptions);
    }
}

module.exports = Web3Tools;
