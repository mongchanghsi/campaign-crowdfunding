import { useState } from "react";
import {
  CreateCampaignFormButton,
  CreateCampaignFormContainer,
  CreateCampaignFormContent,
  CreateCampaignFormField,
  CreateCampaignFormInput,
  CreateCampaignFormLabel,
  CreateCampaignFormTextarea,
} from "./style";
import { toast } from "react-hot-toast";
import campaignContract from "@/utils/campaign";

const CreateCampaignForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [goal, setGoal] = useState<string>("0");
  const [endDate, setEndDate] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const reset = () => {
    setTitle("");
    setDescription("");
    setGoal("0");
    setEndDate("");
  };

  const validate = () => {
    console.log("Validating");
    let hasError = false;
    if (!title) {
      toast.error("Missing title");
      hasError = true;
    }
    if (!description) {
      toast.error("Missing description");
      hasError = true;
    }
    if (+goal <= 0) {
      toast.error("Goal must be a positive value");
      hasError = true;
    }
    if (!endDate) {
      toast.error("Missing end date");
      hasError = true;
    }

    if (endDate) {
      const currentDate = new Date();
      const goalDate = new Date(endDate);
      if (goalDate <= currentDate) {
        toast.error("End date must be after today");
        hasError = true;
      }
    }

    return hasError;
  };

  // TODO: Fix typing
  const submit = async (e: any) => {
    e.preventDefault();

    if (validate()) return;

    if (!endDate) return;
    setSubmitting(true);
    const _endDate = +new Date(endDate) / 1000;
    const txnHash = await campaignContract.createCampaign(
      title,
      description,
      goal,
      _endDate
    );
    if (txnHash) {
      toast.success("Campaign created!");
      reset();
    } else {
      toast.success("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <CreateCampaignFormContainer>
      <CreateCampaignFormContent>
        <CreateCampaignFormField>
          <CreateCampaignFormLabel htmlFor="title">
            Title
          </CreateCampaignFormLabel>
          <CreateCampaignFormInput
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </CreateCampaignFormField>

        <CreateCampaignFormField>
          <CreateCampaignFormLabel htmlFor="description">
            Description
          </CreateCampaignFormLabel>
          <CreateCampaignFormTextarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CreateCampaignFormField>

        <CreateCampaignFormField>
          <CreateCampaignFormLabel htmlFor="goal">
            Goal (ETH)
          </CreateCampaignFormLabel>
          <CreateCampaignFormInput
            type="number"
            id="goal"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </CreateCampaignFormField>

        <CreateCampaignFormField>
          <CreateCampaignFormLabel htmlFor="endDate">
            Date
          </CreateCampaignFormLabel>
          <CreateCampaignFormInput
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </CreateCampaignFormField>
        {submitting ? (
          <p>Loading</p>
        ) : (
          <CreateCampaignFormButton type="submit" onClick={submit}>
            Create
          </CreateCampaignFormButton>
        )}
      </CreateCampaignFormContent>
    </CreateCampaignFormContainer>
  );
};

export default CreateCampaignForm;
