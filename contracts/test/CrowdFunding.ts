import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const MOCK_CAMPAIGN_NAME = "MOCK_CAMPAIGN_NAME";
const MOCK_CAMPAIGN_DESCRIPTION = "MOCK_CAMPAIGN_DESCRIPTION";
const MOCK_GOAL = 1000;
const MOCK_END_DATE = Math.floor(Date.now() / 1000) + 3600

describe("CrowdFunding", () => {
  const deployCrowdFunding = async () => {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdFundingContract = await CrowdFunding.deploy();

    return { crowdFundingContract, owner, otherAccount};
  }

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      const { crowdFundingContract, owner} = await loadFixture(deployCrowdFunding);
      expect(await crowdFundingContract.owner()).to.equal(owner.address);
    })
  });

  describe("Actions", () => {
    it("should create a campaign", async () => {
      const { crowdFundingContract, owner} = await loadFixture(deployCrowdFunding);

      await crowdFundingContract.connect(owner).createCampaign(
        MOCK_CAMPAIGN_NAME,
        MOCK_CAMPAIGN_DESCRIPTION,
        MOCK_GOAL,
        MOCK_END_DATE
      );

      const campaigns = await crowdFundingContract.getAllCampaigns();
      expect(campaigns.length).to.equal(1);
      expect(campaigns[0].title).to.equal(MOCK_CAMPAIGN_NAME);
    });

    it("should contribute to a campaign", async  () => {
      const { crowdFundingContract, owner, otherAccount} = await loadFixture(deployCrowdFunding);
      await crowdFundingContract.connect(owner).createCampaign(
        MOCK_CAMPAIGN_NAME,
        MOCK_CAMPAIGN_DESCRIPTION,
        MOCK_GOAL,
        MOCK_END_DATE
      );

      await crowdFundingContract.connect(otherAccount).contribute(0, { value: 500 });
      const campaign = await crowdFundingContract.getCampaign(0);
      expect(campaign[8]).to.equal(500);
    });

    it("should delete a campaign", async  () => {
      const { crowdFundingContract, owner, otherAccount} = await loadFixture(deployCrowdFunding);
      await crowdFundingContract.connect(owner).createCampaign(
        MOCK_CAMPAIGN_NAME,
        MOCK_CAMPAIGN_DESCRIPTION,
        MOCK_GOAL,
        MOCK_END_DATE
      );
      const campaign = await crowdFundingContract.getCampaign(0);
      expect(campaign[7]).to.equal(0);

      await crowdFundingContract.connect(owner).deleteCampaign(0);
      const updatedCampaign = await crowdFundingContract.getCampaign(0);
      expect(updatedCampaign[7]).to.equal(1);
    });
})
})