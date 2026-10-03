export default function MarketplaceLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-5" aria-busy="true" aria-label="Loading listings">
      <div className="h-40 rounded-[28px] bg-white" />
      <div className="h-24 rounded-3xl bg-white" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-[380px] rounded-3xl bg-white" />
        ))}
      </div>
    </div>
  );
}
