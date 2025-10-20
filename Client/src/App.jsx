import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AddMember from "./pages/AddMember";
import MemberDashboard from "./pages/MemberDashboard";
import AddReport from "./pages/AddReport";
import ReportView from "./pages/ReportView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-member" element={<PrivateRoute><AddMember /></PrivateRoute>} />
          <Route path="/member/:memberId" element={<PrivateRoute><MemberDashboard /></PrivateRoute>} />
          <Route path="/member/:memberId/add-report" element={<PrivateRoute><AddReport /></PrivateRoute>} />
          <Route path="/report/:reportId" element={<PrivateRoute><ReportView /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
        <Footer />
      </Router>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
