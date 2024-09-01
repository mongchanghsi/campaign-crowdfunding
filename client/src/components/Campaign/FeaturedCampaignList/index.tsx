import { CAMPAIGN } from "@/utils/campaign/type";
import { FeaturedCampaignListContainer } from "./style";
import { FC } from "react";
import CampaignPreviewCard from "../CampaignPreviewCard";

interface IProps {
  campaigns: CAMPAIGN[];
}

const FeaturedCampaignList: FC<IProps> = ({ campaigns }) => {
  return (
    <FeaturedCampaignListContainer>
      {campaigns.map((campaign) => (
        <CampaignPreviewCard key={campaign.title} campaign={campaign} />
      ))}
    </FeaturedCampaignListContainer>
  );
};

export default FeaturedCampaignList;
