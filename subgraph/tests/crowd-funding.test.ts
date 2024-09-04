import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CampaignCreated } from "../generated/schema"
import { CampaignCreated as CampaignCreatedEvent } from "../generated/CrowdFunding/CrowdFunding"
import { handleCampaignCreated } from "../src/crowd-funding"
import { createCampaignCreatedEvent } from "./crowd-funding-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let campaignId = BigInt.fromI32(234)
    let campaignCreator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let title = "Example string value"
    let newCampaignCreatedEvent = createCampaignCreatedEvent(
      campaignId,
      campaignCreator,
      title
    )
    handleCampaignCreated(newCampaignCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CampaignCreated created and stored", () => {
    assert.entityCount("CampaignCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CampaignCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "campaignId",
      "234"
    )
    assert.fieldEquals(
      "CampaignCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "campaignCreator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
