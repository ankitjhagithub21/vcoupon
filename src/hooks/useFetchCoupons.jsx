import { useEffect, useState } from 'react';

const useFetchCoupons = () => {
  const token = localStorage.getItem('token') || null;
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/coupons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch coupons');
        }

        const data = await res.json();
        setCoupons(data);
      } catch (error) {
        console.error(error); 
      } finally {
        setLoading(false);
      }
    };

    getCoupons();
  }, [token]); 
  return {
    loading,
    coupons,
  };
};

export default useFetchCoupons;
