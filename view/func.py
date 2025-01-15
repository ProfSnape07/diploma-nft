import json

import requests
from web3 import Web3
from web3.exceptions import *

from var import *

contract_address = Web3.to_checksum_address(contract_address)
# Initialising connection here as this should reduce response time when user hit submit button.
with open(abi_file, "r") as file:
    abi = json.load(file)
web3 = Web3(Web3.HTTPProvider(eth_provider))
contract = web3.eth.contract(address=contract_address, abi=abi)


def to_unix_timestamp(year_month: str) -> int:
    """
    Create UNIX timestamp at default value.
    :param year_month: Pass year and month in one string, accepted format: "2023-01".
    :return: UNIX timestamp of provided year & month on day: 01, time: 10:00:00 and timezone: IST.
    """
    date_time = year_month + "-" + "01" + " 10:00:00+05:30"

    # Converting into datetime.datetime object with timezone: IST.
    date_time = datetime.datetime.fromisoformat(date_time)
    unix_timestamp = int(date_time.timestamp())
    return unix_timestamp


def reverse_unix_timestamp(unix_timestamp: int | str) -> bool | str:
    try:
        unix_timestamp = int(unix_timestamp)
    except ValueError:
        return False

    ist_tz = datetime.timedelta(hours=5, minutes=30)
    ist_tz = datetime.timezone(ist_tz)

    date_time = datetime.datetime.fromtimestamp(unix_timestamp, tz=ist_tz)
    date_str = date_time.strftime("%a, %d %b %Y")
    return date_str


def isvalid_certificate(certificate_number):
    if len(certificate_number) != 12:
        return False
    try:
        int(certificate_number)
        return True
    except ValueError:
        return False


def exists_certificate(certificate_number):
    certificate_number = int(certificate_number)

    try:
        contract.functions.tokenURI(certificate_number).call()
        return True
    except (Web3ValidationError, ContractLogicError, ValueError):
        return False


def search_with_certificate(certificate_number):
    """
    use func search_with_certificate_number() in conjugation with isvalid_certificate() and exists_certificate(),
    search_with_certificate_number() doesn't check for invalid certificate number.
    """
    certificate_number = int(certificate_number)

    result = contract.functions.getDiplomaDetails(certificate_number).call()
    return result


def tokenuri_to_imageuri(tokenuri: str) -> int | str:
    try:
        uri = requests.get(tokenuri)
        try:
            uri = uri.json()
            uri = uri.get("image", "Image Key Missing.")
            return uri
        except (json.JSONDecodeError, NameError):
            return 0
    except (requests.exceptions.MissingSchema, requests.exceptions.InvalidURL):
        return 0


def isvalid_address(address):
    return web3.is_address(address)


def search_with_address(address):
    address = web3.to_checksum_address(address)
    address_balance = contract.functions.balanceOf(address).call()
    if not address_balance:
        return False
    results = []
    for balance in range(address_balance):
        details_dict = {
            "src": "",
            "alt": "",
        }
        certificate_number = contract.functions.tokenOfOwnerByIndex(address, balance).call()
        details_dict["alt"] = certificate_number
        certificate_uri = contract.functions.tokenURI(certificate_number).call()
        image_uri = tokenuri_to_imageuri(certificate_uri)
        details_dict["src"] = image_uri
        results.append(details_dict)
    return results


def isvalid_enrolment(enrolment_number):
    if len(enrolment_number) != 10:
        return False
    try:
        int(enrolment_number)
        return True
    except ValueError:
        return False


def search_with_enrolment(enrolment_number):
    def generate_certificate_number(enrol_number):
        enrol_number = int(enrol_number)
        enrol_number = enrol_number * 100
        return enrol_number

    certificate_number = generate_certificate_number(enrolment_number)

    results = []
    while exists_certificate(certificate_number):
        details_dict = {"src": "", "alt": certificate_number}
        certificate_uri = contract.functions.tokenURI(certificate_number).call()
        image_uri = tokenuri_to_imageuri(certificate_uri)
        details_dict["src"] = image_uri
        results.append(details_dict)

        certificate_number += 1
    return results
