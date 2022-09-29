import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollEnd } from './useScrollEnd'

const PAGE_SIZE = 20

interface MusicVideoType {
  id: number
  artist: string
  title: string
  release_year: number
  genre_id: number
  image_url: string
}

type Items = MusicVideoType[]

export function useLazyLoad(
  items: Items,
  loaderTriggerElement: HTMLElement | null,
) {
  const lastItems = useRef<{} | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPagesCount = items?.length
  const isLastPage = totalPagesCount === currentPage || totalPagesCount === 0

  const onScrollEnd = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, isLastPage])

  useEffect(() => {
    if (lastItems.current !== items) {
      setCurrentPage(1)
      lastItems.current = items
    }
  }, [items])

  useScrollEnd(loaderTriggerElement, onScrollEnd)

  const visibleItems = items?.slice(0, currentPage * PAGE_SIZE)

  return { visibleItems, currentPage, isLastPage }
}
