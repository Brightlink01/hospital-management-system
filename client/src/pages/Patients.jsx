import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PatientTable from "../components/PatientTable";

export default function Patients() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
    },
    {
      id: 2,
      name: "Sarah Smith",
      age: 25,
      gender: "Female",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [editingPatient, setEditingPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();

    if (editingPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editingPatient.id
          ? {
              ...patient,
              ...formData,
            }
          : patient
      );

      setPatients(updatedPatients);

      setEditingPatient(null);
    } else {
      const newPatient = {
        id: patients.length + 1,
        ...formData,
      };

      setPatients([...patients, newPatient]);
    }

    setFormData({
      name: "",
      age: "",
      gender: "",
    });

    setShowModal(false);
  };

  const handleDeletePatient = (id) => {
    const filteredPatients = patients.filter(
      (patient) => patient.id !== id
    );

    setPatients(filteredPatients);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);

    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
    });

    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Patients
        </h1>

        <button
          onClick={() => {
            setEditingPatient(null);

            setFormData({
              name: "",
              age: "",
              gender: "",
            });

            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Patient
        </button>
      </div>

      <PatientTable
        patients={patients}
        onDelete={handleDeletePatient}
        onEdit={handleEditPatient}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editingPatient
                ? "Edit Patient"
                : "Add Patient"}
            </h2>

            <form
              onSubmit={handleAddPatient}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingPatient
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}