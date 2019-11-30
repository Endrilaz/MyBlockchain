class TransactionMiner {
    constructor({ blockchain, trasactionPool, wallet, pubsub}) {
        this.blockchain = blockchain;
        this.trasactionPool = trasactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    
    mineTransactions() {
        // get the transaction pool's valid transactions

        // generate the miner's reward

        // add a block consisting of these transactions to the blockchain

        // brodcast the updated blockchain

        // clear the pool
    }
}

module.exports = TransactionMiner;