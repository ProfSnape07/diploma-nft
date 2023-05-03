async function validateMintDiploma() {
    let flag = true;

    const myElement = document.getElementById("message");
    myElement.innerHTML = ``;

    recipient = null;
    studentName = null;
    enrolmentNumber = null;
    program = null;
    specialisation = null;
    gpa = null;
    dateOfGraduation = null;
    certificateURI = null;

    const recipient_ = document.getElementById("recipient");
    const recipient_value = recipient_.value;
    if (recipient_value.length !== 42) {
        await broadcastErrorMessage("Incorrect Receipt Address");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Receipt Address");
        recipient = recipient_value;
    }

    const student_name = document.getElementById("student_name");
    studentName = student_name.value;

    const enrolment_number = document.getElementById("enrolment_number");
    const enrolment_number_value = enrolment_number.value;
    if (enrolment_number_value.length !== 10) {
        await broadcastErrorMessage("Incorrect Enrolment Number");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Enrolment Number");
        enrolmentNumber = enrolment_number_value;
    }

    const program_ = document.getElementById("program");
    program = program_.value;

    const specialisation_ = document.getElementById("specialisation");
    specialisation = specialisation_.value;

    const gpa_ = document.getElementById("gpa");
    const gpa_value = gpa_.value;
    const verifyGpa = Number(gpa_value);
    if (!(0 < verifyGpa && verifyGpa <= 10)) {
        await broadcastErrorMessage("Invalid GPA");
        flag = false;
    } else {
        await deleteErrorMessage("Invalid GPA");
        gpa = gpa_value; //gpa is expected as a string
    }

    const dateOfIssue = document.getElementById("dateOfIssue");
    const dateOfIssue_value = dateOfIssue.value;
    if (dateOfIssue_value.length !== 7) {
        await broadcastErrorMessage("Incorrect Date");
        flag = false;
    } else {
        await deleteErrorMessage("Incorrect Date");
        dateOfGraduation = toUnixTimestamp(dateOfIssue_value);
    }

    const uri = document.getElementById("uri");
    certificateURI = uri.value;

    return flag;
}

async function mint() {
    if (account) {

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network")
        } else {
            if (await validateMintDiploma()) {

                // The Contract object
                const diplomaContract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = diplomaContract.connect(signer);
                const tx = await contractWithSigner.mintDiploma(recipient, studentName, enrolmentNumber, program, specialisation, gpa, dateOfGraduation, certificateURI);
                const txHash = tx.hash;
                const explorerLinkWithTxHash = explorerLink + txHash;

                const myElement = document.getElementById("message");
                myElement.style.color = "blue";
                myElement.innerHTML = `Successfully sent to network with TX Hash: <a href="${explorerLinkWithTxHash}" target="_blank" rel="noopener noreferrer">${txHash}</a><br> Note: Only office can mint a Diploma.<br>`;
                const formHeader = document.getElementById("more");
                formHeader.textContent = "Enter details to mint more Diploma:";
            }

        }
    } else {
        alert("Connect Wallet");
    }
}

let recipient;
let studentName;
let enrolmentNumber;
let program;
let specialisation;
let gpa;
let dateOfGraduation;
let certificateURI;
