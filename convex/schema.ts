// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  trips: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    budget: v.optional(v.number()),
    creatorId: v.id("users"),
    tripCode: v.string(),
    createdAt: v.number(),
  })
    .index("by_creator", ["creatorId"])
    .index("by_trip_code", ["tripCode"]),

  tripMembers: defineTable({
    tripId: v.id("trips"),
    userId: v.id("users"),
    joinedAt: v.number(),
  })
    .index("by_trip", ["tripId"])
    .index("by_user", ["userId"])
    .index("by_trip_and_user", ["tripId", "userId"]),

  activities: defineTable({
    tripId: v.id("trips"),
    title: v.string(),
    date: v.string(),
    time: v.optional(v.string()),
    category: v.union(
      v.literal("Adventure"),
      v.literal("Food"),
      v.literal("Sightseeing"),
      v.literal("Other")
    ),
    cost: v.optional(v.number()),
    notes: v.optional(v.string()),
    creatorId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_trip", ["tripId"])
    .index("by_date", ["date"])
    .index("by_trip_and_date", ["tripId", "date"]),

  votes: defineTable({
    activityId: v.id("activities"),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_activity", ["activityId"])
    .index("by_user", ["userId"])
    .index("by_activity_and_user", ["activityId", "userId"]),
});
