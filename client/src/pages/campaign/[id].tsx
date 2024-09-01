import CampaignDetails from "@/components/Campaign/CampaignDetails";
import useFetchCampaignById from "@/utils/campaign/hooks/useFetchCampaignById";
import { useRouter } from "next/router";

export default function CampaignById() {
  const router = useRouter();
  const { query } = router;
  const { data, loading } = useFetchCampaignById(query.id as unknown as number);

  if (loading) return <p>Loading...</p>;
  if (!loading && !data) return <p>No data found</p>;
  return <CampaignDetails campaign={data!!} />;
}
