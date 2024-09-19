import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Settings = () => {
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState(false)
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        credentials: 'include',
        body: JSON.stringify(formValues)
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Success.")
        e.target.reset()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error")
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <div className='p-5 min-h-screen '>
      <div className='max-w-xl mx-auto custom-shadow p-5 rounded-lg mt-12'>
        <h1 className='text-2xl  font-bold mb-5 text-gray-800'>Add Configuration</h1>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
          <input type="text" placeholder='Enter key' name='key' className='border rounded-lg p-3' required autoComplete='off'/>
          <input type="text" placeholder='Enter value' name='value' className='border rounded-lg p-3' required autoComplete='off'/>
          <button type='submit' disabled={loading} className='px-4 py-2 bg-[var(--red)] text-white rouned-lg w-fit rounded-lg'>
            {
              loading ? 'Adding...' : "Add"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
