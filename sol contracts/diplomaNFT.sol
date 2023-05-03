// SPDX-License-Identifier: MPL-2.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract UW_DiplomaNFT is ERC721Enumerable {
    struct Diploma {
        string university;
        string studentName;
        string enrolmentNumber;
        string program;
        string specialisation;
        string gpa;
        string dateOfGraduation;
        string certificateURI;
    }

    address private owner;
    string private university = "University of Westeros";
    mapping(address => bool) private isOffice;
    mapping(uint256 => Diploma) private diplomaData;

    constructor() ERC721(university, "UW") {
        owner = msg.sender;
    }

    function addOffice(address office) public {
        require(msg.sender == owner, "Only owner can add to the office.");
        isOffice[office] = true;
    }

    function removeOffice(address office) public {
        require(msg.sender == owner, "Only owner can remove the office.");
        isOffice[office] = false;
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership.");
        owner = newOwner;
    }

    function mintDiploma(
        address recipient,
        string memory studentName,
        string memory enrolmentNumber,
        string memory program,
        string memory specialisation,
        string memory gpa,
        string memory dateOfGraduation,
        string memory certificateURI
    ) public {
        require(isOffice[msg.sender], "Only office can mint Diploma.");
        require(
            bytes(dateOfGraduation).length == 10,
            "Date of graduation must be represented in UNIX."
        );
        require(
            bytes(enrolmentNumber).length == 10,
            "Enrolment Number must be 10 characters."
        );
        Diploma memory _diploma = Diploma(
            university,
            studentName,
            enrolmentNumber,
            program,
            specialisation,
            gpa,
            dateOfGraduation,
            certificateURI
        );
        uint256 certificateNumber = generateCertificateNumber(enrolmentNumber);
        diplomaData[certificateNumber] = _diploma;
        _safeMint(recipient, certificateNumber);
    }

    function generateCertificateNumber(string memory enrolmentNumber)
        internal
        view
        returns (uint256)
    {
        string memory strCertificateNumber = string(
            abi.encodePacked(enrolmentNumber, "00")
        );
        bytes memory certificateNumber = bytes(strCertificateNumber);
        uint256 num = 0;
        for (uint256 i = 0; i < certificateNumber.length; i++) {
            num = num * 10 + uint256(uint8(certificateNumber[i])) - 48;
        }

        while (_exists(num)) {
            num += 1;
        }

        return num;
    }

    function updateDiploma(
        uint256 certificateNumber,
        string memory studentName,
        string memory enrolmentNumber,
        string memory program,
        string memory specialisation,
        string memory gpa,
        string memory dateOfGraduation,
        string memory certificateURI
    ) public {
        require(isOffice[msg.sender], "Only office can update Diploma.");
        require(_exists(certificateNumber), "Diploma doesn't exists.");
        require(
            bytes(dateOfGraduation).length == 10,
            "Date of graduation must be represented in UNIX."
        );
        require(
            bytes(enrolmentNumber).length == 10,
            "Enrolment Number must be 10 characters."
        );
        Diploma memory _diploma = Diploma(
            university,
            studentName,
            enrolmentNumber,
            program,
            specialisation,
            gpa,
            dateOfGraduation,
            certificateURI
        );
        diplomaData[certificateNumber] = _diploma;
    }

    function recoverDiploma(uint256 certificateNumber, address recipient)
        public
    {
        require(isOffice[msg.sender], "Only office can recover Diploma.");
        require(_exists(certificateNumber), "Diploma doesn't exists.");
        address oldAddress = ownerOf(certificateNumber);
        safeTransferFrom(oldAddress, recipient, certificateNumber);
    }

    function getDiplomaDetails(uint256 certificateNumber)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(_exists(certificateNumber), "Diploma doesn't exists.");
        Diploma memory fetchedDetails = diplomaData[certificateNumber];
        return (
            fetchedDetails.university,
            fetchedDetails.studentName,
            fetchedDetails.enrolmentNumber,
            fetchedDetails.program,
            fetchedDetails.specialisation,
            fetchedDetails.gpa,
            fetchedDetails.dateOfGraduation,
            fetchedDetails.certificateURI
        );
    }

    function tokenURI(uint256 certificateNumber)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(certificateNumber), "Diploma doesn't exists.");
        Diploma memory fetchedDetails = diplomaData[certificateNumber];
        return fetchedDetails.certificateURI;
    }
}
