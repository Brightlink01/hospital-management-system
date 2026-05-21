export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-3xl mt-4">
        {value}
      </p>
    </div>
  );
}