import { useEffect, useState } from 'react'

interface PopupProps {
    message: string
    isVisible: boolean
    textColor: string
}

const Popup1: React.FC<PopupProps> = ({ message, isVisible, textColor }) => {
    return (
        <div
            className={`fixed top-10 right-10 rounded-sm border bg-opacity-50 transition-opacity duration-500 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
        >
            <div className="border-stroke bg-white shadow-default px-6 py-3 text-center">
                <span className={`text-md font-bold ${textColor}`}>{message}</span>
            </div>
        </div>
    )
}

export default Popup1
