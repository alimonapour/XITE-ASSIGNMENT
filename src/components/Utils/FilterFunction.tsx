interface MusicVideoType {
  id: number
  artist: string
  title: string
  release_year: number
  genre_id: number
  image_url: string
}

interface GenreOptionData {
  value: number
  label: string
}

interface YearOptionData {
  value: number
  label: number
}

export function filterMusicVideos(
  allMusicVideos: MusicVideoType[],
  releaseYearsFilter: readonly YearOptionData[],
  genresFilter: readonly GenreOptionData[],
  query: string,
) {
  let filteredList = allMusicVideos
  if (genresFilter?.length > 0) {
    filteredList = filteredList.filter((musicVideo) =>
      genresFilter.find((i) => i.value === musicVideo.genre_id),
    )
  }

  if (releaseYearsFilter?.length > 0) {
    filteredList = filteredList.filter((musicVideo) =>
      releaseYearsFilter.find((i) => i.value === musicVideo.release_year),
    )
  }

  if (query?.length > 0) {
    filteredList = filteredList.filter(({ artist, title }) => {
      return Object.values({ artist, title }).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase()),
      )
    })
  }
  return filteredList
}
