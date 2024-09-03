import ENVIRONMENT from "@/configuration/environment";
import CrowdFundingAbi from "@/contracts/CrowdFunding.json";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import CONTRACT_ADDRESSES from "@/contracts/address.json";

class CampaignContract {
  private getClient() {
    return createPublicClient({
      chain: sepolia,
      transport: http(),
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
}

const campaignContract = new CampaignContract();

export default campaignContract;
