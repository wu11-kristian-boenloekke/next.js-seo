import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: {
        //with absolute, we overwrite the template string in the rootlayouy file
        absolute: 'About'
    }
}

export default function AboutPage() {
  return (
    <div>AboutPage</div>
  )
}

