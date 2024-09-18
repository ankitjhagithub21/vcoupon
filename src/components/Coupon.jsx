import React from 'react'


const Coupon = ({ coupon }) => {
  
    
    return (
        <div

            className='p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white'
        >
            <h3 className='text-xl font-semibold mb-2'>{coupon.code}</h3>
            <p className='text-gray-600 mb-2'>{coupon.description}</p>
            <p className='text-sm'>
                <span className='font-bold'>Valid From:</span> {coupon.validFrom.slice(0, 10)}
            </p>
            <p className='text-sm'>
                <span className='font-bold'>Valid To:</span> {coupon.validTo.slice(0, 10)}
            </p>
           
        </div>
    )
}

export default Coupon
