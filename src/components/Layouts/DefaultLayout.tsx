'use client'
import React, { useState, ReactNode, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import useTokenCheck from '@/hooks/token-check.hook'
import { useRouter } from 'next/navigation'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const router = useRouter()
    const token = useTokenCheck()
    const [tokenVerified, setTokenVerified] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('A')

        const verifyToken = async () => {
            if (token == 'invalid') {
                router.push('/auth/login')
            } else {
                setTokenVerified(true)
            }
        }
        if (token != 'unset') verifyToken()
    }, [token])

    return (
        <>
            <div className="flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-1 flex-col lg:ml-72.5">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}
