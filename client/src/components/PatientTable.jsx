import { useNavigate } from "react-router-dom";

export default function PatientTable({
  patients,
  onDelete,
  onEdit,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">
              ID
            </th>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Age
            </th>

            <th className="text-left p-4">
              Gender
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                navigate(
                  `/patients/${patient.id}`
                )
              }
            >
              <td className="p-4">
                #{patient.id}
              </td>

              <td className="p-4 font-medium">
                {patient.name}
              </td>

              <td className="p-4">
                {patient.age}
              </td>

              <td className="p-4">
                {patient.gender}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      onEdit(patient);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      onDelete(patient.id);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Archive
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}