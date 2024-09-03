import ENVIRONMENT from "@/configuration/environment";
import CrowdFundingAbi from "@/contracts/CrowdFunding.json";
import {
  createPublicClient,
  http,
  createWalletClient,
  custom,
  parseEther,
} from "viem";
import { sepolia } from "viem/chains";
import CONTRACT_ADDRESSES from "@/contracts/address.json";

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
}

const campaignContract = new CampaignContract();

export default campaignContract;
