

const Skeleton = () => {
  return (
    <div>
        <div role="status" className="max-w-sm animate-pulse mt-12">
            <div className="h-2.5 bg-gray-200 rounded-full w-[28rem] mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default Skeleton