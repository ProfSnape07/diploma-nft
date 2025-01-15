from dotenv import load_dotenv
import os

load_dotenv()

# Declaring some variable here to enable their changing easy.
eth_provider = os.getenv("ETH_PROVIDER")
print(eth_provider)
abi_file = "static/contract/contract.abi"
contract_address = "0x40d2E6726F550ccD98d87F3d9df79E81cCd6f87e"
