import { useEffect, useState } from 'react';

const useFetchOrders = () => {
  const token = localStorage.getItem('token') || null;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error(error); // Log the error correctly
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [token]); 
  return {
    loading,
    orders,
  };
};

export default useFetchOrders;
