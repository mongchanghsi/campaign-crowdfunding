import { useEffect, useState } from "react";
import campaignContract from "..";
import { CAMPAIGN } from "../type";
import { formatEther } from "viem";

const useFetchAllCampaign = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CAMPAIGN[]>([]);

  const transformData = (data: any[]): CAMPAIGN[] => {
    return data.map((_data) => {
      return {
        campaignId: Number(_data.id),
        title: _data.title,
        description: _data.description,
        goal: +formatEther(_data.goal),
        currentContribution: +formatEther(_data.totalContributions),
        contributors: _data.contributors,
        contributibutionAmounts: _data.contributionAmounts,
        endDate: Number(_data.endsAt),
        campaignCreator: _data.campaignCreator,
      };
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const data: any = await campaignContract.getCampaigns();
    const processed = transformData(data);
    setData(processed);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchAllCampaign;
