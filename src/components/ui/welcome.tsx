import React from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Welcome() {
  return (
    <div className='w-full pb-4'>
        <div>
            <h1 className='text-center text-gray-600 text-3xl font-bold mb-4'>What can I help with today?</h1>
            <p className='text-center text-gray-600 mb-8'>Eric&apos;s chatbot is built with Next.js, TypeScript, Tailwind CSS, TRPC, and SQLite.</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
            <div className=' flex flex-col items-start text-left rounded-lg p-4 border border-gray-200 transition-colors shadow-sm hover:bg-gray-100'>
                <div className='flex text-xs text-gray-600 bg-sky-100 rounded-full px-3 py-1 mb-4 font-semibold'>Tool Calling</div>
                <div className='text-gray-600 font-bold mb-4'>
                    Check the weather anywhere
                </div>
                <div className='flex gap-2 w-full'>
                    <Input placeholder='Enter a location' className='w-full' />
                    <Button variant='outline' className='p-3'>
                        <ArrowRight className='w-4 h-4' />
                    </Button>
                </div>
            </div>
            <div className=' flex flex-col items-start text-left rounded-lg p-4 border border-gray-200 transition-colors shadow-sm hover:bg-gray-100'>
                <div className='flex text-xs text-gray-600 bg-yellow-100 rounded-full px-3 py-1 mb-4 font-semibold'>Generative UI</div>
                <div className='text-gray-600 font-bold mb-4'>
                    Check the weather anywhere
                </div>
                <div className='flex gap-2 w-full'>
                    <Input placeholder='Enter a location' className='w-full' />
                    <Button variant='outline' className='p-3'>
                        <ArrowRight className='w-4 h-4' />
                    </Button>
                </div>
            </div>
            <div className=' flex flex-col items-start text-left rounded-lg p-4 border border-gray-200 transition-colors shadow-sm hover:bg-gray-100'>
                <div className='flex text-xs text-gray-600 bg-purple-100 rounded-full px-3 py-1 mb-4 font-semibold'>Object Generation</div>
                <div className='text-gray-600 font-bold mb-4'>
                    Check the weather anywhere
                </div>
                <div className='flex gap-2 w-full'>
                    <Input placeholder='Enter a location' className='w-full' />
                    <Button variant='outline' className='p-3'>
                        <ArrowRight className='w-4 h-4' />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}