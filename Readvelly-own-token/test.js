
var Caver = require('caver-js')
var credential = require('../credential.json')

const accessKeyId = credential.accessKeyId
const secretAccessKey = credential.secretAccessKey

const option = {
  headers: [
    {name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')},
    {name: 'x-chain-id', value: 1001},
  ]
}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))

const deployer = caver.wallet.add(
    caver.wallet.keyring.createFromPrivateKey(credential.WalletPrivKey)
)
const kip17 = new caver.kct.kip17('0x09019b599EcEb3f1b75A887d37B6eFA36633465a')

// kip17.addMinter('0x09019b599EcEb3f1b75A887d37B6eFA36633465a', { from: deployer.address }).then(console.log)
console.log(deployer.address)
kip17.mintWithTokenURI('0x9DD52890C4Be9a2dEf182d8584C6bda68d737253', 123123, '', { from: deployer.address }).then(console.log)
