import {
  CampaignCreated as CampaignCreatedEvent,
  CampaignDeleted as CampaignDeletedEvent,
  ContributionMade as ContributionMadeEvent,
  RefundMade as RefundMadeEvent
} from "../generated/CrowdFunding/CrowdFunding"
import {
  CampaignCreated,
  CampaignDeleted,
  ContributionMade,
  RefundMade
} from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.campaignCreator = event.params.campaignCreator
  entity.title = event.params.title

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignDeleted(event: CampaignDeletedEvent): void {
  let entity = new CampaignDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.campaignCreator = event.params.campaignCreator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContributionMade(event: ContributionMadeEvent): void {
  let entity = new ContributionMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.contributor = event.params.contributor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRefundMade(event: RefundMadeEvent): void {
  let entity = new RefundMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.contributor = event.params.contributor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
