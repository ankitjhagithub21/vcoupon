import React from 'react'

const Items = ({items}) => {
    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-5">Items:</h3>
            {items.length > 0 ? (
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {items.map((item, index) => (
                        <div key={index} className="p-3 custom-shadow rounded-lg ">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Unit Amount:</strong> {item.unitAmount}</p>
                            <p><strong>Total Amount:</strong> {item.totalAmount}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items added yet.</p>
            )}
        </div>
    )
}

export default Items
