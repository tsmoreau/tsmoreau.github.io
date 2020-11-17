// Thanks to @aletna for teaching me this - a lot of the code here is written by him. Give him some creds.

var Web3 = require('web3');

window.App = {
	instance: "No instance has been initiated, yet.", // For the console
	network: "No network connected yet.", // For the console

  start: function(){
    let self = this

    self.fetchAccount()
    .then(function(account){

      $(document).on('click', '#getSecretWord', (event) => { // This is where you click to get the secret word //
        App.getSecretWord(account) // Allows you to fetch the "getSecretWord" function from the smart contract //
      });

			$(document).on('click', '#setSecretWord', (event) => { // This is where you set the secret word
				let input = document.getElementById("newSecretWord").value; // This function allows you to put in a new secret word every time
				App.setSecretWord(account,input) // Allows you to fetch the "setSecretWord" function from the smart contract
      });

      return account
    })


  },

  fetchAccount: function(){ // Function for getting the account
    let self = this;

    return new Promise(function(res, rej){

      web3.eth.getAccounts(function(err, accounts) { // Getting the initial account balance so it can be displayed.
        if (err != null) {
          rej("There was an error fetching your accounts.")
        }

        if (accounts.length == 0) {
          rej("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        }

        res(accounts[0])

      });
    })
  },

  getSecretWord: function(account) { // Function for getting the Secret Word
    let self = this;

    let SecretWord = new Promise(function(resolve, reject){
      self.instance.getSecretWord({from: account}, function(err, res){
        resolve(res)
      })
    })

    Promise.resolve(SecretWord)
    .then(function(string){
			document.getElementById("secretWordOutput").innerHTML = " -> " + string; // Allowing the JavaScript to interact with our HTML
    })
  },

  setSecretWord: function(account, input) { // Function for setting the secret word
		let self = this;

		let SecretWord = new Promise(function(resolve, reject){
      self.instance.setSecretWord(input, {from: account}, function(err, res){
        resolve(res)
      })
    })

    Promise.resolve(SecretWord)
    .then(function(string){
			console.log("setting the new secret word to: '"+input+"'"); // Showing the secret word in console
    })
  }

};


window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    console.warn("Using web3 http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider); // Use Mist/MetaMask's provider

    web3.version.getNetwork((err, netId) => {

      switch (netId) { // Allowing us to change between multiple Ethereum networks

        // NetId = 1 is Ethereum Main Net

        /*
        case "1":
          console.warn('You are using the Ethereum Main Network')
          var abi = // PASTE ABI HERE: This can be found in your Remix IDE
          var SharesContract = web3.eth.contract(abi);
          var contractAddress = // PASTE 'CONTRACT' HERE: Can be found in your Remix IDE
          var instance = SharesContract.at(contractAddress);
          App.instance = instance;
          App.network = 1;
          App.start();
          break
        */

        case "558": // NetId = 3 is Ropsten Test Net
          console.warn('You are using the Tao Network.')
          var abi = [
            	{
            		"constant": false,
            		"inputs": [
            			{
            				"name": "_secretKey",
            				"type": "string"
            			}
            		],
            		"name": "setSecretWord",
            		"outputs": [],
            		"payable": false,
            		"stateMutability": "nonpayable",
            		"type": "function"
            	},
            	{
            		"constant": true,
            		"inputs": [],
            		"name": "getSecretWord",
            		"outputs": [
            			{
            				"name": "",
            				"type": "string"
            			}
            		],
            		"payable": false,
            		"stateMutability": "view",
            		"type": "function"
            	}
            ]
          var SharesContract = web3.eth.contract(abi); // Variable storing the ABI
          var contractAddress = '0x71CAbea8a20292FDf67D64319bc9731eDf87Ec37' // Storing the contract address found in your Remix IDE
          var instance = SharesContract.at(contractAddress);
          App.instance = instance;
          App.network = 3;
          App.start();
          break
        default:
          console.warn('This is an unknown network. Please switch to either the Ropsten Test Network or the Ethereum Main Network.')
      }
    })

  } else {
    console.warn("No web3 detected.");
  }

});






"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;


/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if(location.protocol !== 'https:') {
    // https://ethereum.stackexchange.com/a/62217/620
    const alert = document.querySelector("#alert-error-https");
    alert.style.display = "block";
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  document.querySelector("#selected-account").textContent = selectedAccount;

  // Get a handl
  const template = document.querySelector("#template-balance");
  const accountContainer = document.querySelector("#accounts");

  // Purge UI elements any previously loaded accounts
  accountContainer.innerHTML = '';

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Fill in the templated row and put in the document
    const clone = template.content.cloneNode(true);
    clone.querySelector(".address").textContent = address;
    clone.querySelector(".balance").textContent = humanFriendlyBalance;
    accountContainer.appendChild(clone);
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#connected").style.display = "block";
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#prepare").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
});
