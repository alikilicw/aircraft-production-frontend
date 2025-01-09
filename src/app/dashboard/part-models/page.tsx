'use client'

import Popup1 from '@/components/Alerts/popup-1'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import PartModelTable from '@/components/Tables/PartModelTable'
import Request from '@/util/request'
import { useEffect, useState } from 'react'

const PartModelList = () => {
    const [partModels, setPartModels] = useState<any[]>()
    const [parts, setParts] = useState<any[]>()
    const [aircrafts, setAircrafts] = useState<any[]>()
    const [showPopup, setShowPopup] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [partModelWillProduce, setPartModelWillProduce] = useState<any>()
    const [aircraftSelected, setAircraftSelected] = useState<any>()
    const [partSelected, setPartSelected] = useState<any>()

    function showPopupFunc() {
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 2000)
    }

    async function getPartModels() {
        try {
            const response = await Request.get({ endpoint: `/parts/part-models/` })
            setPartModels(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function getParts() {
        try {
            const response = await Request.get({ endpoint: `/parts/`, useToken: true })
            setParts(response)
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
        getPartModels()
        getParts()
        getAircrafts()
    }, [])

    async function productPart(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await Request.post({
                body: { model_id: partModelWillProduce.id },
                endpoint: `/parts/`,
                useToken: true
            })

            setResponseMessage('Part has been produced.')
            showPopupFunc()

            getPartModels()
        } catch (error) {
            if (error instanceof Error) setResponseMessage(error.message)
            showPopupFunc()
        }
    }

    async function assemblePart(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await Request.post({
                body: { aircraft_id: aircraftSelected.id, part_id: partSelected.id },
                endpoint: `/parts/assembly/`,
                useToken: true
            })

            setResponseMessage('Part has been assembled.')
            showPopupFunc()

            getPartModels()
        } catch (error) {
            if (error instanceof Error) setResponseMessage(error.message)
            showPopupFunc()
        }
    }

    return (
        <DefaultLayout>
            <div className="">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Parts</h4>
                <form className="bg-white p-6 rounded-lg shadow-md mb-4" onSubmit={productPart}>
                    <h5 className="mb-6 text-lg font-semibold text-black">Produce a Part</h5>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                        <select
                            onChange={(e) => {
                                const selectedPartModel = partModels!.find((partModel) => partModel.id === Number(e.target.value))
                                console.log(selectedPartModel)

                                if (selectedPartModel) {
                                    setPartModelWillProduce(selectedPartModel)
                                }
                            }}
                            id="select1"
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select a Part Model</option>
                            {partModels &&
                                partModels!.map((partModel, partModelIndex) => (
                                    <option key={partModelIndex} value={partModel.id}>
                                        {partModel.name} - {partModel.compatible_aircraft.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Produce
                        </button>
                    </div>
                </form>
                <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={assemblePart}>
                    <h5 className="mb-6 text-lg font-semibold text-black">Assemble a Part</h5>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Aircrafts</label>
                        <select
                            onChange={(e) => {
                                const selectedAircraft = aircrafts!.find((aircraft) => aircraft.id === Number(e.target.value))

                                if (selectedAircraft) {
                                    setAircraftSelected(selectedAircraft)
                                }
                            }}
                            id="select1"
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select an Aircraft</option>
                            {aircrafts &&
                                aircrafts!.map((aircraft, aircraftIndex) => (
                                    <option key={aircraftIndex} value={aircraft.id}>
                                        {aircraft.model.name} - {aircraft.serial_number}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Parts</label>
                        <select
                            onChange={(e) => {
                                const selectedPart = parts!.find((part) => part.id === Number(e.target.value))

                                if (selectedPart) {
                                    setPartSelected(selectedPart)
                                }
                            }}
                            id="select1"
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select a Part</option>
                            {parts &&
                                parts!.map((part, partIndex) => (
                                    <option key={partIndex} value={part.id}>
                                        {part.model.name} - {part.model.compatible_aircraft.name} - {part.serial_number}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Assemble
                        </button>
                    </div>
                </form>
                <PartModelTable partModels={partModels} />
            </div>
            <Popup1 message={responseMessage} textColor={'text-black'} isVisible={showPopup}></Popup1>
        </DefaultLayout>
    )
}

export default PartModelList
