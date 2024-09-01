import { useEffect, useState } from "react";
import campaignContract from "..";

const useFetchAllCampaign = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const data: any = await campaignContract.getCampaigns();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchAllCampaign;
