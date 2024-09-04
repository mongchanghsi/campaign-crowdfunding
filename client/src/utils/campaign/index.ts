import CrowdFundingAbi from "@/contracts/CrowdFunding.json";
import {
  createPublicClient,
  http,
  createWalletClient,
  custom,
  parseEther,
  parseAbiItem,
} from "viem";
import { sepolia } from "viem/chains";
import CONTRACT_ADDRESSES from "@/contracts/address.json";
import { CAMPAIGN_CREATED_EVENT } from "./event";

class CampaignContract {
  private getClient() {
    return createPublicClient({
      chain: sepolia,
      transport: http(),
    });
  }

  private getWalletClient() {
    return createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
  }

  private async getCampaignContractDetails(): Promise<{
    address: `0x${string}`;
    abi: any;
  }> {
    const client = this.getClient();
    const chainId = await client.getChainId();
    return {
      address: (CONTRACT_ADDRESSES as any)[chainId.toString()][
        "CrowdFunding"
      ] as `0x${string}`,
      abi: CrowdFundingAbi.abi,
    };
  }

  async getCampaigns() {
    try {
      const client = this.getClient();
      const contractDetails = await this.getCampaignContractDetails();
      const data = await client.readContract({
        ...contractDetails,
        functionName: "getAllCampaigns",
        args: [],
      });
      return data;
    } catch (error) {
      return [];
    }
  }

  async getCampaignById(campaignId: number) {
    try {
      const client = this.getClient();
      const contractDetails = await this.getCampaignContractDetails();
      const data = await client.readContract({
        ...contractDetails,
        functionName: "getCampaign",
        args: [campaignId],
      });
      return data;
    } catch (error) {
      return null;
    }
  }

  async createCampaign(
    title: string,
    description: string,
    goal: string,
    endDate: number
  ) {
    try {
      const client = this.getClient();
      const walletClient = this.getWalletClient();
      const [account] = await walletClient.getAddresses();
      const contractDetails = await this.getCampaignContractDetails();

      const { request } = await client.simulateContract({
        ...contractDetails,
        functionName: "createCampaign",
        args: [title, description, parseEther(goal), endDate],
        account,
      });
      const hash = await walletClient.writeContract(request);
      const transaction = await client.waitForTransactionReceipt({ hash });
      return transaction.transactionHash;
    } catch (error) {
      // TODO: Handle Error
      console.log("Error", error);
      return "";
    }
  }

  async donate(campaignId: number, amount: string) {
    try {
      const client = this.getClient();
      const walletClient = this.getWalletClient();
      const [account] = await walletClient.getAddresses();
      const contractDetails = await this.getCampaignContractDetails();

      const { request } = await client.simulateContract({
        ...contractDetails,
        functionName: "contribute",
        args: [campaignId],
        value: parseEther(amount),
        account,
      });
      const hash = await walletClient.writeContract(request);
      const transaction = await client.waitForTransactionReceipt({ hash });
      return transaction.transactionHash;
    } catch (error) {
      // TODO: Handle Error
      console.log("Error", error);
      return "";
    }
  }

  async listenToNewCampaign(callback: () => void) {
    // Improvement: Update Event to include required fields for Landing page, so don't need to refetch everything
    try {
      const client = this.getClient();
      const contractDetails = await this.getCampaignContractDetails();
      const watcher = client.watchEvent({
        address: contractDetails.address,
        event: parseAbiItem(CAMPAIGN_CREATED_EVENT),
        onLogs: (logs) => callback(),
        onError: (error) => console.log("Error", error),
        poll: true,
        pollingInterval: 60 * 10 * 1_000, // Poll every 10 minutes
      });
    } catch (error) {
      console.log("Error", error);
    }
  }
}

const campaignContract = new CampaignContract();

export default campaignContract;
