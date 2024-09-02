'use client'

import PreventHydration from '@/components/hydration-prevention'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  return (
    <div>
      <PreventHydration />

      <Toaster />
    </div>
  )
}

export default ToastProvider
