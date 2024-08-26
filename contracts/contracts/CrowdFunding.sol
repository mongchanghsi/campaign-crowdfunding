// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CrowdFunding {
    address public immutable owner;
    uint private nextCampaignId = 1;
    Campaign[] public campaigns;

    // Flag to prevent reentrant calls
    bool private locked;

    // Modifier to prevent reentrant calls
    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    struct Campaign {
        uint id;
        address campaignCreator;
        string title;
        string description;
        uint goal;
        uint startsAt;
        uint endsAt;
        STATUS status;
        uint totalContributions;
        address[] contributors;
        uint[] contributionAmounts;
    }

    enum STATUS {
        ACTIVE,
        DELETED,
        SUCCESSFUL,
        UNSUCCEEDED
    }

    event CampaignCreated(
        uint indexed campaignId,
        address campaignCreator,
        string title,
        STATUS status
    );
    event CampaignDeleted(
        uint indexed campaignId,
        address campaignCreator,
        STATUS status
    );
    event ContributionMade(
        uint indexed campaignId,
        address contributor,
        uint amount
    );
    event RefundMade(uint indexed campaignId, address contributor, uint amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getCampaign(
        uint campaignId
    )
        public
        view
        returns (
            uint id,
            address campaignCreator,
            string memory title,
            string memory description,
            uint goal,
            uint startsAt,
            uint endsAt,
            STATUS status,
            uint totalContributions,
            address[] memory contributors,
            uint[] memory contributionAmounts
        )
    {
        Campaign memory campaign = campaigns[campaignId];
        return (
            campaign.id,
            campaign.campaignCreator,
            campaign.title,
            campaign.description,
            campaign.goal,
            campaign.startsAt,
            campaign.endsAt,
            campaign.status,
            campaign.totalContributions,
            campaign.contributors,
            campaign.contributionAmounts
        );
    }

    function getLatestCampaigns() public view returns (Campaign[] memory) {
        // Return the latest 3 campaigns
        require(campaigns.length > 0, "No campaigns found.");

        uint startIndex = campaigns.length > 3 ? campaigns.length - 3 : 0;
        uint campaignCount = campaigns.length - startIndex;

        Campaign[] memory latestCampaigns = new Campaign[](campaignCount);

        for (uint i = 0; i < campaignCount; i++) {
            latestCampaigns[i] = campaigns[campaigns.length - 1 - i];
        }

        return latestCampaigns;
    }

    function createCampaign(
        string memory title,
        string memory description,
        uint goal,
        uint endsAt
    ) public {
        require(bytes(title).length > 0, "Title must not be empty");
        require(bytes(description).length > 0, "Description must not be empty");
        require(goal > 0, "Goal must be greater than zero");
        require(
            endsAt > block.timestamp,
            "Ends time must be greater than the current time"
        );

        // Create a new campaign and add it to the array
        campaigns.push(
            Campaign(
                nextCampaignId,
                msg.sender,
                title,
                description,
                goal,
                block.timestamp,
                endsAt,
                STATUS.ACTIVE,
                0,
                new address[](0),
                new uint[](0)
            )
        );

        emit CampaignCreated(
            nextCampaignId - 1,
            msg.sender,
            title,
            STATUS.ACTIVE
        );

        nextCampaignId++;
    }

    function contribute(uint campaignId) public payable nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.value > 0, "Contribution amount must be greater than zero");
        uint remainingFundsNeeded = campaign.goal - campaign.totalContributions;

        if (msg.value <= remainingFundsNeeded) {
            campaign.totalContributions += msg.value;
        } else {
            uint excessAmount = msg.value - remainingFundsNeeded;

            payable(msg.sender).transfer(excessAmount);

            campaign.totalContributions += remainingFundsNeeded;

            if (campaign.totalContributions >= campaign.goal) {
                campaign.status = STATUS.SUCCESSFUL;
            }
        }

        campaign.contributors.push(msg.sender);
        campaign.contributionAmounts.push(msg.value);

        emit ContributionMade(campaignId, msg.sender, msg.value);
    }

    function deleteCampaign(uint campaignId) public {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.campaignCreator == msg.sender);

        refund(campaignId);

        campaign.status = STATUS.DELETED;
        emit CampaignDeleted(campaignId, msg.sender, STATUS.DELETED);
    }

    function refund(uint campaignId) internal {
        Campaign storage campaign = campaigns[campaignId];

        for (uint i = 0; i < campaign.contributors.length; i++) {
            address contributor = campaign.contributors[i];
            uint contributionAmount = campaign.contributionAmounts[i];

            payable(contributor).transfer(contributionAmount);

            campaign.totalContributions -= contributionAmount;
            emit RefundMade(campaignId, contributor, contributionAmount);
        }
    }
}
