import { useEffect, useState } from "react";
import campaignContract from "..";
import { CAMPAIGN } from "../type";
import { formatEther } from "viem";

const useFetchCampaignById = (campaignId: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CAMPAIGN | null>(null);

  const transformData = (data: any[]): CAMPAIGN => {
    return {
      campaignId: Number(data[0]),
      title: data[2],
      description: data[3],
      goal: +formatEther(data[4]),
      currentContribution: +formatEther(data[8]),
      contributors: data[9],
      contributibutionAmounts: data[10],
      endDate: Number(data[6]),
      campaignCreator: data[1],
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const data: any = await campaignContract.getCampaignById(campaignId);
    setData(data ? transformData(data) : null);
    setLoading(false);
  };

  useEffect(() => {
    if (campaignId) {
      console.log("Fetching Data");
      fetchData();
    }
  }, [campaignId]);

  return { data, loading };
};

export default useFetchCampaignById;
