import ENVIRONMENT from "@/configuration/environment";
import { gql, request } from "graphql-request";

const document = gql`
  {
    campaignCreateds {
      id
      campaignId
      campaignCreator
      title
    }
  }
`;

const fetchCampaigns = async (): Promise<any[]> => {
  try {
    const data: any = await request(ENVIRONMENT.subgraphUrl, document);
    return data.campaignCreateds;
  } catch (error) {
    return [];
  }
};

export default fetchCampaigns;
