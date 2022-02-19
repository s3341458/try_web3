const { run } = require('hardhat');
const hre = require('hardhat');

const main = async () => {
  // We get the contract to deploy
  const Transaction = await hre.ethers.getContractFactory('Transactions');
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log('Transaction deployed to:', transaction.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
