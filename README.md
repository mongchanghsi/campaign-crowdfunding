# CrowdFunding dApp

## Description
A dApp that allows you to view, create and fund campaigns. 

## Goal
To simply practice a full end-to-end a contract development to a dApp integration. The main focus here is on the integration, how well it functions and how can I make my development experiencing better through creating templates or scripts. At the moment, the UI design is not my outmost priority.

## Key Developments Pointers
- For client, there's a theme switcher set in place with styled-components
- As the contract folder and client folder are separated, I have developed a script `npm run import-contracts` to transfer the generated ABI and the contract address to the cient folder, this will enhance my development experience in the future if I were to deploy the same contract multiple times with enhancements. Furthermore, I am looking to enhance the script to take in multiple chains