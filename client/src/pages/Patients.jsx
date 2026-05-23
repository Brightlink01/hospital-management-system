import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PatientTable from "../components/PatientTable";
import api from "../services/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingPatient, setEditingPatient] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const fetchPatients = async (
    searchValue = ""
  ) => {
    try {
      const response = await api.get(
        `/patients?search=${searchValue}`
      );

      setPatients(response.data);

      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        const response = await api.put(
          `/patients/${editingPatient.id}`,
          formData
        );

        const updatedPatients = patients.map(
          (patient) =>
            patient.id === editingPatient.id
              ? response.data
              : patient
        );

        setPatients(updatedPatients);
      } else {
        const response = await api.post(
          "/patients",
          formData
        );

        setPatients([
          response.data,
          ...patients,
        ]);
      }

      setFormData({
        name: "",
        age: "",
        gender: "",
      });

      setShowModal(false);

      setEditingPatient(null);

      fetchPatients(search);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePatient = async (
    id
  ) => {
    try {
      await api.delete(`/patients/${id}`);

      fetchPatients(search);
    } catch (error) {
      console.log(error);
    }
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

  const handleUseExistingPatient = (
    patient
  ) => {
    alert(
      `Using existing patient: ${patient.name}`
    );

    setSearch("");

    setSearchResults([]);
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Patient
        </button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search patient history..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() =>
              fetchPatients(search)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            Search
          </button>
        </div>
      </div>

      {search.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Search Results
          </h2>

          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {patient.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Age: {patient.age} |
                      Gender: {patient.gender}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleUseExistingPatient(
                          patient
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Use Existing
                    </button>

                    <button
                      onClick={() => {
                        setEditingPatient(null);

                        setFormData({
                          name: search,
                          age: "",
                          gender: "",
                        });

                        setShowModal(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Register New
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-500">
                No patient found
              </p>

              <button
                onClick={() => {
                  setEditingPatient(null);

                  setFormData({
                    name: search,
                    age: "",
                    gender: "",
                  });

                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register New Patient
              </button>
            </div>
          )}
        </div>
      )}

      <PatientTable
        patients={patients}
        onDelete={handleDeletePatient}
        onEdit={handleEditPatient}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
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
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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