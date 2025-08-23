Gemini > use profile testnet
Gemini > list modules 0x6976ec3aa37858aad990b899d5c17ad827b66cab91ccdb7256c12083313deb40
# If mougli_tickets not listed, deploy the package:
Gemini > deploy ./path_to_your_package
# CLI will return the deployed address, e.g. 0xABCDEF1234567890
Gemini > list modules 0xABCDEF1234567890
# You should now see mougli_tickets listed
# Mint NFT ticket for user
Gemini > call 0xABCDEF1234567890::mougli_tickets::mint_ticket 0xUSER_WALLET 1 ["A1","A2"]