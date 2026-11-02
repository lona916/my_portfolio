import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '../src/data/works.json')
const envPath = path.join(__dirname, '../.env')

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  }
}

const apiKey = process.env.YOUTUBE_API_KEY
const playlistId = process.env.YOUTUBE_PLAYLIST_ID

if (!apiKey || !playlistId) {
  console.warn(
    '[fetch-works] YOUTUBE_API_KEY / YOUTUBE_PLAYLIST_ID not set — keeping existing src/data/works.json as-is.',
  )
  process.exit(0)
}

async function fetchAllItems() {
  const items = []
  let pageToken = ''
  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`YouTube API error ${res.status}: ${await res.text()}`)
    }
    const data = await res.json()
    items.push(...data.items)
    pageToken = data.nextPageToken ?? ''
  } while (pageToken)
  return items
}

try {
  const items = await fetchAllItems()
  const videos = items
    .filter(
      (item) =>
        item.snippet?.resourceId?.videoId &&
        item.snippet.title !== 'Private video' &&
        item.snippet.title !== 'Deleted video',
    )
    .sort((a, b) => a.snippet.position - b.snippet.position)
    .map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
    }))

  writeFileSync(outPath, `${JSON.stringify(videos, null, 2)}\n`)
  console.log(`[fetch-works] wrote ${videos.length} video(s) to src/data/works.json`)
} catch (err) {
  console.warn(`[fetch-works] fetch failed (${err.message}) — keeping existing src/data/works.json as-is.`)
}
