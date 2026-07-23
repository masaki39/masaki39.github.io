#!/usr/bin/env node
// Fetch the most-viewed pages for last calendar month from Google Analytics 4 and write
// them to the popular-posts plugin's data file. Run on CI before `quartz build`; the
// PopularPosts component reads this file at render time.
//
// Requires env: GA_CREDENTIALS (service-account JSON), GA_PROPERTY_ID.

import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"

const OUT = "quartz-plugins/popular-posts/data/popular-posts.json"

const credentials = JSON.parse(process.env.GA_CREDENTIALS)
const propertyId = process.env.GA_PROPERTY_ID

// Compute the first and last day of the previous calendar month (in UTC) so the
// ranking always reflects "last month", regardless of when this script runs.
const now = new Date()
const firstOfLastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
const lastOfLastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0))
const toISODate = (d) => d.toISOString().slice(0, 10)
const month = toISODate(firstOfLastMonth).slice(0, 7) // "YYYY-MM"

const client = new BetaAnalyticsDataClient({ credentials })

const [response] = await client.runReport({
  property: `properties/${propertyId}`,
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "screenPageViews" }],
  dateRanges: [{ startDate: toISODate(firstOfLastMonth), endDate: toISODate(lastOfLastMonth) }],
  orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  limit: 50,
})

const rows = (response.rows ?? [])
  .map((row) => ({
    path: row.dimensionValues[0].value,
    views: parseInt(row.metricValues[0].value, 10),
  }))
  .filter((p) => {
    const path = decodeURIComponent(p.path)
    return (
      path !== "/" &&
      !path.startsWith("/tags") &&
      !path.endsWith(".xml") &&
      !path.endsWith(".json") &&
      !path.endsWith(".base") &&
      !path.endsWith("/")
    )
  })

// Same article can appear as multiple GA rows (case/Unicode-normalization/query
// string variants of the same URL); merge them before ranking so the output list
// has no duplicate articles.
const normPath = (p) => decodeURIComponent(p).normalize("NFC").toLowerCase()
const merged = new Map()
for (const row of rows) {
  const key = normPath(row.path)
  const existing = merged.get(key)
  if (existing) {
    existing.views += row.views
  } else {
    merged.set(key, { ...row })
  }
}

const posts = [...merged.values()]
  .sort((a, b) => b.views - a.views)
  .slice(0, 10)

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ month, posts }, null, 2))
console.log(`Written ${posts.length} popular posts for ${month} to ${OUT}`)
