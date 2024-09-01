import { CAMPAIGN } from "@/utils/campaign/type";
import { FC } from "react";
import {
  CampaignPreviewCardContainer,
  CampaignPreviewCardDescription,
  CampaignPreviewCardTitle,
} from "./style";

interface IProps {
  campaign: CAMPAIGN;
}

const CampaignPreviewCard: FC<IProps> = ({ campaign }) => {
  return (
    <CampaignPreviewCardContainer>
      <CampaignPreviewCardTitle>{campaign.title}</CampaignPreviewCardTitle>
      <CampaignPreviewCardDescription>
        {campaign.description}
      </CampaignPreviewCardDescription>
    </CampaignPreviewCardContainer>
  );
};

export default CampaignPreviewCard;
