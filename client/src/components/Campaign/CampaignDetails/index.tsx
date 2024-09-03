import { CAMPAIGN } from "@/utils/campaign/type";
import {
  CampaignDetailsContainer,
  CampaignDetailsDescription,
  CampaignDetailsLabel,
  CampaignDetailsTitle,
} from "./style";
import { FC } from "react";
import ProgressBar from "@/components/Shared/ProgressBar";
import { getDaysLeft } from "@/utils/date";

interface IProps {
  campaign: CAMPAIGN;
}

const CampaignDetails: FC<IProps> = ({ campaign }) => {
  return (
    <CampaignDetailsContainer>
      <CampaignDetailsTitle>{campaign.title}</CampaignDetailsTitle>
      <CampaignDetailsDescription>
        {campaign.description}
      </CampaignDetailsDescription>
      <ProgressBar
        currentValue={campaign.currentContribution}
        maxValue={campaign.goal}
        round={2}
        currency={"ETH"}
      />
      <CampaignDetailsLabel>
        Creator: {campaign.campaignCreator}
      </CampaignDetailsLabel>
      <CampaignDetailsLabel>
        Days Left: {getDaysLeft(campaign.endDate)} days
      </CampaignDetailsLabel>
    </CampaignDetailsContainer>
  );
};

export default CampaignDetails;
