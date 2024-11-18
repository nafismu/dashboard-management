import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Helmet} from "react-helmet";
import Sidebar from '../components/Sidebar';

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editEmployees, setEditEmployees] = useState(null);
    const API_URL = '/api/employees'; // Sesuaikan dengan URL API backend Anda
    const [isOpen,setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    // Fetch all customers from the backend
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch employee');
            setLoading(false);
        }
    };

    // Fetch records on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Fungsi untuk menambah pelanggan baru menggunakan SweetAlert
    const handleCreate = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Input Employee Data',
            html: `
                <button id="close-btn" class="swal2-close" style="background-color:transparent; border:none; cursor:pointer; font-size:24px; position:absolute; top:10px; right:10px;">&times;</button>
                <input id="name" class="swal2-input" placeholder="Name" required>
                <input id="phone" class="swal2-input" placeholder="Phone" required>
                <input id="email" class="swal2-input" placeholder="Email" required>
                <input id="address" class="swal2-input" placeholder="Address" required>
                <input id="position" class="swal2-input" placeholder="Position" required>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Back',
            focusConfirm: false,
            background: '#f0f8ff',  // Warna background
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                popup: 'custom-swal-popup'
            },
            didOpen: () => {
                const closeBtn = document.getElementById('close-btn');
                closeBtn.addEventListener('click', () => {
                    Swal.close();  // Menutup popup saat tombol silang diklik
                });
            },
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const position = document.getElementById('position').value;
    
                if (!name || !phone || !email || !address || !position) {
                    Swal.showValidationMessage('All fields are required');
                    return null;
                }
    
                return { name, email, phone, address, position};
            }
        });
    
        if (formValues) {
            try {
                const newEmployees = {
                    name: formValues.name,
                    phone: formValues.phone,
                    email: formValues.email,
                    address: formValues.address,
                    position: formValues.position
                };
    
                await axios.post(API_URL, newEmployees);
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                fetchCustomers();
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `There was an error adding the employee! ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    // Populate form fields when a user clicks "Edit"
    const handleEdit = (employee) => {
        setEditEmployees(employee.id);
        Swal.fire({
            title: 'Edit employee Data',
            html: `
                <input id="name" class="swal2-input" value="${employee.name}" required>
                <input id="phone" class="swal2-input" value="${employee.phone}" required>
                <input id="email" class="swal2-input" value="${employee.email}" required>
                <input id="address" class="swal2-input" value="${employee.address}" required>
                <input id="position" class="swal2-input" value="${employee.position}" required>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const position = document.getElementById('position').value;

                // Validasi untuk memastikan input tidak kosong
                if (!name || !email || !address || !phone || !position) {
                    Swal.showValidationMessage('All fields are required');
                    return null;
                }

                return { name, email, address, phone ,position};
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedEmployee = {
                    name: result.value.name,
                    phone: result.value.phone,
                    email: result.value.email,
                    address: result.value.address,
                    position: result.value.position
                };
                try {
                    await axios.put(`${API_URL}/${employee.id}`, updatedEmployee);
                    Swal.fire('Success!', 'Employee updated successfully!', 'success');
                    fetchCustomers();
                    
                } catch (error) {
                    Swal.fire('Error!', 'Failed to update employee', 'error');
                }
            }
        });
    };

    // Delete a customer
    const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCustomers();
            Swal.fire({
                title: 'Deleted!',
                text: 'Employee has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete employee.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
};


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Sidebar role="admin" isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Helmet><title>Customer List Page</title></Helmet>
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                    {/* <button
                        className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
                        onClick={() => window.history.back()}
                    >
                        Kembali
                    </button> */}
                    <button
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
                        onClick={handleCreate}
                    >
                        Tambah Pelanggan
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-5xl font-bold text-blue-700 mb-4">List Daftar Pelanggan</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="py-3 px-6 border-b-2">No</th>
                                <th className="py-3 px-6 border-b-2">Nama</th>
                                <th className="py-3 px-6 border-b-2">Email</th>
                                <th className="py-3 px-6 border-b-2">Nomor Telepon</th>
                                <th className="py-3 px-6 border-b-2">Alamat</th>
                                <th className="py-3 px-6 border-b-2">Jabatan</th>
                                <th className="py-3 px-6 border-b-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">{employee.name}</td>
                                    <td className="py-3 px-6 text-left">{employee.email}</td>
                                    <td className="py-3 px-6 text-left">{employee.phone}</td>
                                    <td className="py-3 px-6 text-left">{employee.address}</td>
                                    <td className="py-3 px-6 text-left">{employee.position}</td>
                                    <td className="py-3 px-6 flex justify-center mt-3">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
);
};

export default EmployeeList;
