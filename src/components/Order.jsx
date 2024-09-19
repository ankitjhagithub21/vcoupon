import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';


const Order = ({ order }) => {
    const navigate = useNavigate();
    const [status,setStatus] = useState(order.status)

    // Handle navigation to order details page
    const handleOrderClick = (orderId) => {

        navigate(`/order-details/${orderId}`, { state: { order: order } });
    };



    return (
        <div className='bg-gray-200 my-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 grid grid-cols-1 sm:grid-cols-5 items-center gap-3 overflow-x-auto'>
            <h2 className='font-bold'  onClick={() => handleOrderClick(order.orderId)}>{order.orderId}</h2>
            <p>{moment(order.createdAt).format("YYYY-MM-DD hh:mm:ss")}</p>
            <p>{order.customerName}</p>
            <p>

                <span className={`${status==="Confirmed" ? 'text-green-600':'text-red-600'}`}>
                    {status}
                </span>
            </p>
            <div className="flex items-center  gap-3">

                <button onClick={()=>setStatus("Canceled")}

                    className="flex items-center gap-1 cursor-pointer text-red-500"
                >
                    <FaTimes size={16} />
                    <span className="text-md">Decline</span>
                </button>

                <button onClick={()=>setStatus("Confirmed")}

                    className="flex items-center gap-1 cursor-pointer text-green-500"
                >
                    <FaCheck size={16} />
                    <span className="text-md">Accept</span>
                </button>

            </div>



        </div>
    )
}

export default Order
