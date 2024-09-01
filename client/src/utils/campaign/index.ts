import ENVIRONMENT from "@/configuration/environment";
import CrowdFundingAbi from "@/contracts/CrowdFunding.json";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

class CampaignContract {
  private getClient() {
    return createPublicClient({
      chain: sepolia,
      transport: http(),
    });
  }

  private getCampaignContractDetails(): {
    address: `0x${string}`;
    abi: any;
  } {
    return {
      address: ENVIRONMENT.crowdfundingContractAddress as `0x${string}`,
      abi: CrowdFundingAbi.abi,
    };
  }

  async getCampaigns() {
    const client = this.getClient();
    const data = await client.readContract({
      ...this.getCampaignContractDetails(),
      functionName: "getAllCampaigns",
      args: [],
    });
    return data;
  }

  async getCampaignById(campaignId: number) {
    const client = this.getClient();
    const data = await client.readContract({
      ...this.getCampaignContractDetails(),
      functionName: "getCampaign",
      args: [campaignId],
    });
    return data;
  }
}

const campaignContract = new CampaignContract();

export default campaignContract;
