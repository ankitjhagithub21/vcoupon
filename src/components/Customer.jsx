import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Customer = ({ customer }) => {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    fullName: customer.fullName,
    mobile: customer.mobile,
  });

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { fullName, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [fullName]: value });
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    // Save changes to customer data here (e.g., send to backend)
    console.log('Saved data:', editedCustomer);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedCustomer({
      fullName: customer.fullName,
      mobile: customer.mobile,
    });
  };

  return (
    <div className="bg-gray-200 my-2 p-3 rounded-lg grid grid-cols-1 sm:grid-cols-3 items-center gap-3 ">

      <div className="whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            name="name"
            fullName="fullName"
            value={editedCustomer.fullName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        ) : (
          <h3 className="font-semibold text-xl">{customer.fullName}</h3>
        )}
      </div>

      <div className="whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            fullName="mobile"
            value={editedCustomer.mobile}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        ) : (
          <p>{customer.mobile}</p>
        )}
      </div>

      <div className="flex items-center md:justify-end justify-start gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 cursor-pointer text-green-500"
            >
              <FaSave size={16} />
              <span className="text-md">Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 cursor-pointer text-red-500"
            >
              <FaTimes size={16} />
              <span className="text-md">Cancel</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="flex items-center gap-1 cursor-pointer text-indigo-500"
            >
              <FaEdit size={16} />
              <span className="text-md">Edit</span>
            </button>
            <button className="text-red-500">
              <FaTrash size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Customer;
