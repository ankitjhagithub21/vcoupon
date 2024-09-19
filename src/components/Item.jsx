import React, { useState, useEffect } from 'react'

const Item = ({ item, onDelete, index, onEdit }) => {
    const [isEditable, setIsEditable] = useState(true)
    const [newItem, setNewItem] = useState(item)

    useEffect(() => {
        // Automatically calculate and update the total whenever quantity or unitAmount changes
        const calculateTotal = (quantity, unitAmount) => {
            if (quantity && unitAmount) {
                return quantity * unitAmount;
            }
            return 0;
        };
        
        setNewItem((prevItem) => ({
            ...prevItem,
            total: calculateTotal(prevItem.quantity, prevItem.unitAmount)
        }));
    }, [newItem.quantity, newItem.unitAmount]); // Recalculate when quantity or unitAmount changes

    const handleCancel = () => {
        // Check if any fields are empty
        if (!newItem.name || !newItem.quantity || !newItem.unitAmount || !newItem.description || !newItem.unit) {
            onDelete(index);  // Delete item if any fields are blank
        } else {
            setIsEditable(false);
        }
    }

    const handleEdit = () => {
        setIsEditable(true);
    }

    const handleDelete = () => {
        onDelete(index);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value
        });
    }

    const handleSave = (e) => {
        e.preventDefault();
        onEdit(index, newItem);
        setIsEditable(false);
    }

    return (
        <>
            {isEditable ? (
                <form className='flex flex-col gap-2 my-2' onSubmit={handleSave}>
                    <h2 className='font-bold'>Edit item</h2>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                        <input
                            type="text"
                            placeholder="Name"
                            name='name'
                            value={newItem.name}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-lg border min-w-full max-w-xs"
                            autoComplete='off'
                            required
                        />

                        <div className='flex items-center border rounded-lg pl-4 pr-2 py-2'>
                            <input
                                type="number"
                                placeholder="Quantity"
                                name='quantity'
                                value={newItem.quantity}
                                onChange={handleChange}
                                className="w-full max-w-xs outline-none"
                                autoComplete='off'
                                required
                            />
                            <select 
                                name="unit" 
                                onChange={handleChange}  
                                value={newItem.unit}  
                                className='w-fit bg-transparent outline-none' 
                                required
                            >
                                <option value="">Unit</option>
                                <option value="kg">Kg</option>
                                <option value="Li">Li</option>
                            </select>
                        </div>

                        <input
                            type="number"
                            placeholder="Amount"
                            name='unitAmount'
                            value={newItem.unitAmount}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg min-w-full max-w-xs"
                            required
                            autoComplete='off'
                        />
                        <input
                            type="number"
                            placeholder="Total"
                            name='total'
                            value={newItem.total}
                            className="bg-gray-200 rounded-lg p-3 min-w-full max-w-xs"
                            readOnly
                            required
                        />
                    </div>

                    <textarea
                        className="px-4 py-2 resize-none rounded-lg border min-w-full"
                        name='description'
                        onChange={handleChange}
                        value={newItem.description}
                        placeholder="Description"
                        required
                        autoComplete='off'
                    ></textarea>

                    <div className='flex gap-2'>
                        <button className='px-3 py-1.5 text-sm rounded-lg hover:bg-indigo-700 bg-indigo-600 text-white' type='submit'>Save</button>
                        <button className='px-3 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white' type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className='grid lg:grid-cols-5 md:grid-cols-2 rounded-lg gap-3 my-2 p-5 bg-gray-200 '>
                    <h2>Name: {item.name}</h2>
                    <p>Description: {item.description}</p>
                    <p>Quantity: {item.quantity} {item.unit}</p>
                    <p>Amount: {item.unitAmount}</p>
                    <p>Total: {item.total}</p>
                    <div className='flex items-center gap-2'>
                        <button className='px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white' onClick={handleEdit}>Edit</button>
                        <button className='px-3 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Item
