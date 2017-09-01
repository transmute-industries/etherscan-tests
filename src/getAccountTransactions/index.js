
var rp = require('request-promise');

module.exports = getAccountTransactions = (address) => {

    return rp({
        uri: 'http://api.etherscan.io/api',
        qs: {
            "module": "account",
            "action": "txlist",
            "address": address,
            "startblock": "0",
            "endblock": "99999999",
            "sort": "asc",
            "apikey": "YourApiKeyToken"
        },
        headers: {
            'User-Agent': 'Transmute Scanner'
        },
        json: true // Automatically parses the JSON string in the response
    })

}