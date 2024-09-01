import useFetchAllCampaign from "@/utils/campaign/hooks/useFetchAllCampaign";
import { LandingContainer, LandingTitle } from "./style";
import FeaturedCampaignList from "@/components/Campaign/FeaturedCampaignList";

const LandingView = () => {
  const { data, loading } = useFetchAllCampaign();

  return (
    <LandingContainer>
      <LandingTitle>Featured Campaigns (by latest)</LandingTitle>
      {loading ? <p>loading</p> : <FeaturedCampaignList campaigns={data} />}
    </LandingContainer>
  );
};

export default LandingView;
