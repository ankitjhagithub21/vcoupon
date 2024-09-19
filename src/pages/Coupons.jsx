import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { FaTag } from 'react-icons/fa';
import Coupon from '../components/Coupon';
import useFetchCoupons from '../hooks/useFetchCoupons';
import Loader from '../components/Loader';
import toast from "react-hot-toast"

const Coupons = () => {
  const { loading, coupons } = useFetchCoupons();
  const token = localStorage.getItem('token')
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Memoized filtered coupons to avoid unnecessary re-renders
  const filteredCoupons = useMemo(() =>
    coupons.filter((coupon) =>
      coupon.code?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [coupons, searchTerm]
  );

  // Memoized handler for search input change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const onDelete = async (couponId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/coupons/${couponId}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (res.ok) {
        toast.success("Coupon deleted.")
      } else {
        toast.error("Error")
      }

    } catch (error) {
      console.log(error)
      toast.error("Error")
    }
  }

  
  // Show loader while fetching data
  if (loading) {
    return <Loader />;
  }

  return (
    <section className='p-5 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-800'>Coupon List</h2>
          {/* Add Coupon Button */}
          <Link
            to="/add-coupon"
            className='text-white px-4 py-2 bg-[var(--red)] flex items-center gap-2 rounded-lg'
          >
            <FaTag />
            Add Coupon
          </Link>
        </div>

        {/* Search Input */}
        <div className='flex items-center border rounded-lg my-5 px-2 bg-gray-300 text-gray-800'>
          <input
            type='text'
            placeholder='Search coupon'
            value={searchTerm}
            onChange={handleSearchChange} // Use memoized handler
            className='w-full p-2 outline-none text-lg bg-transparent'
          />
          <GoSearch size={20} />
        </div>

        {/* Coupons Grid View */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 text-gray-800'>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon, index) => (
              <Coupon key={index} coupon={coupon} onDelete={onDelete}/>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-800 py-4'>
              No coupons found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Coupons;
