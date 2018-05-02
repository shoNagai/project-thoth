import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  // if (typeof web3 !== 'undefined') {
  //   console.log("Use Mist/MetaMask's provider")
  //   web3 = new Web3(web3.currentProvider)
  // } else {
  //   console.log("Use localhost network")
  //   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  // }
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  resolve({
    injectedWeb3: web3.isConnected(),
    web3 () {
      return web3
    }
  })
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve account
      result.web3().eth.getAccounts((err, account) => {
        if (err) {
          console.log('Unable to retrieve account')
          reject(new Error('Unable to retrieve account'))
        } else {
          result = Object.assign({}, result, { account })
          resolve(result)
        }
      })
    })
  })

export default getWeb3