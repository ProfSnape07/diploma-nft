async function validateRecoverDiploma() {
    let flag = true;

    const myElement = document.getElementById("message");
    myElement.innerHTML = ``;

    certificateNumber = null;
    recipient = null;

    const certificate_number = document.getElementById("certificate_number");
    const certificate_number_value = certificate_number.value;
    const int_certificate_number_value = Number(certificate_number_value);
    if (certificate_number_value.length !== 12 || isNaN(int_certificate_number_value)) {
        await broadcastErrorMessage("Incorrect Certificate Number");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Certificate Number");
        certificateNumber = int_certificate_number_value;
    }

    const recipient_ = document.getElementById("recipient");
    const recipient_value = recipient_.value;
    if (recipient_value.length !== 42) {
        await broadcastErrorMessage("Incorrect Receipt Address");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Receipt Address");
        recipient = recipient_value;
    }

    return flag;
}


async function recover() {
    if (account) {

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network")
        } else {
            if (await validateRecoverDiploma()) {

                // The Contract object
                const diplomaContract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = diplomaContract.connect(signer);
                const tx = await contractWithSigner.recoverDiploma(certificateNumber, recipient);
                const txHash = tx.hash;
                const explorerLinkWithTxHash = explorerLink + txHash;

                const myElement = document.getElementById("message");
                myElement.style.color = "blue";
                myElement.innerHTML = `Successfully sent to network with TX Hash: <a href="${explorerLinkWithTxHash}" target="_blank" rel="noopener noreferrer">${txHash}</a><br> Note: Only office can recover a Diploma.<br>`;
            }
        }
    } else {
        alert("Connect Wallet");
    }
}


let certificateNumber;
let recipient;
