import React, { useState } from 'react';

const InputDataSales = () => {
    const [salesData, setSalesData] = useState([{ name: '', email: '', stage: '', comments: '' }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newSalesData = [...salesData];
        newSalesData[index][name] = value;
        setSalesData(newSalesData);
    };

    const handleAddRow = () => {
        setSalesData([...salesData, { name: '', email: '', stage: '', comments: '' }]);
    };

    const handleRemoveRow = (index) => {
        const newSalesData = salesData.filter((_, i) => i !== index);
        setSalesData(newSalesData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lakukan pengiriman data ke backend
        console.log("Sales Data:", salesData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 justify-between">
        {/* <div className='p-4 m-4 '> */}
        <div className='flex gap-4 mb-8'>
        <button className="
        bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => window.history.back()}
        >
          Back
        </button>
        </div>
        {/* Judul */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">Input Data Sales</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        {/* form input */}
        <form onSubmit={handleSubmit} >
            <table className="min-w-full border border-white bg-light text-white rounded-full">
                <thead>
                    <tr className="bg-blue-500">
                        <th className="p-2 border">Nama</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Tahap</th>
                        <th className="p-2 border">Komentar</th>
                        <th className="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((row, index) => (
                        <tr key={index}>
                            <td className="p-2 border">
                                <input
                                    type="text"
                                    name="name"
                                    value={row.name}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="border w-full p-1"
                                    required
                                />
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="email"
                                    name="email"
                                    value={row.email}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="border w-full p-1"
                                    required
                                />
                            </td>
                            <td className="p-2 border text-black">
                                <select
                                    name="stage"
                                    value={row.stage}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="border w-full p-1"
                                    required
                                >
                                    <option value="">Pilih Tahap</option>
                                    <option value="F0">F0: Lead</option>
                                    <option value="F1">F1: Opportunity</option>
                                    <option value="F2">F2: Proposal</option>
                                    <option value="F3">F3: Bidding</option>
                                    <option value="F4">F4: Negotiation</option>
                                    <option value="F5">F5: Contract</option>
                                </select>
                            </td>
                            <td className="p-2 border text-black">
                                <input
                                    type="text"
                                    name="comments"
                                    value={row.comments}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="border w-full p-1"
                                />
                            </td>
                            <td className="p-2 border">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Tambah Baris
                </button>
                <button
                    type="submit"
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Simpan
                </button>
            </div>
        </form>
        </div>
        <div/>
      </div>
    );
};

export default InputDataSales;
