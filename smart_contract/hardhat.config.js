//eth-ropsten.alchemyapi.io/v2/FTole9jyyVoPiLpb5XNP-IOyZe8DJClY

https: require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/FTole9jyyVoPiLpb5XNP-IOyZe8DJClY',
      accounts: [
        '756127f7c8707e6b42babad45ff4cf4be3887e786e90e20df475e6967cd9b5f5',
      ],
    },
  },
};
