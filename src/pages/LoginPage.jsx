import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

const LoginPage = () => {
    // State to manage loading status
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch()

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Display loading toast notification
        const toastId = toast.loading('Processing your data...');
        setIsLoading(true);

        // Convert form data to an object
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());



        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })
            const data = await response.json()

            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                dispatch(setUser({
                    id: data.id,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,

                }))

                toast.success("Login Successfull.")
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        } finally {
            toast.dismiss(toastId);
            setIsLoading(false)
        }
    };


    return (
        <section className='h-screen w-full login'>
            <div className='overlay flex items-center justify-center p-5'>
                <div className='w-full max-w-md rounded-3xl glass p-5 custom-shadow'>
                    <img src="./user.png" alt="user" className='w-20 mb-5 mx-auto -mt-16 bg-white rounded-full' />
                    <form className='flex flex-col gap-3' onSubmit={handleFormSubmit}>
                        {/* Input field for email */}
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter your username'
                            className=' px-4 py-2 w-full  text-lg bg-[#395173] text-white'
                            required
                        />



                        <input
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            className='px-4 py-2 w-full  text-lg bg-[#395173] text-white'
                            required
                        />
                        <div className='flex items-center text-sm justify-between text-[#244a8f]'>
                            <span className='flex items-center gap-1'>
                                <input type="checkbox" name="" id="" />
                                Remember me</span>
                            <span>Forgot Password?</span>
                        </div>


                        {/* Submit button with loading state */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`bg-[#395173] mb-2 text-white px-4 py-2 ${isLoading && 'cursor-not-allowed'}`}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
