import React from 'react'
import Select from 'react-select'
import { useFetchData } from './hooks/useFetchMusicVideos'
import MusicVideosList from './MusicVideosList'
import ScrollButton from './UI/ScrollToTopButton'
import { MusicVideosSkeleton } from './UI/MusicVideosSkelton'
import { filterMusicVideos } from './Utils/FilterFunction'

interface GenreOptionData {
  value: number
  label: string
}

interface YearOptionData {
  value: number
  label: number
}

type Years = {
  value: any
  label: any
}

const MainPage = () => {
  const [query, setQuery] = React.useState('')
  const [genresFilter, setGenresFilter] = React.useState<
    readonly GenreOptionData[]
  >([])
  const [releaseYearsFilter, setReleaseYearsFilter] = React.useState<
    readonly YearOptionData[]
  >([])
  const { allMusicVideos, allGenres, isLoading, isError } = useFetchData()

  const musicVideosReleaseYear = Array.from(
    new Set(
      allMusicVideos?.map(
        ({ release_year }: { release_year: number }) => release_year,
      ),
    ).values(),
  )

  const filteredMusicVideos = filterMusicVideos(
    allMusicVideos,
    releaseYearsFilter,
    genresFilter,
    query,
  )

  function handleINputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setQuery(e.target.value)
  }

  let genreListItems = []
  for (let i = 0; i < allGenres?.length; i++) {
    genreListItems.push({ value: allGenres[i].id, label: allGenres[i].name })
  }

  let yearListItems: Years[] = []
  for (let i = 0; i < musicVideosReleaseYear?.length; i++) {
    yearListItems.push({
      value: musicVideosReleaseYear[i],
      label: musicVideosReleaseYear[i],
    })
  }

  const handleGenreOptionChanges = (data: readonly GenreOptionData[]) => {
    setGenresFilter(data)
  }

  const handleYearsOptionChanges = (data: readonly YearOptionData[]): void => {
    setReleaseYearsFilter(data)
  }

  return (
    <div className='py-7 space-y-7'>
      <div className='grid items-center gap-y-5 gap-x-5 grid-cols-2 xl:grid-cols-3'>
        <input
          required
          placeholder='Search music videos...'
          className='w-full py-0.5 px-2 rounded border border-[#ccc] box-border min-h-[38px] col-span-full xl:col-auto focus:border-2 outline-[#2684ff] focus:shadow-sm-[#2684ff] font-sans placeholder:text-[#808080]'
          value={query}
          type='text'
          onChange={handleINputChange}
        />
        <div className='col-span-full sm:col-auto'>
          <Select
            options={genreListItems}
            placeholder='Select genre'
            value={genresFilter}
            onChange={handleGenreOptionChanges}
            isSearchable={true}
            isMulti
          />
        </div>
        <div className='col-span-full sm:col-auto'>
          <Select
            options={yearListItems}
            placeholder='Select year'
            value={releaseYearsFilter}
            onChange={handleYearsOptionChanges}
            isSearchable={true}
            isMulti
          />
        </div>
      </div>
      {isError && (
        <div className='flex flex-col items-center justify-between text-rose-600 text-lg mt-3'>
          <pre>There was a problem.</pre>

          <pre>Please try again later.</pre>
        </div>
      )}

      {isLoading && (
        <div className='mt-3'>
          <MusicVideosSkeleton />
        </div>
      )}

      {filteredMusicVideos?.length === 0 && (
        <p className='col-span-full text-lg font-bold text-center'>
          Hmmm... There were no music videos found with this search.
          <br /> Please try another.
        </p>
      )}
      <MusicVideosList items={filteredMusicVideos} />
      <ScrollButton />
    </div>
  )
}

export default MainPage
