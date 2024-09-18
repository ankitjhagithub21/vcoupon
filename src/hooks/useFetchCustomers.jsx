import { useEffect, useState } from 'react';

const useFetchCustomers = () => {
  const token = localStorage.getItem('token') || null;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/customers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch coupons');
        }

        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error); 
      } finally {
        setLoading(false);
      }
    };

    if(token){
      getCustomers();
    }
  }, []); 
  return {
    loading,
    customers,
  };
};

export default useFetchCustomers;
