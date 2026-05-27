import { Link, useNavigate } from "react-router-dom";

export default function DashboardLayout({
  children,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          HMS
        </h1>

        <nav className="space-y-3">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/patients"
            className="block px-4 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Patients
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Hospital Management
              System
            </h2>

            <p className="text-gray-500 text-sm">
              Admin Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">
                Administrator
              </p>

              <p className="text-sm text-gray-500">
                admin@hospital.com
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}