import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import RoadTrips from './components/RoadTrips'
import Missing from './components/Missing'
import Welcome from './components/Welcome'
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

        {/* Restricted Routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="road-trips" element={<RoadTrips />} />
        </Route>

        {/* ??? Route */}
        <Route path="/*" element={<Missing />} />

      </Route>
    </Routes>
  )
}

export default App
