export default function Loading() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-base-300 via-base-200 to-base-100 flex justify-center items-center z-50">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
}
