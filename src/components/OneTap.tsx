/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signInWithProvider } from "@/data/auth/auth";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";
import next from "next";
import React, { useEffect } from "react";

const OneTap = () => {
    const supabase = supabaseUserClientComponentClient
    const YourComponent = async () => {
        if (typeof window !== "undefined") {
            const googleWindow: any = window;

            const user = await (await supabase.auth.getUser()).data.user?.email;
            if (user) {
                return;
            }

            if (googleWindow.google && googleWindow.google.accounts) {
                googleWindow.google.accounts.id.initialize({
                    client_id:
                        "442919343804-gl6fu2ga514bn49mkoq9df00tee0kcml.apps.googleusercontent.com",
                });
                if (googleWindow.google.accounts.id.prompt) {
                    googleWindow.google.accounts.id.prompt((notifications: any) => {
                        const credential = notifications.i;
                        if (credential === "credential_returned") {
                            LoginWithGoogle();
                        }
                    });
                } else {
                    console.error("Google API not ready for prompt");
                }
            } else {
                console.error("Google API not loaded");
            }
        }
    };

    const LoginWithGoogle = async () => {
        try {
            signInWithProvider("google")
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        YourComponent();
    }, []);

    return <></>;
};

export default OneTap;
