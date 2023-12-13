import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Unauthorized from './components/Unauthorized/Unauthorized'
import Dashboard from './components/Dashboard/Dashboard'
import RoadTrips from './components/RoadTrips/RoadTrips'
import Missing from './components/Missing/Missing'
import Welcome from './components/Welcome/Welcome'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import { Routes, Route, useParams } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Restricted Routes */}
        <Route path="users/:userId/" element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="road-trips" element={<RoadTrips />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        {/* ??? Route */}
        <Route path="/*" element={<Missing />} />

      </Route>
    </Routes>
  )
}

export default App
