const ENVIRONMENT = {
  applicationPrefix: process.env.NEXT_PUBLIC_APPLICATION_ENV_PREFIX || "",
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  crowdfundingContractAddress:
    process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT_ADDRESS || "",
};

export default ENVIRONMENT;
