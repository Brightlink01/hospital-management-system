import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalVisits: 0,
    totalAppointments: 0,
    todayAppointments: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await api.get(
        "/patients/dashboard/stats"
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Hospital Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Overview of hospital system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium">
              Total Patients
            </h2>

            <p className="text-4xl font-bold mt-4">
              {stats.totalPatients}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium">
              Total Visits
            </h2>

            <p className="text-4xl font-bold mt-4">
              {stats.totalVisits}
            </p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium">
              Total Appointments
            </h2>

            <p className="text-4xl font-bold mt-4">
              {
                stats.totalAppointments
              }
            </p>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium">
              Today's Appointments
            </h2>

            <p className="text-4xl font-bold mt-4">
              {
                stats.todayAppointments
              }
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Welcome
          </h2>

          <p className="text-gray-600 leading-7">
            This Hospital Management
            System helps manage
            patients, appointments,
            visits, clinical notes,
            prescriptions, and vitals
            efficiently in one unified
            platform.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}