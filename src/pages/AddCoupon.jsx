import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddCoupon = () => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token') || null


  // Form submit function
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const toastId = toast.loading('Adding coupon...');

    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(obj)
      })


      if (res.ok) {
        toast.success("Coupon added successfully.")
        e.target.reset()
      } else {
        toast.error("Error")
      }

    } catch (error) {
      console.log(error)
      toast.error("Error")
    } finally {
      setIsLoading(false)
      toast.dismiss(toastId)
    }
  };

  return (
    <section className='py-12 px-5'>
      <form
        className="flex flex-col gap-4 p-5 bg-white custom-shadow rounded-lg w-full max-w-xl mx-auto"
        onSubmit={handleFormSubmit}
      >
        <h2 className='text-2xl font-bold'>Add New Coupon</h2>

        {/* Coupon Code Field */}
        <div className="flex flex-col">
          <label htmlFor="code" className="mb-1 text-gray-700 font-semibold">
            Coupon Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="Enter coupon code"
            className="p-2 border border-pink-300 rounded-md outline-none focus:border-pink-600"
            required
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            className="p-2 border border-pink-300 rounded-md resize-none outline-none focus:border-pink-600"
            rows={3}
            required
          />
        </div>

        {/* Valid From Field */}
        <div className="flex flex-col">
          <label htmlFor="validFrom" className="mb-1 text-gray-700 font-semibold">
            Valid From
          </label>
          <input
            type="date"
            name="validFrom"
            id="validFrom"
            className="p-2 border border-pink-300 rounded-md w-full outline-none focus:border-pink-600"
            required
          />
        </div>

        {/* Valid To Field */}
        <div className="flex flex-col">
          <label htmlFor="validTo" className="mb-1 text-gray-700 font-semibold">
            Valid To
          </label>
          <input
            type="date"
            name="validTo"
            id="validTo"
            className="p-2 border border-pink-300 rounded-md w-full outline-none focus:border-pink-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? 'bg-pink-500 cursor-not-allowed' : 'bg-[var(--red)] hover:bg-pink-700'
            } text-white font-semibold py-2 px-4 rounded-md transition duration-300`}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </section>
  );
};

export default AddCoupon;
