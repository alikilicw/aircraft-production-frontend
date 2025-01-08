'use client'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'
import '@/css/satoshi.css'
import '@/css/style.css'
import React, { useState } from 'react'
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher'
import Popup1 from '@/components/Alerts/popup-1'

type PopupAttrs = {
    message: string
    textColor: string
    isVisible: boolean
}

type AuthLayoutProbs = {
    children: React.ReactNode
    popupAttrs: PopupAttrs
}

export default function AuthLayout({ children, popupAttrs }: AuthLayoutProbs) {
    return (
        <div className="flex flex-col items-center min-h-screen justify-center bg-white p-4 dark:bg-boxdark">
            <div>
                <div className="flex justify-end mb-4">
                    <DarkModeSwitcher></DarkModeSwitcher>
                </div>
                {children}
            </div>
            <Popup1 message={popupAttrs.message} textColor={popupAttrs.textColor} isVisible={popupAttrs.isVisible}></Popup1>
        </div>
    )
}
