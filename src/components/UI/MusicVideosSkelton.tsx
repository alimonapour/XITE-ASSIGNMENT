export const CardSkeleton = () => {
  return (
    <div className='w-full rounded overflow-hidden shadow-lg'>
      <div className='w-full h-64 bg-gray-300 animate-pulse'></div>
      <div className='flex flex-col items-center px-6 py-4 '>
        <div className=' mb-2 w-64 h-12 bg-gray-300 animate-pulse'>
          <h1 className='w-full text-center text-base'>{}</h1>
          <h2 className='text-sm tracking-tighter mt-1 text-center'>{}</h2>
        </div>
      </div>
    </div>
  )
}

export const MusicVideosSkeleton = () => {
  const skeletonRange = Array.from(Array(10).keys()).map((n) => n + 1)

  return (
    <div className='grid grid-cols-16 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse'>
      {skeletonRange.map((num) => {
        return <CardSkeleton key={num} />
      })}
    </div>
  )
}
