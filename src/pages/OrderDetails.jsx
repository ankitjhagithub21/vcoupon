import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


const OrderDetails = (order) => {
  //const { loading, orders } = useFetchOrders();
  const { state } = useLocation();
  const { orderId } = useParams(); // Retrieve the orderId from the URL
  //const order = orders.find((o) => o.orderId === orderId); // Find the order based on orderId

  if (!order) {
    return <p className='text-center text-xl'>Order not found!</p>;
  }

  return (
    <section className='p-5'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Order Details for {state.order.orderId}</h2>
        <div className='bg-white p-4 border rounded-lg shadow-md'>
          <p><strong>Customer:</strong> {state.order.customerName}</p>
          <p><strong>Order Details:</strong> {state.order.body}</p>
          <p><strong>Order Status:</strong> {state.order.status}</p>
          <p><strong>Payment Status:</strong> {state.order.paymentStatus}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
