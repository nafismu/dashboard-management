import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Gunakan React.lazy untuk impor komponen secara dinamis
const LoginPage = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const AdminRoute = React.lazy(() => import('./route/AdminRoute'));
const EmployeeRoute = React.lazy(() => import('./route/EmployeeRoute'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const EmployeePage = React.lazy(() => import('./pages/EmployeePage'));
const CustomersList = React.lazy(() => import('./pages/CustomersList'));
const SaPerformance = React.lazy(() => import('./pages/SaPerformance'));
const EmployeeList = React.lazy(() => import('./pages/EmployeeList'));
const SaFunnel = React.lazy(() => import('./pages/SaFunnel'));
const EmployeeChart = React.lazy(() => import('./components/EmployeeChart'));
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
const InputDataSales = React.lazy(() => import('./pages/InputDataSales'));
const AttendanceSales = React.lazy(() => import('./pages/AttendancePage'));
const CaptureFace = React.lazy(() => import('./pages/CaptureFace'));

function App() {
  return (
    <Router>
      <div className="App">
        {/* Suspense untuk menangani fallback loading sementara komponen dimuat */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Halaman login dan register dapat diakses tanpa login */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes untuk admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/sales-performance" element={<SaPerformance />} />
              <Route path="/sales-funnel" element={<SaFunnel />} />
              <Route path="/customers-list-admin" element={<CustomersList/>} />
              <Route path="/employee-list" element={<EmployeeList />} />
            </Route>

            {/* Protected routes untuk employee */}
            <Route element={<EmployeeRoute />}>
              <Route path="/employee" element={<EmployeePage />} />
              <Route path="/customers-list-employee" element={<CustomersList />} />
              <Route path="/input-data-sales" element={<InputDataSales />} />
              <Route path="/attendance-sales" element={<AttendanceSales />} />
              <Route path="/capture-face" element={<CaptureFace />} />
            </Route>
            
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/EmployeeChart" element={<EmployeeChart />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
