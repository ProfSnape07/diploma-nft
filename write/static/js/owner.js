async function validateAddOffice() {
    let flag = true;

    const myElement = document.getElementById("addOfficeMessage");
    myElement.innerHTML = ``;

    address = null;

    const officeAddress = document.getElementById("addOffice");
    const officeAddressValue = officeAddress.value;
    if (officeAddressValue.length !== 42) {
        await broadcastErrorMessage("Incorrect Wallet Address", "addOfficeMessage");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Wallet Address", "addOfficeMessage");
        address = officeAddressValue;
    }

    return flag;
}

async function addOffice() {
    if (account) {

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network")
        } else {
            if (await validateAddOffice()) {

                // The Contract object
                const diplomaContract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = diplomaContract.connect(signer);
                const tx = await contractWithSigner.addOffice(address);
                const txHash = tx.hash;
                const explorerLinkWithTxHash = explorerLink + txHash;

                const myElement = document.getElementById("addOfficeMessage");
                myElement.style.color = "blue";
                myElement.innerHTML = `Successfully sent to network with TX Hash: <a href="${explorerLinkWithTxHash}" target="_blank" rel="noopener noreferrer">${txHash}</a><br> Note: Only owner can grant office role.<br>`;
            }

        }
    } else {
        alert("Connect Wallet");
    }
}

async function validateRemoveOffice() {
    let flag = true;

    const myElement = document.getElementById("removeOfficeMessage");
    myElement.innerHTML = ``;

    address = null;

    const officeAddress = document.getElementById("removeOffice");
    const officeAddressValue = officeAddress.value;
    if (officeAddressValue.length !== 42) {
        await broadcastErrorMessage("Incorrect Wallet Address", "removeOfficeMessage");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Wallet Address", "removeOfficeMessage");
        address = officeAddressValue;
    }

    return flag;
}

async function removeOffice() {
    if (account) {

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network")
        } else {
            if (await validateRemoveOffice()) {

                // The Contract object
                const diplomaContract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = diplomaContract.connect(signer);
                const tx = await contractWithSigner.removeOffice(address);
                const txHash = tx.hash;
                const explorerLinkWithTxHash = explorerLink + txHash;

                const myElement = document.getElementById("removeOfficeMessage");
                myElement.style.color = "blue";
                myElement.innerHTML = `Successfully sent to network with TX Hash: <a href="${explorerLinkWithTxHash}" target="_blank" rel="noopener noreferrer">${txHash}</a><br> Note: Only owner can revoke office role.<br>`;
            }

        }
    } else {
        alert("Connect Wallet");
    }
}

async function validateTransferOwnership() {
    let flag = true;

    const myElement = document.getElementById("transferOwnershipMessage");
    myElement.innerHTML = ``;

    address = null;

    const officeAddress = document.getElementById("transferOwnership");
    const officeAddressValue = officeAddress.value;
    if (officeAddressValue.length !== 42) {
        await broadcastErrorMessage("Incorrect Wallet Address", "transferOwnershipMessage");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Wallet Address", "transferOwnershipMessage");
        address = officeAddressValue;
    }

    return flag;
}

async function transferOwnership() {
    if (account) {

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network")
        } else {
            if (await validateTransferOwnership()) {

                // The Contract object
                const diplomaContract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = diplomaContract.connect(signer);
                const tx = await contractWithSigner.transferOwnership(address);
                const txHash = tx.hash;
                const explorerLinkWithTxHash = explorerLink + txHash;

                const myElement = document.getElementById("transferOwnershipMessage");
                myElement.style.color = "blue";
                myElement.innerHTML = `Successfully sent to network with TX Hash: <a href="${explorerLinkWithTxHash}" target="_blank" rel="noopener noreferrer">${txHash}</a><br> Note: Only owner can transfer ownership.<br>`;
            }

        }
    } else {
        alert("Connect Wallet");
    }
}

let address;
