import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PatientProfile() {
  const { id } = useParams();

  const [patient, setPatient] =
    useState(null);

  const navigate = useNavigate();
  
  const [visits, setVisits] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [visitForm, setVisitForm] =
    useState({
      reason: "",
      doctor: "",
    });

  const fetchPatient = async () => {
    try {
      const response = await api.get(
        `/patients/${id}`
      );

      setPatient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVisits = async () => {
    try {
      const response = await api.get(
        `/patients/${id}/visits`
      );

      setVisits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatient();

    fetchVisits();
  }, []);

  const handleVisitChange = (e) => {
    setVisitForm({
      ...visitForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVisit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        `/patients/${id}/visits`,
        visitForm
      );

      setVisitForm({
        reason: "",
        doctor: "",
      });

      setShowModal(false);

      fetchVisits();
    } catch (error) {
      console.log(error);
    }
  };

  if (!patient) {
    return (
      <DashboardLayout>
        <p>Loading patient...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Patient Profile
            </h1>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Visit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">
                Full Name
              </p>

              <h2 className="text-xl font-semibold">
                {patient.name}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Age
              </p>

              <h2 className="text-xl font-semibold">
                {patient.age}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Gender
              </p>

              <h2 className="text-xl font-semibold">
                {patient.gender}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Patient ID
              </p>

              <h2 className="text-xl font-semibold">
                #{patient.id}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Visit History
          </h2>

          {visits.length > 0 ? (
            <div className="space-y-4">
              {visits.map((visit) => (
                
                <div
                    key={visit.id}
                    onClick={() =>
                    navigate(`/visits/${visit.id}`)
                            }   
                        className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                 >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {visit.reason}
                      </h3>

                      <p className="text-gray-500">
                        Doctor:{" "}
                        {visit.doctor}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">
                        {visit.status}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          visit.visit_date
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No visits yet
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Add Visit
            </h2>

            <form
              onSubmit={handleAddVisit}
              className="space-y-4"
            >
              <textarea
                name="reason"
                placeholder="Reason for visit"
                value={visitForm.reason}
                onChange={
                  handleVisitChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="doctor"
                placeholder="Doctor Name"
                value={visitForm.doctor}
                onChange={
                  handleVisitChange
                }
                className="w-full border p-3 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}