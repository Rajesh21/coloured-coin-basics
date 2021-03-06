var bitcoin = require('bitcoinjs-lib');
var request = require('request');

var address = 'muuom1Fo1ZRtdCcdbMVpsP2mxT2tgaW9Ba';

var new_address='mxu7NscnVhugvLYVFbBPwUHpuaf2hJ5JgH';
//key = bitcoin.ECKey.makeRandom();
//new_address = key.pub.getAddress(bitcoin.networks.testnet).toString();

function postToApi(api_endpoint, json_data, callback) {
    console.log(api_endpoint+': ', JSON.stringify(json_data));
    request.post({
        url: 'http://testnet.api.coloredcoins.org:80/v2/'+api_endpoint,
        headers: {'Content-Type': 'application/json'},
        form: json_data
    }, 
    function (error, response, body) {
        if (error) {
            return callback(error);
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};

var asset = {
    'issueAddress': address,
    'amount': 123,
    'fee': 5000,
    'transfer':[{
        'address': new_address,
        'amount': 33
     }]
}

postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});
