import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

export default function VisitDetails() {
  const { visitId } = useParams();

  const [notes, setNotes] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({
      symptoms: "",
      diagnosis: "",
      prescription: "",
      treatment_plan: "",
    });

  const fetchNotes = async () => {
    try {
      const response = await api.get(
        `/patients/visits/${visitId}/notes`
      );

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        `/patients/visits/${visitId}/notes`,
        formData
      );

      setFormData({
        symptoms: "",
        diagnosis: "",
        prescription: "",
        treatment_plan: "",
      });

      setShowModal(false);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Clinical Notes
            </h1>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold text-lg">
                      Symptoms
                    </h2>

                    <p className="text-gray-700">
                      {note.symptoms}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      Diagnosis
                    </h2>

                    <p className="text-gray-700">
                      {note.diagnosis}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      Prescription
                    </h2>

                    <p className="text-gray-700">
                      {note.prescription}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      Treatment Plan
                    </h2>

                    <p className="text-gray-700">
                      {note.treatment_plan}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(
                      note.created_at
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                No clinical notes yet
              </p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[600px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Add Clinical Note
            </h2>

            <form
              onSubmit={handleAddNote}
              className="space-y-4"
            >
              <textarea
                name="symptoms"
                placeholder="Symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                name="diagnosis"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                name="prescription"
                placeholder="Prescription"
                value={formData.prescription}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                name="treatment_plan"
                placeholder="Treatment Plan"
                value={formData.treatment_plan}
                onChange={handleChange}
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
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}