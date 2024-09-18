import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Item from '../components/Item';


const OrderDetails = () => {
  const { state } = useLocation();
  const [items, setItems] = useState([])
  const [grandTotal, setGrandTotal] = useState(0)

  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: "",
    unitAmount: "",
    total:0

  })
  const handleAddNewItem = () => {
    
    setItems((prevItems) => [...prevItems, item])

  }

  const onDelete = (index) => {

    setItems(items.filter((item, i) => i !== index))
  }
  
  const onEdit = (index, updatedItem) => {
    
    const updatedItems = [...items]
    updatedItems[index] = updatedItem
    setItems(updatedItems)
  }
  useEffect(()=>{
    setGrandTotal(items.reduce((total,item)=> total+item.total,0 ))
  },[items])
  

  if (!state || !state.order) {
    return <p className="text-center text-xl">Order not found!</p>;
  }

  return (
    <section className="p-5">
      <div className="max-w-7xl mx-auto">
    <div className='mb-5 flex justify-end'>
    <button className='px-4 py-2 bg-[var(--red)] text-white rounded-lg' onClick={handleAddNewItem}>Add Item</button>
    </div>
        <h2 className="text-2xl font-bold mb-4">
          Order Details for {state.order.orderId}
        </h2>
        
        <div className="p-4 border-b">
          <p><strong>Customer:</strong> {state.order.customerName}</p>
          <p><strong>Order Details:</strong> {state.order.body}</p>
          <p><strong>Order Status:</strong> {state.order.status}</p>
          <p><strong>Payment Status:</strong> {state.order.paymentStatus}</p>
        </div>

    {/* items list */}
    <h2 className='font-bold text-2xl'>Item List</h2>
       {
        items.length === 0 ? <p>No item added.</p> :  <div>
        {
          items.map((item, index) => {
            return (
              <Item key={index} item={item} index={index} onDelete={onDelete} onEdit={onEdit} />
            )
          })
        }
         <h2>Grand Total :{grandTotal}</h2>
      </div>
       }
     
       
      </div>
    </section>
  );
};

export default OrderDetails;
