import { BellIcon } from '@heroicons/react/outline'
import React from 'react'

function Header({Namepage}) {
  return (
    <div className='flex justify-between items-center mb-10 gap-4 bg-blue-500 text-white p-4 shadow'>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">{Namepage}</h2>
          </div>
          <div className='flex justify-end items-center gap-4'>
            <div className='relative'>
              <BellIcon className='w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition' />
              <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500'></span>
            </div>
            {/* <div className='flex items-center gap-2'>
              <UserIcon className='w-10 h-10 text-white' />
              {'user' && (
                <h2 className="text-xl font-medium uppercase">Welcome, {username} as {role}</h2>
              )}
            </div> */}
          </div>
        </div>
  )
}

export default Header