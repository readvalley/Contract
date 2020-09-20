
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
    caver.wallet.keyring.createFromPrivateKey(config.WalletPrivKey)
)
async function deployToken(){
const kip7 = await caver.kct.kip7.deploy(
    {
        name: 'Readvelly-Payment-Token',
        symbol: 'RPT',  
        decimals: 18,
        initialSupply: '100000000000000000000000000',
    },
    deployer.address
)
console.log(`Deployed KIP-7 token contract address: ${kip7.options.address}`)

console.log(`Token name: ${await kip7.name()}`)
console.log(`Token symbol: ${await kip7.symbol()}`)
console.log(`Token decimals: ${await kip7.decimals()}`)
console.log(`Token totalSupply: ${await kip7.totalSupply()}`)
}
deployToken()