'use client'

import TradingChart from '@/components/TradingChart'
export default function Home() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-full h-full'>
        <TradingChart />
      </div>
    </div>
  )
}
