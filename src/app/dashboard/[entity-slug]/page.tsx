'use client'

import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableCustom from '@/components/Tables/TableCustom'
import Request from '@/util/request'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EntityDetail = () => {
    const [data, setData] = useState<any>([])
    const pathname = usePathname()
    const [urlPath, setUrlPath] = useState<string>(pathname.split('/')[pathname.split('/').length - 1])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Request.get({ endpoint: `/${pathname.split('/')[pathname.split('/').length - 1]}` })
                const datas = response.data as any[]

                // if (urlPath == 'categories') {
                //     setData
                // } else if (urlPath == 'products') {
                //     datas.map((item) => new Product(item))
                // } else if (urlPath == 'users') {
                //     datas.map((item) => new User(item))
                // }
                setData(datas)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <DefaultLayout>
            <div className="h-screen">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Top Products</h4>
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Filtre</label>
                        <input
                            className="w-full rounded border border-stroke bg-transparent px-5 py-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                        />
                    </div>
                </div>
                <TableCustom records={data}></TableCustom>
            </div>
        </DefaultLayout>
    )
}

export default EntityDetail
