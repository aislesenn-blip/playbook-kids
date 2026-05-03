export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm animate-pulse h-full flex flex-col">
      <div className="h-48 w-full bg-gray-200"></div>
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function HorizontalListSkeleton() {
  return (
    <div className="flex overflow-x-hidden gap-4 sm:gap-6 pb-4">
       {[1, 2, 3, 4].map((i) => (
         <div key={i} className="min-w-[240px] sm:min-w-[280px] shrink-0">
           <ProductCardSkeleton />
         </div>
       ))}
    </div>
  );
}
