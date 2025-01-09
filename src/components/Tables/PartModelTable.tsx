'use client'

import PartPopupTable from './PartTable'
import { useRouter } from 'next/navigation'

const TableOne = ({ partModels }: { partModels: any[] | undefined }) => {
    const router = useRouter()

    return (
        <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Part Model List</h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Id</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Compatible Aircraft Id</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Compatible Aircraft Name</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Stock</h5>
                    </div>
                </div>

                {partModels &&
                    partModels.map((partModel, key) => (
                        <div
                            onClick={() => {
                                router.push(`${window.location.pathname}/${partModel.id}/parts`)
                            }}
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                                key === partModels.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                            } hover:bg-slate-600 hover:cursor-pointer`}
                            key={key}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <p className="hidden text-black dark:text-white sm:block">{partModel.id}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{partModel.name}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-3">{partModel.compatible_aircraft.id}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-black dark:text-white">{partModel.compatible_aircraft.name}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-meta-5">{partModel.stock}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default TableOne
