import { moodGenres } from "./moodGenres"

export async function fetchAnimeByMood(mood) {
  const genre = moodGenres[mood] || moodGenres["Happy"]

  const res = await fetch(
    `https://api.jikan.moe/v4/anime?genres=${genre.ids}&limit=12&order_by=score&sort=desc&sfw=true`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch anime")
  }

  const data = await res.json()
  return { anime: data.data, label: genre.label }
}

export async function fetchAnimeById(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/full`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch anime details")
  }

  const data = await res.json()
  return data.data
}