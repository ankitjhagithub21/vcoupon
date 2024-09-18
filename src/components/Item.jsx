import React, { useState, useEffect } from 'react'

const Item = ({ item, onDelete, index, onEdit }) => {
    const [isEditable, setIsEditable] = useState(true)
    const [newItem, setNewItem] = useState(item)
   

    useEffect(() => {
        // Automatically calculate and update the total whenever quantity or unitAmount changes
        setNewItem((prevItem) => ({
            ...prevItem,
            total: prevItem.quantity * prevItem.unitAmount || 0
        }));
    }, [newItem.quantity, newItem.unitAmount]); // Recalculate when quantity or unitAmount changes

    const handleCancel = () => {
        // Check if any fields are empty
        if (!newItem.name || !newItem.quantity || !newItem.unitAmount || !newItem.description) {
            onDelete(index)  // Delete item if any fields are blank
        } else {
            setIsEditable(false)
        }
    }

    const handleEdit = () => {
        setIsEditable(true)
    }

    const handleDelete = () => {
        onDelete(index)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewItem({
            ...newItem,
            [name]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault()
        onEdit(index, newItem)
        setIsEditable(false)
    }

    return (
        <>
            {
                isEditable ? (
                    <form className='flex flex-col gap-2 my-2' onSubmit={handleSave}>
                        <h2 className='font-bold'>Add new item</h2>
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                            <input
                                type="text"
                                placeholder="Name"
                                name='name'
                                value={newItem.name}
                                onChange={handleChange}
                                className="input input-bordered min-w-full max-w-xs"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Quantity"
                                name='quantity'
                                value={newItem.quantity}
                                onChange={handleChange}
                                className="input input-bordered min-w-full max-w-xs"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Amount"
                                name='unitAmount'
                                value={newItem.unitAmount}
                                onChange={handleChange}
                                className="input input-bordered min-w-full max-w-xs"
                                required
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
                            className="textarea resize-none textarea-bordered h-24 min-w-full"
                            name='description'
                            onChange={handleChange}
                            value={newItem.description}
                            placeholder="Description"
                            required
                        ></textarea>

                        <div className='flex gap-3'>
                            <button className='px-3 py-1 text-sm rounded-lg hover:bg-indigo-700 bg-indigo-600 text-white' type='submit'>Save</button>
                            <button className='px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className='grid lg:grid-cols-5 md:grid-cols-2 rounded-lg gap-3 my-2 p-5 bg-gray-200 '>
                        <h2>Name: {item.name}</h2>
                        <p>Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Amount: {item.unitAmount}</p>
                        <p>Total: {item.total}</p>
                        <div className='flex items-center gap-3'>
                            <button className='px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white' onClick={handleEdit}>Edit</button>
                            <button className='px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Item
