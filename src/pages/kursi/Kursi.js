import React, { useState, useEffect, useRef } from 'react';
import SearchInput from '../../components/Search';
import Button from '../../components/Button';
import Switch from '../../components/Switch';

const Kursi = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <section className="min-h-screen">
      <div>
        <SearchInput />
        <div className="pt-[29px]">
          <div onClick={togglePopup}>
            <Button text="Setting Kursi" type="button" width="195" height="48" />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="p-4 bg-white flex justify-center">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="p-3">Mobil</th>
                <th className="p-3">Jumlah Kursi Tersedia</th>
                <th className="p-3">Out of Order</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-3 px-4">Toyota HiAce</td>
                  <td className="p-3 px-4">10</td>
                  <td className="p-3 px-4">
                    <Switch />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2" ref={popupRef}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Setting Kursi</h2>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4"></div>
            <div className="flex space-x-4 mb-4">
              <div className="flex gap-3 items-center w-[40%]">
                <select className="w-full border rounded p-2">
                  <option>Toyota HiAce</option>
                </select>
              </div>
              <div className="flex gap-3 items-center w-[40%]">
                <input type="date" className="border rounded p-2 w-full" />
                <p>to</p>
                <input type="date" className="border rounded p-2 w-full" />
              </div>
              <div className="flex justify-center items-center w-[20%]">
                <button className="border py-2 w-full rounded-lg">Cari</button>
              </div>
            </div>
            <table className="table-auto w-full mb-4">
              <thead>
                <tr className="text-center bg-gray-100">
                  <th className="p-3">Mobil</th>
                  <th className="p-3">Jumlah Kursi</th>
                  <th className="p-3">Kursi Terisi</th>
                  <th className="p-3">Kursi Tersedia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-3">Toyota HiAce</td>
                  <td className="p-3">10</td>
                  <td className="p-3">
                    <input type="number" className="border rounded p-2 w-full" defaultValue="4" />
                  </td>
                  <td className="p-3">4</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <Button text="Simpan" type="button" width="100" height="48" onClick={togglePopup} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Kursi;
