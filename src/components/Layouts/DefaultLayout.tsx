'use client'
import React, { useState, ReactNode, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import useTokenCheck from '@/hooks/token-check.hook'
import { Entity } from '@/types/entity'
import { useRouter } from 'next/navigation'
import Request from '@/util/request'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const router = useRouter()
    const token = useTokenCheck()
    const [tokenVerified, setTokenVerified] = useState(false)
    const [loading, setLoading] = useState(true)
    const [entities, setEntities] = useState<Entity[]>([])

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

    useEffect(() => {
        console.log('B')

        const getEntities = async () => {
            try {
                const response = await Request.get({ endpoint: '/entities' })
                setEntities(response.data as Entity[])
            } catch (error) {
                console.log(error)
            }
        }
        if (tokenVerified) getEntities()
    }, [tokenVerified])

    useEffect(() => {
        console.log('C')

        if (entities.length > 0) setLoading(false)
    }, [entities])

    return (
        <>
            <div className="flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} entities={entities} />

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
