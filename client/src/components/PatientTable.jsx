export default function PatientTable({
  patients,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Age</th>
            <th className="text-left p-4">Gender</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t"
            >
              <td className="p-4">{patient.id}</td>
              <td className="p-4">{patient.name}</td>
              <td className="p-4">{patient.age}</td>
              <td className="p-4">{patient.gender}</td>

              <td className="p-4 flex gap-2">
                <button
                  onClick={() => onEdit(patient)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(patient.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}