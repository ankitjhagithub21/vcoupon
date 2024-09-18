import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import toast from "react-hot-toast";
import Items from '../components/Items';

const OrderDetails = () => {
  const { state } = useLocation();
 
  // State for grand total, items, and coupon
  const [grandTotal, setGrandTotal] = useState(0);
  const [items, setItems] = useState([]); // To store added items
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    quantity: '',
    unitAmount: '',
    totalAmount: '',
  });
  
  const [coupon, setCoupon] = useState(''); // State for coupon code
  const [discount, setDiscount] = useState(0); // Discount value
  const [isCouponApplied, setIsCouponApplied] = useState(false); // To avoid multiple coupon application

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Handle form submission
  const handleAddItem = (e) => {
    e.preventDefault();
    const totalAmount = newItem.quantity * newItem.unitAmount;
    setGrandTotal(prevTotal => prevTotal + totalAmount);
    setItems([...items, { ...newItem, totalAmount }]);
    toast.success("Item added successfully.");
    setNewItem({
      name: '',
      description: '',
      quantity: '',
      unitAmount: '',
      totalAmount: '',
    });
    setShowModal(false); // Close modal after adding
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (isCouponApplied) {
      toast.error("Coupon has already been applied.");
      return;
    }

    if (coupon === 'DISCOUNT10') {
      const discountValue = grandTotal * 0.10; // 10% discount
      setDiscount(discountValue);
      setGrandTotal(prevTotal => prevTotal - discountValue);
      toast.success("Coupon applied successfully. 10% discount applied!");
      setIsCouponApplied(true);
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  // Handle modal open/close
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!state || !state.order) {
    return <p className="text-center text-xl">Order not found!</p>;
  }

  return (
    <section className="p-5">
      <div className="mt-4 flex items-center justify-end mb-5">
        <button
          className="flex items-center bg-[var(--red)] text-white px-4 py-2 rounded"
          onClick={toggleModal}
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Order Details for {state.order.orderId}
        </h2>
        <div className="p-4 border-b">
          <p><strong>Customer:</strong> {state.order.customerName}</p>
          <p><strong>Order Details:</strong> {state.order.body}</p>
          <p><strong>Order Status:</strong> {state.order.status}</p>
          <p><strong>Payment Status:</strong> {state.order.paymentStatus}</p>
        </div>

        {/* List of Added Items */}
        <Items items={items} />

        {/* Apply Coupon Section */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="p-2 border rounded mr-2"
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

      {/* Modal for Adding Items */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Item</h3>
              <button onClick={toggleModal}>
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block font-bold mb-1">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Unit Amount</label>
                <input
                  type="number"
                  name="unitAmount"
                  value={newItem.unitAmount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={newItem.quantity * newItem.unitAmount} // Calculating total amount
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[var(--red)] text-white px-4 py-2 rounded"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetails;
