'use client'

import Popup1 from '@/components/Alerts/popup-1'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import AircraftTable from '@/components/Tables/AircraftTable'
import Request from '@/util/request'
import React, { useEffect, useState } from 'react'

const AircraftList = () => {
    const [aircraftModels, setAircraftModel] = useState<any[]>()
    const [aircrafts, setAircrafts] = useState<any[]>()
    const [selectedAircraftModel, setSelectedAircraftModel] = useState<any>()
    const [showPopup, setShowPopup] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    function showPopupFunc() {
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 2000)
    }

    async function getAircraftModels() {
        try {
            const response = await Request.get({ endpoint: `/aircrafts/aircraft-models/`, useToken: true })
            setAircraftModel(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function getAircrafts() {
        try {
            const response = await Request.get({ endpoint: `/aircrafts/`, useToken: true })

            setAircrafts(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAircraftModels()
        getAircrafts()
    }, [])

    const createAircraft = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await Request.post({
                body: { model_id: selectedAircraftModel.id },
                endpoint: `/aircrafts/`,
                useToken: true
            })

            setResponseMessage('Aircraft has been created.')
            showPopupFunc()

            getAircrafts()
        } catch (error) {
            if (error instanceof Error) setResponseMessage(error.message)
            showPopupFunc()
        }
    }

    const completeAircraft = async (aircraftId: string) => {
        try {
            await Request.patch({
                endpoint: `/aircrafts/${aircraftId}/complete-production/`,
                useToken: true
            })

            setResponseMessage('Aircraft has been completed.')
            showPopupFunc()

            getAircrafts()
        } catch (error) {
            if (error instanceof Error) setResponseMessage(error.message)
            showPopupFunc()
        }
    }

    return (
        <DefaultLayout>
            <div className="h-screen">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Parts</h4>
                <form className="bg-white p-6 rounded-lg shadow-md mb-4" onSubmit={createAircraft}>
                    <h5 className="mb-6 text-lg font-semibold text-black">Create an Aircraft</h5>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                        <select
                            onChange={(e) => {
                                const selectedAircraftModel_ = aircraftModels!.find(
                                    (aircraftModel) => aircraftModel.id === Number(e.target.value)
                                )

                                if (selectedAircraftModel_) {
                                    setSelectedAircraftModel(selectedAircraftModel_)
                                }
                            }}
                            id="select1"
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select an Aircraft Model</option>
                            {aircraftModels &&
                                aircraftModels!.map((aircraftModel, aircraftModelIndex) => (
                                    <option key={aircraftModelIndex} value={aircraftModel.id}>
                                        {aircraftModel.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Aircraft
                        </button>
                    </div>
                </form>
                <AircraftTable aircrafts={aircrafts} onCompleteAircraft={completeAircraft} />
            </div>
            <Popup1 message={responseMessage} textColor={'text-black'} isVisible={showPopup}></Popup1>
        </DefaultLayout>
    )
}

export default AircraftList
