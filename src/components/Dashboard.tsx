"use client";
import React, { useEffect, useState } from "react";
import { MdInfoOutline, MdOutlineBookmarkAdd } from "react-icons/md";
import { IoRibbon, IoSearchOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { PiReadCvLogoLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFileDownload, FaRegComments } from "react-icons/fa";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";

const Dashboard = () => {
    const router = useRouter();
    const supabase = supabaseUserClientComponentClient
    const [articles, setArticles] = useState<any>([]);

    const getArticle = async () => {
        const { data, error } = await supabase.from("articles").select();

        if (data) {
            setArticles(data?.filter((dta) => dta.status === "publish"));
        }
    }

    useEffect(() => {
        getArticle();
    }, []);

    const handleDownload = async (name: any) => {
        try {
            const { data, error } = await supabase.storage
                .from("files")
                .download(name);
            if (error) {
                console.error("Download Error:", error);
                return;
            }

            const blob = new Blob([data]);

            const downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = name;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const showArticleDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const date = dateObject.toDateString();
        return date;
    };
    const handleSelectedArtical = (article: any) => {
        router.push(`/details?id=${article.article_id}`);
    };

    return (
        <div>
            <div className="max-w-[1536px] mx-auto px-[208px] mt-[32px]">
                <div className="relative w-full border border-slate-200 rounded-2xl p-6 pt-5 bg-white flex flex-col items-start">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-slate-800 font-semibold">
                            Search with Rix - the dev search engine powered by Hashnode AI ✨
                        </h2>
                        <MdInfoOutline />
                    </div>
                    <div className="w-full bg-gradient-to-b from-[#3466F6]/50 via-[#3466F6]/50 to-[#7C3AED]/50 rounded-[28px] flex items-center justify-between p-[1px] overflow-hidden gap-2 text-slate-800 text-base font-normal z-10 mt-5 shadow-[0px_3px_4px_0px_#7C3AED14]">
                        <div className="relative w-full h-full flex items-center justify-start bg-white rounded-[27px] py-4 px-5 gap-2 overflow-hidden">
                            <div className="absolute top-0 bottom-0 left-0 right-0 z-1 bg-blue-100  rounded-3xl w-0"></div>
                            <textarea
                                placeholder="Ask your programming question…"
                                className="w-full bg-transparent focus:outline-none resize-none text-base z-10 peer h-[24px]"
                            ></textarea>
                            <IoSearchOutline className="text-[24px]" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full mt-[24px]">
                        <button
                            className="text-slate-600 text-[14px] flex items-center gap-2"
                            onClick={() => router.push("/draft")}
                        >
                            <AiOutlineEdit className="text-[20px]" />
                            Write an article
                        </button>
                        <button className="text-slate-600 text-[14px] flex items-center gap-2">
                            <IoSettingsOutline className="text-[20px]" />
                            Blog dashboard
                        </button>
                        <button className="text-slate-600 text-[14px] flex items-center gap-2">
                            <PiReadCvLogoLight className="text-[20px]" />
                            Manage blogs
                        </button>
                    </div>
                </div>

                {articles.map((article: any) => {
                    return (
                        <div
                            className="w-full border border-slate-200 rounded-2xl p-[1.5rem] bg-white flex flex-col items-star mt-[1.5rem]"
                            key={article.id}
                        >
                            <div className="flex flex-col gap-[1.25rem]">
                                <div className="flex flex-col gap-[1rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-[0.75rem]">
                                            <Image
                                                src="/assets/user-image.png"
                                                alt="userimg"
                                                className="rounded-full w-[2.5rem] h-[2.5rem]"
                                                width={500}
                                                height={500}
                                            />
                                            <div>
                                                <div className="flex items-center gap-[0.5rem]">
                                                    <h6 className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                                                        {article.name}
                                                    </h6>
                                                    <button className="py-[1px] px-[0.25rem] rounded-[0.25rem] bg-[#e2e8f0] text-[#64748b] font-medium">
                                                        Pro
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-[0.25rem]">
                                                    <a
                                                        href="#"
                                                        className="text-[#64748b] text-[0.875rem] font-normal"
                                                    >
                                                        {article.sub_domain}
                                                    </a>
                                                    <p className="text-[#64748b] text-[0.875rem] font-normal ml-5">
                                                        {showArticleDate(article.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex gap-[0.25rem] items-center px-[0.75rem] py-[0.25rem] rounded-full bg-[#e0e7ff]">
                                            <IoRibbon className="text-[#4338ca]" />
                                            <span className="text-[#4338ca] text-[0.875rem] font-semibold">
                                                Featured
                                            </span>
                                        </button>
                                    </div>

                                    <div
                                        className="flex items-center justify-between gap-[1.5rem]"
                                        onClick={() => {
                                            handleSelectedArtical(article);
                                        }}
                                    >
                                        <div className="flex flex-col gap-[0.25rem]">
                                            <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">
                                                {article.article_des.title}
                                            </h1>
                                            <a
                                                href="#"
                                                className="text-base hidden font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer md:line-clamp-2"
                                            >
                                                {article.article_des.description}
                                            </a>
                                        </div>
                                        <Image
                                            src="/assets/login-asset-dashboard.png"
                                            alt="youtubimg"
                                            className="w-[180px] h-[108px] rounded-[0.5rem]"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-row items-center justify-between text-slate-600 dark:text-slate-300 text-sm gap-[0.5rem]">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FaRegComments />
                                            <span>Discuss</span>
                                        </div>

                                        <div>
                                            {/* icon */}
                                            <span>21 Likes</span>
                                        </div>

                                        <div>
                                            {/* icon */}
                                            <span>90 reads</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-[0.5rem] items-center">
                                        <div className="border-r-[#e2e8f0] border-r-[1px] relative group">
                                            <button
                                                className="hover:bg-[#e2e8f0] rounded-full text-[#475569] text-[1.5rem] font-medium px-[0.5rem] py-[0.25rem] mr-[0.5rem] w-[34px] h-[34px] flex justify-center items-center"
                                                onClick={() => handleDownload(article.article_des.file)}
                                            >
                                                <FaFileDownload className="text-[18px]" />
                                            </button>
                                            <div className="group-hover:block hidden absolute bg-[#e2e8f0] p-[4px_8px] text-[12px] rounded-[7px] left-[-6px] top-[39px]">
                                                {article.article_des.fileName}
                                            </div>
                                        </div>
                                        <button className="text-[#64748b] text-[1.5rem]">
                                            <MdOutlineBookmarkAdd />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;