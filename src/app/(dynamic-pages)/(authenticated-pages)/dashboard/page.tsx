"use client"
import Dashboard from '@/components/Dashboard'
import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient'

const page = () => {
    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabaseUserClientComponentClient.auth.getSession()
            if (session) {
                const { user } = session
                const supabase = supabaseUserClientComponentClient

                const { data: existingUsers, error: selectError } = await supabase
                    .from("users")
                    .select("user_id")
                    .eq("user_id", user?.id);

                if (selectError) {
                    console.error("Error checking existing user: " + selectError);
                }

                if (!existingUsers || existingUsers.length === 0) {
                    const { error: insertError } = await supabase.from("users").insert([
                        {
                            email: user?.email,
                            name: user?.user_metadata.name,
                            user_id: user?.id,
                        },
                    ]);

                    if (insertError) {
                        console.error("Error inserting user: " + insertError);
                    }
                }
            }
        }
        getUser()
    }, [])

    return (
        <>
            <Navbar />
            <Dashboard />
        </>
    )
}

export default page