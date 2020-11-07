// Increment Number a number using Solidity Smart Contract
// Smart Contract: https://gist.github.com/anonymous/82f97284041f6cfeebfcb407ad0f303d

// Smart Contract's Application Binary Interface (https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
var ABI = [
  {
    constant: true,
    inputs: [],
    name: "getCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  { payable: false, stateMutability: "nonpayable", type: "fallback" },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "count", type: "uint256" }],
    name: "log_string",
    type: "event"
  }
];

const contractAddress = "0x0FC9DC696eC91B4232a0620a44F44a18f30e5F9F";
const contract = web3.eth.contract(ABI).at(contractAddress);
const getCountFunc = contract.getCount.getData();

const countEl = document.querySelector("#count");
const networkEl = document.querySelector("#network");
const refreshButtonEl = document.querySelector("#refresh");
const incrementButtonEl = document.querySelector("#increment");
const accountEl = document.querySelector("#account");
const balanceEl =  document.querySelector("#balance");

let disableTransactions = false;

contract.log_string().watch((error, result) => {
  console.log("on watch"); 
  console.log(result);
});

web3.version.getNetwork((err, netId) => {
  
  // If this is the Main net, disable the increment button
  if (netId === '1') {
    disableTransactions = true;
    incrementButtonEl.classList = ['disabled'];
  }
  
  const network =
    {
      1: "Mainnet",
      3: "Ropsten Test Network"
    }[netId] || "Unknown Network";

  networkEl.innerText = network;
});

web3.eth.getBlockNumber((error, result) => {
  console.log(result);
})

web3.eth.getAccounts((error, result) => {
  accountEl.innerText = result;
  
  web3.eth.getBalance(result[0], function(error, result) {
    var val = web3.fromWei(result);
    balanceEl.innerText = `${val} ETH`;
  });
})

incrementButtonEl.addEventListener('click', function() {
  if (disableTransactions) {
    return;
  }
  
  web3.eth.sendTransaction(
    {
      to: contractAddress
    },
    (error, result) => {
      console.log(result);
    }
  );
});

function refreshCount() {
  refreshButtonEl.classList = ["disabled"];
  countEl.innerText = '-';
  
  web3.eth.call(
    {
      to: contractAddress,
      data: getCountFunc
    },
    (error, result) => {
      countEl.innerText = parseInt(result, 16);
      refreshButtonEl.classList = [];
    }
  );
}

refreshButtonEl.addEventListener('click', refreshCount);
refreshCount();
