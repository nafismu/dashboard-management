// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import AdminRoute from './route/AdminRoute';
import EmployeeRoute from './route/EmployeeRoute';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import CustomersList from './pages/CustomersList';
import SaPerformance from './pages/SaPerformance';
import EmployeeList from './pages/EmployeeList';
import SaFunnel from './pages/SaFunnel';
import EmployeeChart from './components/EmployeeChart';
import Unauthorized from './pages/Unauthorized';
import InputDataSales from './pages/InputDataSales';

function App() {
  return (
    <Router>
      <div className="App">
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
            <Route path="/customers-list-admin" element={<CustomersList />} />
            <Route path="/employee-list" element={<EmployeeList/>} />
          </Route>

          {/* Protected routes untuk employee */}
          <Route element={<EmployeeRoute />}>
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/customers-list-employee" element={<CustomersList />}/>
            <Route path="/input-data-sales" element={<InputDataSales/>}/>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/EmployeeChart" element={<EmployeeChart />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
