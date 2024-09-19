import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast"
import Item from '../components/Item';
import { FaPlus } from 'react-icons/fa';


const OrderDetails = () => {
  const { state } = useLocation();
  const [items, setItems] = useState([])
  const [grandTotal, setGrandTotal] = useState(0)

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);


  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: "",
    unitAmount: "",
    unit:"",
    total: 0

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

  const handleApplyCoupon = () => {
    if (isCouponApplied) {
      toast.error("Coupon has already been applied.");
      return;
    }

    if (coupon === 'DISCOUNT10') {
      const discountValue = grandTotal * 0.10;
      setDiscount(discountValue);
      setGrandTotal(prevTotal => prevTotal - discountValue);
      toast.success("Coupon applied successfully. 10% discount applied!");
      setIsCouponApplied(true);
    } else {
      toast.error("Invalid coupon code.");
    }
  };


  useEffect(() => {
    setGrandTotal(items.reduce((total, item) => total + item.total, 0))
  }, [items])


  if (!state || !state.order) {
    return <p className="text-center text-xl">Order not found!</p>;
  }

  return (
    <section className="p-5 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className='mb-5 flex justify-end'>
          <button className='px-4 py-2 bg-[var(--red)] text-white rounded-lg flex items-center gap' onClick={handleAddNewItem}>
            <FaPlus/>
            Add Item</button>
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
        <h2 className='font-bold text-2xl mt-10'>Item List</h2>
        {
          items.length === 0 ? <p>No item added.</p> : <div>
            {
              items.map((item, index) => {
                return (
                  <Item key={index} item={item} index={index} onDelete={onDelete} onEdit={onEdit} />
                )
              })
            }

          </div>
        }

        {/* Apply Coupon Section */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="p-2 border rounded mr-2 bg-transparent"
            disabled={isCouponApplied}
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-[var(--red)] text-white px-4 py-2 rounded"
            disabled={items.length === 0 || grandTotal === 0 || isCouponApplied}
          >
            Apply Coupon
          </button>
        </div>


        {/* Display Grand Total */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Grand Total: &#8377;{grandTotal.toFixed(2)}</h3>
          {discount > 0 && <p className="text-green-500">Discount Applied: &#8377;{discount.toFixed(2)}</p>}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
