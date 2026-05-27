import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

export default function VisitDetails() {
  const { visitId } = useParams();

  const [notes, setNotes] = useState([]);

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [vitals, setVitals] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [
    showPrescriptionModal,
    setShowPrescriptionModal,
  ] = useState(false);

  const [showVitalsModal, setShowVitalsModal] =
    useState(false);

  const [formData, setFormData] =
    useState({
      symptoms: "",
      diagnosis: "",
      prescription: "",
      treatment_plan: "",
    });

  const [
    prescriptionForm,
    setPrescriptionForm,
  ] = useState({
    medication_name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const [vitalsForm, setVitalsForm] =
    useState({
      blood_pressure: "",
      temperature: "",
      pulse: "",
      respiratory_rate: "",
      oxygen_saturation: "",
      weight: "",
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

  const fetchPrescriptions =
    async () => {
      try {
        const response = await api.get(
          `/patients/visits/${visitId}/prescriptions`
        );

        setPrescriptions(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchVitals = async () => {
    try {
      const response = await api.get(
        `/patients/visits/${visitId}/vitals`
      );

      setVitals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();

    fetchPrescriptions();

    fetchVitals();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrescriptionChange = (
    e
  ) => {
    setPrescriptionForm({
      ...prescriptionForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleVitalsChange = (e) => {
    setVitalsForm({
      ...vitalsForm,
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

  const handleAddPrescription =
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          `/patients/visits/${visitId}/prescriptions`,
          prescriptionForm
        );

        setPrescriptionForm({
          medication_name: "",
          dosage: "",
          frequency: "",
          duration: "",
          notes: "",
        });

        setShowPrescriptionModal(
          false
        );

        fetchPrescriptions();
      } catch (error) {
        console.log(error);
      }
    };

  const handleAddVitals = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        `/patients/visits/${visitId}/vitals`,
        vitalsForm
      );

      setVitalsForm({
        blood_pressure: "",
        temperature: "",
        pulse: "",
        respiratory_rate: "",
        oxygen_saturation: "",
        weight: "",
      });

      setShowVitalsModal(false);

      fetchVitals();
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
                      {
                        note.treatment_plan
                      }
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

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Prescriptions
            </h1>

            <button
              onClick={() =>
                setShowPrescriptionModal(
                  true
                )
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Prescription
            </button>
          </div>

          {prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map(
                (prescription) => (
                  <div
                    key={prescription.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">
                        {
                          prescription.medication_name
                        }
                      </h2>

                      <p>
                        <strong>
                          Dosage:
                        </strong>{" "}
                        {
                          prescription.dosage
                        }
                      </p>

                      <p>
                        <strong>
                          Frequency:
                        </strong>{" "}
                        {
                          prescription.frequency
                        }
                      </p>

                      <p>
                        <strong>
                          Duration:
                        </strong>{" "}
                        {
                          prescription.duration
                        }
                      </p>

                      <p>
                        <strong>
                          Notes:
                        </strong>{" "}
                        {
                          prescription.notes
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          prescription.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              No prescriptions yet
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Vitals
            </h1>

            <button
              onClick={() =>
                setShowVitalsModal(true)
              }
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Add Vitals
            </button>
          </div>

          {vitals.length > 0 ? (
            <div className="space-y-4">
              {vitals.map((vital) => (
                <div
                  key={vital.id}
                  className="border rounded-lg p-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>
                        Blood Pressure:
                      </strong>{" "}
                      {
                        vital.blood_pressure
                      }
                    </p>

                    <p>
                      <strong>
                        Temperature:
                      </strong>{" "}
                      {vital.temperature}
                    </p>

                    <p>
                      <strong>
                        Pulse:
                      </strong>{" "}
                      {vital.pulse}
                    </p>

                    <p>
                      <strong>
                        Respiratory Rate:
                      </strong>{" "}
                      {
                        vital.respiratory_rate
                      }
                    </p>

                    <p>
                      <strong>
                        Oxygen Saturation:
                      </strong>{" "}
                      {
                        vital.oxygen_saturation
                      }
                    </p>

                    <p>
                      <strong>
                        Weight:
                      </strong>{" "}
                      {vital.weight}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    {new Date(
                      vital.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No vitals recorded yet
            </p>
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
                value={
                  formData.treatment_plan
                }
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

      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[600px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Add Prescription
            </h2>

            <form
              onSubmit={
                handleAddPrescription
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="medication_name"
                placeholder="Medication Name"
                value={
                  prescriptionForm.medication_name
                }
                onChange={
                  handlePrescriptionChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                value={
                  prescriptionForm.dosage
                }
                onChange={
                  handlePrescriptionChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="frequency"
                placeholder="Frequency"
                value={
                  prescriptionForm.frequency
                }
                onChange={
                  handlePrescriptionChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={
                  prescriptionForm.duration
                }
                onChange={
                  handlePrescriptionChange
                }
                className="w-full border p-3 rounded"
              />

              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={
                  prescriptionForm.notes
                }
                onChange={
                  handlePrescriptionChange
                }
                className="w-full border p-3 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowPrescriptionModal(
                      false
                    )
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVitalsModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[600px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Add Vitals
            </h2>

            <form
              onSubmit={handleAddVitals}
              className="space-y-4"
            >
              <input
                type="text"
                name="blood_pressure"
                placeholder="Blood Pressure"
                value={
                  vitalsForm.blood_pressure
                }
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="temperature"
                placeholder="Temperature"
                value={
                  vitalsForm.temperature
                }
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="pulse"
                placeholder="Pulse"
                value={vitalsForm.pulse}
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="respiratory_rate"
                placeholder="Respiratory Rate"
                value={
                  vitalsForm.respiratory_rate
                }
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="oxygen_saturation"
                placeholder="Oxygen Saturation"
                value={
                  vitalsForm.oxygen_saturation
                }
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="weight"
                placeholder="Weight"
                value={vitalsForm.weight}
                onChange={
                  handleVitalsChange
                }
                className="w-full border p-3 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowVitalsModal(
                      false
                    )
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}