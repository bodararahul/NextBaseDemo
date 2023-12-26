"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { ExternalNavigation } from '../(external-pages)/ExternalNavigation';
import Navbar from '../(dynamic-pages)/(authenticated-pages)/Navbar';


const page = () => {
    const searchParams = useSearchParams()
    const search = searchParams?.get("navbar")

    return (
        <>
            {search === "external" ? <ExternalNavigation /> : <Navbar />}
            <div className="text-center">Headless Page</div>
        </>
    )
}

export default page