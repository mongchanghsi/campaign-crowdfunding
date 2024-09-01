import { CAMPAIGN } from "@/utils/campaign/type";
import { CampaignDetailsContainer } from "./style";
import { FC } from "react";

interface IProps {
  campaign: CAMPAIGN;
}

const CampaignDetails: FC<IProps> = ({ campaign }) => {
  return (
    <CampaignDetailsContainer>
      <p>{campaign.title}</p>
    </CampaignDetailsContainer>
  );
};

export default CampaignDetails;
