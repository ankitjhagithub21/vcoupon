import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { FaCheck, FaTimes, FaSave } from 'react-icons/fa';




const Order = ({ order }) => {
    const navigate = useNavigate();


    // Handle navigation to order details page
    const handleOrderClick = (orderId) => {

        navigate(`/order-details/${orderId}`, { state: { order: order } });
    };

  

    return (
        <div className='bg-gray-200 my-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 grid grid-cols-1 sm:grid-cols-5 items-center gap-3 overflow-x-auto'
            onClick={() => handleOrderClick(order.orderId)}>
            <h3 className='text-xl font-semibold'>{order.orderId}</h3>
            <p>{moment(order.createdAt).format("YYYY-MM-DD hh:mm:ss")}</p>
            <p>{order.customerName}</p>
            <p>

                <span className={`font-bold ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                    {order.status}
                </span>
            </p>
            <div className="flex items-center  gap-3">

                <button

                    className="flex items-center gap-1 cursor-pointer text-red-500"
                >
                    <FaTimes size={16} />
                    <span className="text-md">Cancel</span>
                </button>

                <button

                    className="flex items-center gap-1 cursor-pointer text-green-500"
                >
                    <FaCheck size={16} />
                    <span className="text-md">Confirm</span>
                </button>

            </div>
           


        </div>
    )
}

export default Order
