import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Customer from '../components/Customer';
import Pagination from '../components/Pagination';
import useFetchCustomers from '../hooks/useFetchCustomers';
import Loader from '../components/Loader';


const Customers = () => {
  const { loading, customers } = useFetchCustomers();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('');
  const customersPerPage = 10;

  const sortCustomers = (customers) => {
    if (sortOrder === 'asc') {
      return [...customers].sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortOrder === 'desc') {
      return [...customers].sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    return customers;
  };

  const filteredCustomers = sortCustomers(
    customers.filter(
      (customer) =>
        customer.mobile.includes(searchTerm) ||
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="p-3 relative min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center border rounded-lg px-2 shadow-lg max-w-xl w-full">
            <input
              type="text"
              placeholder="Search customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 outline-none text-lg"
            />
            <GoSearch size={20} />
          </div>
          <div className="flex items-center gap-3 justify-start py-3">
            <select
              className="border rounded-lg p-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
            <button
              className="bg-[var(--red)] text-white p-2 rounded-lg flex items-center gap-1"
              onClick={() => navigate("/add")}
            >
              <FaUserPlus />
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        <div className="border-b my-2 p-3 rounded-lg hidden md:grid grid-cols-3 items-center gap-3 overflow-x-auto">
          <div className="whitespace-nowrap">
            <h3 className="font-semibold text-xl">Name</h3>
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-xl">Mobile Number</p>
          </div>
          <div className="text-end font-semibold text-xl">
            <p>Actions</p>
          </div>
        </div>

        <div className="pb-10">
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <Customer key={customer.id} customer={customer} />
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-500">
              No customers found.
            </p>
          )}
        </div>

      
          <Pagination
            currentPage={currentPage}
            total={filteredCustomers.length}
            perPage={customersPerPage}
            paginate={paginate}
          />
       
      </div>
    </section>
  );
};

export default Customers;
