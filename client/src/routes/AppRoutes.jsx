import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import PatientProfile from "../pages/PatientProfile";
import VisitDetails from "../pages/VisitDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/patients/:id"
          element={<PatientProfile />}
        />
        <Route
          path="/visits/:visitId"
          element={<VisitDetails />}
/>
        
      </Routes>
    </BrowserRouter>
  );
}