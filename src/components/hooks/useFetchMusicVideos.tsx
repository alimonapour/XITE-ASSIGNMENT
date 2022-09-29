import useSWR from 'swr'

const apiUrl =
  'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export function useFetchData() {
  const { data, error } = useSWR(apiUrl, fetcher)
  return {
    allMusicVideos: data?.videos,
    allGenres: data?.genres,
    isLoading: !error && !data,
    isError: error,
  }
}
