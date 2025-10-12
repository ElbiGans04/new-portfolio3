export default function LoadingComponents() {
  return (
    <div className="flex gap-5 items-center">
      <div className="bg-brand-dark dark:bg-white text-brand-text-dark dark:text-brand-text-light animate-pulse p-4 rounded">
        <p className="font-bold">Loading...</p>
      </div>
    </div>
  );
}
