import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddCustomer = () => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Form submit function
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Unauthorized. Please log in.");
    }

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    setIsLoading(true);
    const toastId = toast.loading('Adding customer...');

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

 

      if (res.ok) {
        toast.success('Customer added successfully!');
        e.target.reset();
      } else {
       
        toast.error("Error");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <section className='py-12 px-5'>
      <form
        className="flex flex-col gap-4 p-5 bg-white shadow-lg rounded-lg w-full max-w-xl mx-auto"
        onSubmit={handleFormSubmit}
      >
        <h2 className='text-2xl font-bold'>Add New Customer</h2>

        {/* Full Name Field */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="mb-1 text-gray-700 font-semibold"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter customer name"
            className="p-2 border border-pink-300 rounded-md outline-none focus:border-pink-600"
            required
          />
        </div>

        {/* Mobile Number Field */}
        <div className="flex flex-col">
          <label
            htmlFor="mobile"
            className="mb-1 text-gray-700 font-semibold"
          >
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Enter mobile number"
            className="p-2 border border-pink-400 rounded-md outline-none focus:border-pink-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${isLoading ? 'bg-pink-500 cursor-not-allowed' : 'bg-[var(--red)] hover:bg-pink-700'}`}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </section>
  );
};

export default AddCustomer;
