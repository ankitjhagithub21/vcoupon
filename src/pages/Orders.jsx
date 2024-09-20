import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Order from '../components/Order';
import Loader from '../components/Loader';
import { GoSearch } from 'react-icons/go';
import Pagination from '../components/Pagination'; 
import { useGlobal } from '../context/GlobalContext';

const Orders = () => {
  const { orders,setOrders} = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        order.customerName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ),
    [orders, searchTerm]
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search term changes
  }, [searchTerm]);


  return (
    <section className='p-5'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Orders List</h2>

        <div className='flex items-center border rounded-lg my-5 px-2  bg-gray-300 text-gray-800'>
          <input
            type='text'
            placeholder='Search order'
            value={searchTerm}
            onChange={handleSearchChange}
            className='w-full p-2 outline-none text-lg bg-transparent '
          />
          <GoSearch size={20} />
        </div>

        {/* Orders List Header */}
        <div className='lg:grid hidden font-bold mb-3 text-xl grid-cols-1 sm:grid-cols-5 items-center gap-3 text-gray-800'>
          <h2>OrderId</h2>
          <h2>Created At</h2>
          <h2>Customer Name</h2>
          <h2>Order Status</h2>
          <h2>Action</h2>
        </div>

        {/* Orders List */}
        <div className='pb-14 text-gray-800'>
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => (
              <Order key={index} order={order} />
            )).sort()
          ) : (
            <p className='col-span-full text-center text-gray-800 py-4'>
              No orders found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          total={filteredOrders.length}
          perPage={ordersPerPage}
          paginate={paginate}
        />
      </div>
    </section>
  );
};

export default Orders;
