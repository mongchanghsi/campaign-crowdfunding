import { CAMPAIGN } from "@/utils/campaign/type";
import {
  CampaignDetailsButton,
  CampaignDetailsContainer,
  CampaignDetailsDescription,
  CampaignDetailsField,
  CampaignDetailsFieldInput,
  CampaignDetailsLabel,
  CampaignDetailsTitle,
} from "./style";
import { FC, useState } from "react";
import ProgressBar from "@/components/Shared/ProgressBar";
import { getDaysLeft } from "@/utils/date";
import { useAccount } from "wagmi";
import campaignContract from "@/utils/campaign";
import toast from "react-hot-toast";

interface IProps {
  campaign: CAMPAIGN;
}

const CampaignDetails: FC<IProps> = ({ campaign }) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    setAmount("0");
  };

  const donate = async () => {
    setLoading(true);
    const txnHash = await campaignContract.donate(
      campaign.campaignId - 1,
      amount
    );
    if (txnHash) {
      toast.success("Donated successfully!");
      // TODO: Add a refetch of campaign data
      reset();
    } else {
      toast.success("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <CampaignDetailsContainer>
      <CampaignDetailsTitle>{campaign.title}</CampaignDetailsTitle>
      <CampaignDetailsDescription>
        {campaign.description}
      </CampaignDetailsDescription>
      <ProgressBar
        currentValue={campaign.currentContribution}
        maxValue={campaign.goal}
        round={2}
        currency={"ETH"}
      />
      <CampaignDetailsLabel>
        Creator: {campaign.campaignCreator}
      </CampaignDetailsLabel>
      <CampaignDetailsLabel>
        Days Left: {getDaysLeft(campaign.endDate)} days
      </CampaignDetailsLabel>
      <CampaignDetailsField>
        <CampaignDetailsLabel>Donate</CampaignDetailsLabel>
        <CampaignDetailsFieldInput
          type="number"
          name="goal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {address ? (
          <>
            {loading ? (
              <CampaignDetailsButton disabled>Loading</CampaignDetailsButton>
            ) : (
              <CampaignDetailsButton onClick={donate}>
                Donate
              </CampaignDetailsButton>
            )}
          </>
        ) : (
          <CampaignDetailsButton disabled>Not Connected</CampaignDetailsButton>
        )}
      </CampaignDetailsField>
    </CampaignDetailsContainer>
  );
};

export default CampaignDetails;
