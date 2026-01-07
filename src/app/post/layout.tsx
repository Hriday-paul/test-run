import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Post Manage",
    description: "Runbd Post Manage",
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    }
}

function Layout({children}:{children : React.ReactNode}) {
  return (
    <>{children}</>
  )
}

export default Layout