module.exports = {
  networks: {

    network1: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },

    network2: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },

  },
  compilers: {
    solc: {
      version: "0.4.24",
    }
  }
}
