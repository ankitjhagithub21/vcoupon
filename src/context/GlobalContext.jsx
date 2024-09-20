import React, { createContext, useContext, useState} from 'react';
import useFetchCustomers from '../hooks/useFetchCustomers';
import useFetchCoupons from '../hooks/useFetchCoupons';
import useFetchOrders from '../hooks/useFetchOrders';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
 
 
  const {loading,customers} = useFetchCustomers()
  const {coupons,setCoupons} = useFetchCoupons()
  const {orders,setOrders} = useFetchOrders()

  return (
    <GlobalContext.Provider value={{loading,customers, coupons, orders, setCoupons,setOrders }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
