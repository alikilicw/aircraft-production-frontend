'use client'

import Popup1 from '@/components/Alerts/popup-1'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import PartTable from '@/components/Tables/PartTable'
import Request from '@/util/request'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PartList = () => {
    const params = useParams()
    const [showPopup, setShowPopup] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [parts, setParts] = useState<any[]>()

    function showPopupFunc() {
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 2000)
    }

    const getParts = async () => {
        try {
            const response = await Request.get({ endpoint: '/parts?model_id=' + params.model_id })
            setParts(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getParts()
    }, [])

    const recyclePart = async (partId: string) => {
        try {
            await Request.delete({ endpoint: `/parts/${partId}/` })

            setResponseMessage('Part has been recycled.')
            showPopupFunc()
            getParts()
        } catch (error) {
            console.log(error)

            if (error instanceof Error) setResponseMessage(error.message)
            showPopupFunc()
        }
    }

    return (
        <DefaultLayout>
            <div className="h-screen">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Part List</h4>
                <PartTable parts={parts} onDelete={recyclePart} />
                <Popup1 message={responseMessage} textColor={'text-black'} isVisible={showPopup}></Popup1>
            </div>
        </DefaultLayout>
    )
}

export default PartList
