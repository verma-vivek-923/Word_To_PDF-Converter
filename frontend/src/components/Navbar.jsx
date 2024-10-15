import React from 'react'

function Navbar() {
  return (
    <>
        <div className=' max-w-screen-2xl mx-auto container py-2 px-6 md:px-24 fixed shadow-lg h-14'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-3xl text-green-500'>To</span>PDF</h1>
                <h1 className='text-2xl cursor-pointer font-bold hover:scale-125 duration-200'>Home</h1>
            </div>
        </div>
    </>
  )
}

export default Navbar
