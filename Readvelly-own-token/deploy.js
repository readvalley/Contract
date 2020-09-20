
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

async function createToken(){
const deployer = caver.wallet.add(
    caver.wallet.keyring.createFromPrivateKey(config.WalletPrivKey)
)

const kip17 = await caver.kct.kip17.deploy(
    {
        name: 'Readvelly-Own-Token',
        symbol: 'ROT', 
    },
    deployer.address
)
console.log(`Deployed KIP-17 token contract address: ${kip17.options.address}`)

console.log(`Token name: ${await kip17.name()}`)
console.log(`Token symbol: ${await kip17.symbol()}`)
}

createToken()