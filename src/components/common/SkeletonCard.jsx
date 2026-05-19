const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 border border-neutral-200 dark:border-neutral-800 shadow-soft overflow-hidden">
      <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 rounded-2xl mb-5 animate-pulse"></div>
      <div className="space-y-3">
        <div className="h-5 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-3/4 animate-pulse"></div>
        <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-1/2 animate-pulse"></div>
        <div className="pt-4 flex justify-between items-center">
          <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-20 animate-pulse"></div>
          <div className="h-8 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;