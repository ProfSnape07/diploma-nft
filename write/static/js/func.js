async function broadcastErrorMessage(msg, id= "message") {
    const myElement = document.getElementById(id);
    myElement.style.color = "red";
    const currentMyElement = myElement.innerHTML;
    myElement.innerHTML = `${currentMyElement}${msg}<br>`;
}

async function deleteErrorMessage(msg, id = "message") {
    const myElement = document.getElementById(id);
    let currentMyElement = myElement.innerHTML;
    if (currentMyElement.includes(msg)) {
        currentMyElement = currentMyElement.replace(msg, "");
        myElement.innerHTML = currentMyElement;
    }
}

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();

        // using account variable as a flag to check if the user has connected wallet or not.
        account = await provider.listAccounts();

        const a = await provider.getNetwork();
        networkId = await a.chainId;

        if (networkId !== chainIdOfDeployedContract) {
            alert("Change to Correct Network");
        }
    } else {
        alert(("Metamask not found"));
    }
}

function toUnixTimestamp(yearMonth) {
    //
    // Create UNIX timestamp at default value.
    // @param yearMonth: Pass year and month in one string, accepted format: "2023-01".
    // @return: UNIX timestamp of provided year & month on day: 01, time: 10:00:00 and timezone: IST.
    //
    const dateStr = yearMonth + '-01T10:00:00+05:30'; // Concatenate year-month with day, time, and timezone offset

    const date = new Date(dateStr); // Create a Date object from the date string
    const unixTimestamp = Math.floor(date.getTime() / 1000); // Get the Unix timestamp in seconds

    return unixTimestamp.toString();
}

let account = false;
let provider;
let signer;
let networkId;
