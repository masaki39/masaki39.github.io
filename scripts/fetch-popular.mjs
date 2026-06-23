#!/usr/bin/env node
// Fetch the most-viewed pages (last 30 days) from Google Analytics 4 and write them to
// the popular-posts plugin's data file. Run on CI before `quartz build`; the PopularPosts
// component reads this file at render time.
//
// Requires env: GA_CREDENTIALS (service-account JSON), GA_PROPERTY_ID.

import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"

const OUT = "quartz-plugins/popular-posts/data/popular-posts.json"

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

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(posts, null, 2))
console.log(`Written ${posts.length} popular posts to ${OUT}`)
