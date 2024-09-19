import React, { useState } from 'react'
import { FaTrash,FaEdit } from 'react-icons/fa'

const Coupon = ({ coupon,onDelete }) => {
  
    const [isEditable,setIsEditable] = useState(false)

    const handleDelete = () => {
        
        onDelete(coupon.id)
    }

    
    return (
        <div className='p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white'
        >
            <h3 className='text-xl font-semibold mb-2'>{coupon.code}</h3>
            <p className='text-gray-600 mb-2'>{coupon.description}</p>
            <p className='text-sm'>
                <span className='font-bold'>Valid From:</span> {coupon.validFrom.slice(0, 10)}
            </p>
            <p className='text-sm'>
                <span className='font-bold'>Valid To:</span> {coupon.validTo.slice(0, 10)}
            </p>
           
           <div className='mt-2 flex items-center gap-3'>
            <button onClick={handleDelete}>
                <FaTrash className='text-[var(--red)]'/>
            </button>
            <button>
                <FaEdit size={20} />
            </button>
           </div>
        </div>
    )
}

export default Coupon
