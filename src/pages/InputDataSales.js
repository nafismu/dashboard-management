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
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => window.history.back()}
                    >
                        Back
                    </button>
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">Input Data Sales</h1>
                    <div className="w-16 md:w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border bg-light text-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-500 text-sm md:text-base">
                                    <th className="p-2 border">Nama</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Tahap</th>
                                    <th className="p-2 border">Komentar</th>
                                    <th className="p-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map((row, index) => (
                                    <tr key={index} className="text-sm md:text-base">
                                        <td className="p-2 border">
                                            <input
                                                type="text"
                                                name="name"
                                                value={row.name}
                                                onChange={(event) => handleInputChange(index, event)}
                                                className="border w-full p-1 text-black"
                                                required
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="email"
                                                name="email"
                                                value={row.email}
                                                onChange={(event) => handleInputChange(index, event)}
                                                className="border w-full p-1 text-black"
                                                required
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <select
                                                name="stage"
                                                value={row.stage}
                                                onChange={(event) => handleInputChange(index, event)}
                                                className="border w-full p-1 text-black"
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
                                        <td className="p-2 border">
                                            <input
                                                type="text"
                                                name="comments"
                                                value={row.comments}
                                                onChange={(event) => handleInputChange(index, event)}
                                                className="border w-full p-1 text-black"
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRow(index)}
                                                className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
                        <button
                            type="button"
                            onClick={handleAddRow}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
                        >
                            Tambah Baris
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full md:w-auto"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InputDataSales;
