<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <script type="text/javascript" src="https://unpkg.com/jquery@3.3.1/dist/jquery.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript" src="https://unpkg.com/web3@0.20.5/dist/web3.min.js"></script>
  <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
  <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fortmatic@2.0.6/dist/fortmatic.js"></script>
  <link rel="stylesheet" href="app.css">
  <script type="text/javascript" src="app.js"></script>
  
  

  <!-- The generated javascript and app.js will be substituted in below -->
  <!-- JAVASCRIPT -->

  <!-- The app.css contents will be substituted in below -->
  <!-- STYLE -->

  <script>
    /* Functionality for tabs - navigation */
    function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    }
  </script>
  <link href='https://fonts.googleapis.com/css?family=Chivo' rel='stylesheet'>
  <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet'>

</head>

<body>

  <div id="main-container">

    <!-- Header -->

    <header>
      <img src="https://raw.githubusercontent.com/tsmoreau/tsmoreau.github.io/main/depict-logo.svg" width="500">
    </header>

    <!-- Navigation -->

    <!-- Main Nav -->

    <div id="mainnav" class="navbar">
      <button class="mainnav" onclick="openTab(event, 'create-tab')">sticker_machine</button>
      <button class="mainnav" onclick="openTab(event, 'inventory-tab')">sticker_collection</button>
      <button class="mainnav" onclick="openTab(event, 'stats-tab')">stats</button>
      <button class="mainnav" onclick="openTab(event, 'about-tab')">faq</button>

    </div>

    <!-- Commenting Out Older Nav Bar
            <div class="tab">
              
              
                <button class="tablinks" onclick="openTab(event, 'create-tab')">sticker machine</button>
                <button class="tablinks" onclick="openTab(event, 'inventory-tab')">sticker collection</button>
                <button class="tablinks" onclick="openTab(event, 'stats-tab')">stats</button>
                <button class="tablinks" onclick="openTab(event, 'about-tab')">faq</button>
            </div>
           -->

    <!-- Create section -->

    <div id="create-tab" class="tabcontent">

      
                <div class="pizza-container" id="pizza-create-container"><!--
                    <img class="pizza-frame" src="https://studio.ethereum.org/static/img/cryptopizza/container.jpg"/>
                    <img src="https://studio.ethereum.org/static/img/cryptopizza/corpus.png"/>
                  
                  
                  
                    <!-- Ingredients images will be appended to this div -->

      <div class="ingredients"></div>

    </div>

    <div class="input-container">
      <input type="text" id="create-name" placeholder="enter sticker name..." maxlength="20" />

    </div>
    <div class="input-container">

      <button class="mainnav" id="button-create">new sticker</button>
      
    </div>
       <div id="prepare">
            <button class="btn btn-primary" id="btn-connect">
              Connect wallet
            </button>
          </div>

          <div id="connected" style="display: none">

            <button class="btn btn-primary" id="btn-disconnect">
              Disconnect wallet
            </button>

            <hr>

            <div id="network">
              <p>
                <strong>Connected blockchain:</strong> <span id="network-name"></span>
              </p>

              <p>
                <strong>Selected account:</strong> <span id="selected-account"></span>
              </p>

            </div>

            <hr>

            <h3>All account balances</h3>

            <table class="table table-listing">
              <thead>
                <th>Address</th>
                <th>ETH balance</th>
              </thead>

              <tbody id="accounts">
              </tbody>
            </table>

            <p>Please try to switch between different accounts in your wallet if your wallet supports this functonality.</p>

          </div>
  </div>

  <!-- Inventory section -->

  <div id="inventory-tab" class="tabcontent">
    <h2>your sticker collection</h2>
    
    <!-- Pizza containers will be appended to this div -->
    <div class="row inventory-list"></div>
  </div>

    <div id="network">
              <p>
                <strong>Connected blockchain:</strong> <span id="network-name"></span>
              </p>

              <p>
                <strong>Selected account:</strong> <span id="selected-account"></span>
              </p>

            </div>
    
    
  <!-- Stats section -->

  <div id="stats-tab" class="tabcontent">
    <h2>your stats</h2>

    <h3>stickers created:</h3>
    <h3>stickers destroyed:</h3>
    <h3>stickers gifted:</h3>

  </div>

  <!-- FAQ section -->

  <div id="about-tab" class="tabcontent">

    <button class="accordion">What is Depict Limited?
      <hr></button>
    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>

    <button class="accordion">What is the Tao Blockchain?
      <hr></button>
    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>

    <button class="accordion">How Do I Use Depict Limited?
      <hr></button>

    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>

    <script>
      var acc = document.getElementsByClassName("accordion");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    </script>

  </div>
  </div>

</body>
<div class="footer">
  <div class="network-wrapper">Connected to: <span id="network"></span></div>
  <div class="account-wrapper">Account: <span id="account"></span></div>
  <div class="balance-wrapper">Balance: <span id="#balance"></span></div>
</div>

</html>
