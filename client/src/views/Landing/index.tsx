import useFetchAllCampaign from "@/utils/campaign/hooks/useFetchAllCampaign";
import {
  LandingButton,
  LandingContainer,
  LandingHeader,
  LandingTitle,
} from "./style";
import FeaturedCampaignList from "@/components/Campaign/FeaturedCampaignList";
import Link from "next/link";

const LandingView = () => {
  const { data, loading } = useFetchAllCampaign();

  return (
    <LandingContainer>
      <LandingHeader>
        <LandingTitle>Featured Campaigns</LandingTitle>
        <Link href="/campaign/create">
          <LandingButton>Create Campaign</LandingButton>
        </Link>
      </LandingHeader>
      {loading ? <p>loading</p> : <FeaturedCampaignList campaigns={data} />}
    </LandingContainer>
  );
};

export default LandingView;
