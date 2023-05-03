window.addEventListener("load", async () => {
    const connectWalletButton = document.getElementsByClassName("connect_wallet_button")[0];
    connectWalletButton.addEventListener('click', async () => {

        await window.ethereum.enable();

        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        const address = accounts[0];

        const addressField = document.getElementsByClassName("address_box")[0];
        addressField.value = address;
    });
});
