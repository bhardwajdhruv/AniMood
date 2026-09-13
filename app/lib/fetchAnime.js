import { moodGenres } from "./moodGenres"

const ANILIST_URL = "https://graphql.anilist.co"

export async function fetchAnimeByMood(mood) {
  const genre = moodGenres[mood] || moodGenres["Happy"]

  const query = `
    query ($genre: String) {
      Page(page: 1, perPage: 12) {
        media(genre: $genre, type: ANIME, sort: SCORE_DESC, isAdult: false) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          averageScore
          episodes
          status
          startDate {
            year
          }
          description(asHtml: false)
          genres
        }
      }
    }
  `

  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { genre: genre.genre } }),
    next: { revalidate: 3600 }
  })

  if (!res.ok) throw new Error("Failed to fetch anime")

  const data = await res.json()
  const anime = data.data.Page.media.map(item => ({
    mal_id: item.id,
    title: item.title.romaji,
    title_english: item.title.english,
    images: { jpg: { large_image_url: item.coverImage.large } },
    score: item.averageScore ? (item.averageScore / 10).toFixed(1) : null,
    episodes: item.episodes,
    status: item.status,
    year: item.startDate?.year,
    synopsis: item.description?.replace(/<[^>]+>/g, '') || "No synopsis available.",
    genres: item.genres?.map((g, i) => ({ mal_id: i, name: g })),
  }))

  return { anime, label: genre.label }
}

export async function fetchAnimeById(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
        episodes
        status
        startDate {
          year
        }
        description(asHtml: false)
        genres
      }
    }
  `

  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: parseInt(id) } }),
    cache: "no-store"
  })

  if (!res.ok) throw new Error("Failed to fetch anime details")

  const data = await res.json()
  const item = data.data.Media

  return {
    mal_id: item.id,
    title: item.title.romaji,
    title_english: item.title.english,
    images: { jpg: { large_image_url: item.coverImage.large } },
    score: item.averageScore ? (item.averageScore / 10).toFixed(1) : null,
    episodes: item.episodes,
    status: item.status,
    year: item.startDate?.year,
    synopsis: item.description?.replace(/<[^>]+>/g, '') || "No synopsis available.",
    genres: item.genres?.map((g, i) => ({ mal_id: i, name: g })),
  }
}