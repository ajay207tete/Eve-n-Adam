const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
});

const connectBtn = document.getElementById("connectWallet");
const walletInfo = document.getElementById("walletInfo");
const payBtn = document.getElementById("payButton");

let walletAddress = null;

connectBtn.addEventListener("click", async () => {
  try {
    await tonConnectUI.connectWallet();
    const account = tonConnectUI.account;
    walletAddress = account.address;
    walletInfo.innerHTML = `<p>✅ Connected: ${walletAddress}</p>`;
    payBtn.disabled = false;
  } catch (err) {
    console.error("Connection error:", err);
  }
});

payBtn.addEventListener("click", async () => {
  if (!walletAddress) return alert("Connect wallet first!");

  const tx = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: "UQBqxYtF8LmQqtwr7w_YzMOIZB1e4yJyh-SiSfHyT9Lv7wBo", // your TON wallet
        amount: "1000000000" // 1 TON (in nanotons)
      }
    ]
  };

  try {
    await tonConnectUI.sendTransaction(tx);
    alert("💎 Transaction sent successfully!");
  } catch (err) {
    alert("Transaction failed!");
    console.error(err);
  }
});
