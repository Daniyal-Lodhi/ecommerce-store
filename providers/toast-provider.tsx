'use client'

import preventHydration from '@/components/hydration-prevention'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
    preventHydration();
  return (
    <div>
      <Toaster  />
    </div>
  )
}

export default ToastProvider
