export default function Loading() {
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-gray-100 dark:bg-card z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary dark:border-card"></div>
    </div>
  );
}
