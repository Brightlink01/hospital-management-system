import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Patients" value="120" />
        <StatCard title="Doctors" value="25" />
        <StatCard title="Appointments" value="48" />
      </div>
    </DashboardLayout>
  );
}