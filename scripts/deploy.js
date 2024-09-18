async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const FreelanceMarketplace = await ethers.getContractFactory("FreelanceMarketplace");
    const marketplace = await FreelanceMarketplace.deploy();

    console.log("FreelanceMarketplace deployed to:", marketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
