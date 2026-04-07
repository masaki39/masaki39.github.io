import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { writeFileSync } from "fs"

const credentials = JSON.parse(process.env.GA_CREDENTIALS)
const propertyId = process.env.GA_PROPERTY_ID

const client = new BetaAnalyticsDataClient({ credentials })

const [response] = await client.runReport({
  property: `properties/${propertyId}`,
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "screenPageViews" }],
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  limit: 20,
})

const posts = (response.rows ?? [])
  .map((row) => ({
    path: row.dimensionValues[0].value,
    views: parseInt(row.metricValues[0].value, 10),
  }))
  .filter((p) => {
    const path = p.path
    return (
      path !== "/" &&
      !path.startsWith("/tags") &&
      !path.endsWith(".xml") &&
      !path.endsWith(".json") &&
      !path.endsWith("/")
    )
  })
  .slice(0, 10)

writeFileSync("quartz/data/popular-posts.json", JSON.stringify(posts, null, 2))
console.log(`Written ${posts.length} popular posts`)
