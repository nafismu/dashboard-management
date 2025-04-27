import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Helmet from 'react-helmet';
import Sidebar from '../components/Sidebar';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const role = localStorage.getItem('role');
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const API_URL = '/api/customers';

    useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchCustomers = async () => {
        try {
        const response = await axios.get(API_URL, { signal });
        const records = response.data.map(record => ({
            id: record.id,
            name: record.name,
            email: record.email,
            phone: record.phone,
            subscription: record.subscription,
            signup_date: record.signup_date,
        }));
        setCustomers(records);
        setLoading(false);
        } catch (error) {
        setError('Failed to fetch customers');
        setLoading(false);
        }
    }
        fetchCustomers();
        return () => controller.abort();
    }, []);

    const handleCreate = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Input Customer Data',
            html: `
                <button id="close-btn" class="swal2-close" style="background-color:transparent; border:none; cursor:pointer; font-size:24px; position:absolute; top:10px; right:10px;">&times;</button>
                <input id="name" class="swal2-input" placeholder="Name" required>
                <input id="email" class="swal2-input" placeholder="Email" required>
                <input id="phone" class="swal2-input" placeholder="Phone" required>
                <input id="subscription" class="swal2-input" placeholder="Subscription" required>
                <input id="sign_date" class="swal2-input" type="datetime-local" required>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Back',
            focusConfirm: false,
            background: '#f0f8ff',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                popup: 'custom-swal-popup'
            },
            didOpen: () => {
                const closeBtn = document.getElementById('close-btn');
                closeBtn.addEventListener('click', () => {
                    Swal.close();
                });
            },
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const subscription = document.getElementById('subscription').value;
                const signup_date = document.getElementById('sign_date').value;
    
                if (!name || !email || !subscription || !signup_date) {
                    Swal.showValidationMessage('All fields are required');
                    return null;
                }
    
                return { name, email, phone, subscription, signup_date };
            }
        });
    
        if (formValues) {
            try {
                const newCustomer = {
                    name: formValues.name,
                    email: formValues.email,
                    phone: formValues.phone,
                    subscription: formValues.subscription,
                    signup_date: formValues.signup_date
                };
    
                await axios.post(API_URL, newCustomer);
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                fetchCustomers();
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `There was an error adding the customer! ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleEdit = (customer) => {
        setEditCustomer(customer.id);
        Swal.fire({
            title: 'Edit Customer Data',
            html: `
                <button id="close-btn" class="swal2-close" style="background-color:transparent; border:none; cursor:pointer; font-size:24px; position:absolute; justify-item:center; top:10px; right:10px;">&times;</button>
                <input id="name" class="swal2-input" value="${customer.name}" required>
                <input id="email" class="swal2-input" value="${customer.email}" required>
                <input id="phone" class="swal2-input" value="${customer.phone}" required>
                <input id="subscription" class="swal2-input" value="${customer.subscription}" required>
                <input id="signup_date" class="swal2-input" type="datetime-local" value="${customer.signup_date}" required>
            `,didOpen: () => {
                const closeBtn = document.getElementById('close-btn');
                closeBtn.addEventListener('click', () => {
                    Swal.close();
                });
            },
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const subscription = document.getElementById('subscription').value;
                const signup_date = document.getElementById('signup_date').value;

                if (!name || !email || !subscription || !phone || !signup_date) {
                    Swal.showValidationMessage('All fields are required');
                    return null;
                }

                return { name, email, subscription, phone, signup_date };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedCustomer = {
                    name: result.value.name,
                    email: result.value.email,
                    subscription: result.value.subscription,
                    phone: result.value.phone,
                    signup_date : result.value.signup_date
                };
                try {
                    await axios.put(`${API_URL}/${customer.id}`, updatedCustomer);
                    Swal.fire('Success!', 'Customer updated successfully!', 'success');
                    fetchCustomers();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to update customer', 'error');
                }
            }
        });
    };

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
                    text: 'Customer has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete customer.',
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
            <Sidebar role={role} isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Helmet><title>Customer List Page</title></Helmet>
            <div className="container my-12 mx-auto py-8 px-4">
                <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-2 md:space-y-0">
                    <button
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto"
                        onClick={handleCreate}
                    >
                        Tambah Pelanggan
                    </button>
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">List Daftar Pelanggan</h1>
                    <div className="w-16 md:w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">No</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Nama</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Email</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Nomor Telepon</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Berlangganan</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Tanggal Registrasi</th>
                                <th className="py-2 md:py-3 px-2 md:px-6 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={customer.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2 md:py-3 px-2 md:px-6">{index + 1}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-6">{customer.name}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-6">{customer.email}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-6">{customer.phone}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-6">{customer.subscription}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-6">{customer.signup_date}</td>
                                    <td className="py-3 px-6 flex justify-center mt-3">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(customer)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(customer.id)}
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

export default CustomersList;
