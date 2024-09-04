const ENVIRONMENT = {
  applicationPrefix: process.env.NEXT_PUBLIC_APPLICATION_ENV_PREFIX || "",
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_URL || "",
};

export default ENVIRONMENT;
