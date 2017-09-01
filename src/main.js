require('dotenv').config({path: './environment.env'})

const getAccountTransactions = require('./getAccountTransactions')
const _ = require('lodash');

const ethPrice = 394.45;

const getTotalIncomeWei = (txs) =>{
    let all_incoming = _.filter(txs, (tx) => {
        return tx.to == '0xed81c9058c78e28886e5411a2d55b42eb515f6e0'
    })
    return _.sumBy(all_incoming, 'value')
}

const load = async () =>{
    let res = await getAccountTransactions('0xed81c9058c78e28886e5411a2d55b42eb515f6e0')
    let txs = res.result
    txs = _.map(txs, (tx) =>{
        // this is breaking precision!!!!
        tx.value = parseInt(tx.value);
        return tx
    })
    let income = getTotalIncomeWei(txs)
    let total_eth = income / 1000000000000000000
    total_eth -= 0.05
    // console.log(total_eth)
    let approx_usd = ethPrice * total_eth;
    console.log('Total USD: $' + approx_usd);
}

load();