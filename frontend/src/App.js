import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { ProtectedRoute, LoginProtectedRoute, RoleProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SignupPatient from './screens/SignupPatient';
import SignupClinic from './screens/SignupClinic';
import ClinicDetails from './screens/ClinicDetails';
import Dashboard from './screens/Dashboard';
import {
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (

    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<RoleProtectedRoute><Home /></RoleProtectedRoute>} />
          <Route exact path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route exact path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
          <Route exact path="/signup-patient" element={<ProtectedRoute><SignupPatient /></ProtectedRoute>} />
          <Route exact path="/signup-clinic" element={<ProtectedRoute><SignupClinic /></ProtectedRoute>} />
          <Route exact path="/dashboard/:id" element={<LoginProtectedRoute><Dashboard /></LoginProtectedRoute>} />
          <Route exact path="/clinic/:id" element={<LoginProtectedRoute><ClinicDetails/></LoginProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
