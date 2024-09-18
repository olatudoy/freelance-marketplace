const express = require('express');
const Web3 = require('web3');
const app = express();
const port = 3000;

const web3 = new Web3('http://localhost:8545'); // Connect to local Ethereum node
const contractABI = [ /* ABI from compiled contract */ ];
const contractAddress = '0xYourContractAddress';
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

app.post('/createJob', async (req, res) => {
    const { title, description, payment } = req.body;
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.createJob(title, description, payment).send({ from: accounts[0] });
    res.send(result);
});

app.post('/completeJob', async (req, res) => {
    const { jobId } = req.body;
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.completeJob(jobId).send({ from: accounts[0] });
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
