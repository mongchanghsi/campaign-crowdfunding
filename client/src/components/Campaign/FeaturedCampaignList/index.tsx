import { CAMPAIGN } from "@/utils/campaign/type";
import { FeaturedCampaignListContainer } from "./style";
import { FC } from "react";
import CampaignPreviewCard from "../CampaignPreviewCard";
import Link from "next/link";

interface IProps {
  campaigns: CAMPAIGN[];
}

const FeaturedCampaignList: FC<IProps> = ({ campaigns }) => {
  return (
    <FeaturedCampaignListContainer>
      {campaigns.map((campaign) => (
        <Link
          key={campaign.title}
          href={`/campaign/${campaign.campaignId - 1}`}
        >
          <CampaignPreviewCard campaign={campaign} />
        </Link>
      ))}
    </FeaturedCampaignListContainer>
  );
};

export default FeaturedCampaignList;
