import { useEffect, useState } from 'react';

const useFetchOrders = () => {
  const token = localStorage.getItem('token') || null;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error); 
      } 
    };

    getOrders();
  }, [token]); 
  return {
    orders,
    setOrders
  }
};

export default useFetchOrders;
