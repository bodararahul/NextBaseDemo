/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
// import supabase from "@/connection/supabaseClient";
import {
  IoChevronDownOutline,
  IoSettingsOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import {
  MdKeyboardArrowDown,
  MdOutlinePostAdd,
  MdOutlineRocketLaunch,
} from "react-icons/md";
import { MdOutlineKeyboardArrowUp, MdDeleteOutline } from "react-icons/md";
import { PiFilesThin } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { LuFileText } from "react-icons/lu";
import { IoMdClose, IoMdMore } from "react-icons/io";
import { BsPinAngle } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { PiSubtitlesThin } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";
import Editor from "@/components/Editor";

const Draft = () => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [pinned, setPinned] = useState<boolean>(true);
  const [pinnedDrafts, setPinnedDrafts] = useState<any>([]);
  const [drafts, setDrafts] = useState<boolean>(true);
  const [addDrafts, setAddDrafts] = useState<any>();
  const [selectedData, setSelectedData] = useState<any>(null);
  const [publish, setPublish] = useState<boolean>(true);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>();
  const [session, setSession] = useState<any>();
  const supabase = supabaseUserClientComponentClient
 
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    description: "",
    file: "",
    fileName: "",
  });

  const handleChange = (e: any) => {
    if (e.target.name === "file") {
      setArticle({
        ...article,
        [e.target.name]: e.target.files[0],
        fileName: e.target.files[0].name,
      });
    } else {
      if (selectedData) {
        setSelectedData({
          ...selectedData,
          article_des: {
            ...selectedData.article_des,
            [e.target.name]: e.target.value,
          },
        });
      }
      setArticle({ ...article, [e.target.name]: e.target.value });

      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };
  const filename = `${uuidv4()}-${article.fileName}`;

  const getData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    const { data, error } = await supabase.from("articles").select();
    const filteredData = data?.filter(
      (data) => data.user_id === session?.user.id
    );
    setAddDrafts(filteredData?.filter((data) => data.status === "draft"));
    setPostData(filteredData?.filter((data) => data.status === "publish"));
  };

  const handleAddNewDraft = async () => {
    const user = session?.user;

    const { error: insertError } = await supabase.from("articles").insert([
      {
        user_id: user.id,
        name: user?.user_metadata.name,
        article_des: { ...article, title: "Untitled" },
        sub_domain:
          user?.user_metadata.name.toLowerCase().replaceAll(" ", "") +
          ".dbportal.dev",
        status: "draft",
      },
    ]);
    if (insertError) {
      console.log("Error: ", insertError)
    }
    getData();
  };

  const handlePinDrafts = (id: string) => {
    const isDraftPinned = pinnedDrafts.some(
      (draft: any) => draft.article_id === id
    );

    if (isDraftPinned) {
      setPinnedDrafts((prev: any) =>
        prev.filter((draft: any) => draft.article_id !== id)
      );
    } else {
      const data = postData.find((draft: any) => draft.article_id === id);
      setPinnedDrafts((prev: any) => [...prev, data]);
    }
  };

  const handleUnpinDrafts = (id: string) => {
    setPinnedDrafts((prev: any) =>
      prev.filter((draft: any) => draft.article_id !== id)
    );
  };

  const handleDraftDelete = async (id: string) => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("article_id", id);
    getData();
  };

  const handlePublishDelete = async (id: string) => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("article_id", id);
    getData();
  };

  const handleSaveDraft = async () => {
    if (session) {
      const user = session?.user;

      const { data: existingUsers, error: selectError } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", user?.id);

      if (existingUsers) {
        const userId = existingUsers[0].user_id;

        const { data, error } = await supabase.storage
          .from("files")
          .upload(filename, article.file);

        if (error) {
          console.error("Error in uploading file: ", error);
        }

        if (selectedData) {
          const updates = {
            article_des: {
              title: selectedData.article_des.title,
              subtitle: selectedData.article_des.subtitle,
              description: selectedData.article_des.description,
              file: selectedData.article_des.file,
              fileName: selectedData.article_des.fileName,
            },
          };

          const { data, error } = await supabase
            .from("articles")
            .update(updates)
            .eq("article_id", selectedData.article_id)
            .select();

          if (data) {
            setSelectedData(null);
          }
        } else {
          const { error: insertError } = await supabase
            .from("articles")
            .insert([
              {
                user_id: userId,
                name: user?.user_metadata.name,
                article_des: { ...article, file: filename },
                sub_domain:
                  user?.user_metadata.name.toLowerCase().replaceAll(" ", "") +
                  ".dbportal.dev",
                status: "draft",
              },
            ]);

          if (insertError) {
            console.error("Error inserting data: " + insertError);
          }
        }
      }
      if (selectError) {
        console.error("Error checking existing user: " + selectError);
      }
      setArticle({
        title: "",
        subtitle: "",
        description: "",
        file: "",
        fileName: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      getData();
    }
  };

  const handlePublish = async (e: any) => {
    e.preventDefault();

    if (session) {
      const user = session?.user;

      const { data: existingUsers, error: selectError } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", user?.id);

      if (existingUsers) {
        const userId = existingUsers[0].user_id;

        const { data, error } = await supabase.storage
          .from("files")
          .upload(filename, article.file);

        if (error) {
          console.error("Error in uploading file: ", error);
        }

        if (selectedData) {
          const updates = {
            article_des: {
              title: selectedData.article_des.title,
              subtitle: selectedData.article_des.subtitle,
              description: selectedData.article_des.description,
              file: selectedData.article_des.file,
              fileName: selectedData.article_des.fileName,
            },
            status: "publish",
          };

          const { data, error } = await supabase
            .from("articles")
            .update(updates)
            .eq("article_id", selectedData.article_id)
            .select();

          if (data) {
            setSelectedData(null);
          }
        } else {
          const { error: insertError } = await supabase
            .from("articles")
            .insert([
              {
                user_id: userId,
                name: user?.user_metadata.name,
                article_des: { ...article, file: filename },
                sub_domain:
                  user?.user_metadata.name.toLowerCase().replaceAll(" ", "") +
                  ".dbportal.dev",
                status: "publish",
              },
            ]);

          if (insertError) {
            console.error("Error inserting data: " + insertError);
          }
        }
      }
      if (selectError) {
        console.error("Error checking existing user: " + selectError);
      }
      setArticle({
        title: "",
        subtitle: "",
        description: "",
        file: "",
        fileName: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="max-w-[1536px] m-auto">
        <div className=" flex">
          <div className="">
            {!sidebar && (
              <button
                className="text-[#657c91] text-[22px]"
                onClick={() => setSidebar(true)}
              >
                <TbLayoutSidebarRightCollapse />
              </button>
            )}
            {sidebar && (
              <div className="w-[270px]   ">
                <div className="flex justify-between flex-col border-x-[#e2e8f0cc] border-x-[1px] h-screen">
                  <div>
                    <div
                      className={
                        sidebar
                          ? "p-[16px] flex justify-between items-center border-b-[#e2e8f0cc] border-b-[1px]"
                          : ""
                      }
                    >
                      <button className="overflow-hidden text-ellipsis whitespace-nowrap hover:bg-[#e2e8f0] text-[#334555] font-medium text-[14px] font-sans flex gap-1 items-center p-[6px_10px] rounded-[6px]">
                        {session?.user.user_metadata.name}'s blog{" "}
                        <IoChevronDownOutline />
                      </button>
                      <button
                        className="text-[#657c91] text-[22px]"
                        onClick={() => setSidebar(false)}
                      >
                        <TbLayoutSidebarLeftCollapse />
                      </button>
                    </div>
                    <div className="p-[16px] ">
                      <div className="border-b-[#e2e8f0] border-b-[1px]">
                        <div className="relative">
                          <IoSearchOutline className="absolute left-[14px] text-[#657c91] top-[50%] translate-y-[-50%] text-[20px]" />
                          <input
                            type="text"
                            className="p-[0.5rem_2.5rem] outline-none w-full border-[1px] border-[#e2e8f0cc] rounded-[30px] text-[14px]"
                            placeholder="Search drafts…"
                          />
                        </div>
                        <div
                          className="p-[16px_16px_16px_0px]"
                          onClick={handleAddNewDraft}
                        >
                          <div className="flex items-center p-[6px_8px] gap-[0.5rem] hover:bg-[#f1f5f9] rounded-[6px]">
                            <MdOutlinePostAdd className="text-[#64748b] text-[20px] rotate-180  scale-x-[-1.05]" />
                            <button className="text-[#475569] text-[14px] font-medium">
                              New draft
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pb-[24px]">
                        <div
                          className="flex items-center gap-[8px] pt-[16px] mb-[8px] group cursor-pointer"
                          onClick={() => setPinned(!pinned)}
                        >
                          <button className="text-[#64748b] text-[12px] font-semibold group-hover:text-[#475569]">
                            PINNED
                          </button>
                          {pinned ? (
                            <MdOutlineKeyboardArrowUp className="text-[#64748b] text-[20px] group-hover:text-[#475569]" />
                          ) : (
                            <MdKeyboardArrowDown className="text-[#64748b] text-[20px]" />
                          )}
                        </div>
                        {pinned &&
                          (pinnedDrafts?.length > 0 ? (
                            pinnedDrafts?.map((pin: any) => {
                              return (
                                <div
                                  className="text-[14px] text-[#64748b]"
                                  key={pin.article_id}
                                >
                                  <div className="relative flex justify-center items-center group/item">
                                    <button className="flex items-center gap-[4px] p-[6px_8px] group-hover/item:bg-[#f1f5f9] rounded-[6px] w-full">
                                      <LuFileText />{" "}
                                      {pin.article_des.title.substring(0, 20)}{" "}
                                      {pin.article_des.title.length > 20 &&
                                        `...`}
                                    </button>
                                    <div className="absolute right-[2px]  top-[5px] flex gap-[2px] invisible group-hover/item:visible group/edit">
                                      <button className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]">
                                        <IoMdMore />
                                      </button>
                                      <button
                                        className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]"
                                        onClick={() =>
                                          handleUnpinDrafts(pin.article_id)
                                        }
                                        title={
                                          pinnedDrafts.some(
                                            (draft: any) =>
                                              draft.article_id ===
                                              pin.article_id
                                          )
                                            ? "Unpin draft"
                                            : "Pin draft"
                                        }
                                      >
                                        <BsPinAngle />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-[14px] text-[#64748b]">
                              Your pinned drafts from this blog would appear
                              here.
                            </p>
                          ))}
                      </div>

                      <div className="pb-[24px]">
                        <div
                          className="flex items-center gap-[8px] pt-[16px] mb-[8px] group cursor-pointer"
                          onClick={() => setDrafts(!drafts)}
                        >
                          <button className="text-[#64748b] hover:text-[#475569] text-[12px] font-semibold group-hover:text-[#475569]">
                            My Drafts ({addDrafts ? addDrafts.length : 0})
                          </button>
                          {drafts ? (
                            <MdOutlineKeyboardArrowUp className="text-[#64748b] text-[20px] group-hover:text-[#475569]" />
                          ) : (
                            <MdKeyboardArrowDown className="text-[#64748b] text-[20px]" />
                          )}
                        </div>
                        {drafts &&
                          addDrafts?.map((draft: any) => (
                            <div
                              className="text-[14px] text-[#64748b]"
                              key={draft.id}
                              onClick={() => setSelectedData(draft)}
                            >
                              <div className="relative flex justify-center items-center group/item">
                                <button className="flex items-center gap-[4px] p-[6px_8px] group-hover/item:bg-[#f1f5f9] rounded-[6px] w-full">
                                  <LuFileText />{" "}
                                  {draft?.article_des.title?.substring(0, 20)}{" "}
                                  {draft?.article_des.title?.length > 20 &&
                                    `...`}
                                </button>
                                <div className="absolute right-[2px]  top-[5px] flex gap-[2px] invisible group-hover/item:visible group/edit">
                                  <button
                                    className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]"
                                    onClick={() =>
                                      // setAddDrafts((prev: any) =>
                                      //   prev.filter(
                                      //     (data: any) => data.id !== draft.id
                                      //   )
                                      // )
                                      handleDraftDelete(draft.article_id)
                                    }
                                  >
                                    <MdDeleteOutline />
                                  </button>
                                  {/* <button className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]">
                                <IoMdMore />
                                </button>
                                <button className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]">
                                <BsPinAngle />
                                </button> */}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="pb-[24px]">
                        <div
                          className="flex items-center gap-[8px] pt-[16px] mb-[8px] group cursor-pointer"
                          onClick={() => setPublish(!publish)}
                        >
                          <button className="text-[#64748b] hover:text-[#475569] text-[12px] font-semibold group-hover:text-[#475569]">
                            Published ({postData ? postData?.length : 0})
                          </button>
                          {publish ? (
                            <MdOutlineKeyboardArrowUp className="text-[#64748b] text-[20px] group-hover:text-[#475569]" />
                          ) : (
                            <MdKeyboardArrowDown className="text-[#64748b] text-[20px]" />
                          )}
                        </div>
                        {publish &&
                          (postData?.length > 0 ? (
                            postData?.map((post: any) => {
                              return (
                                <div
                                  className="text-[14px] text-[#64748b]"
                                  key={post.article_id}
                                  onClick={() => setSelectedData(post)}
                                >
                                  <div className="relative flex justify-center items-center group/item">
                                    <button className="flex items-center gap-[4px] p-[6px_8px] group-hover/item:bg-[#f1f5f9] rounded-[6px] w-full">
                                      <LuFileText />{" "}
                                      {post.article_des.title.substring(0, 20)}{" "}
                                      {post.article_des.title.length > 20 &&
                                        `...`}
                                    </button>
                                    <div className="absolute right-[2px]  top-[5px] flex gap-[2px] invisible group-hover/item:visible group/edit">
                                      <button
                                        className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]"
                                        onClick={() =>
                                          handlePublishDelete(post.article_id)
                                        }
                                      >
                                        <MdDeleteOutline />
                                      </button>
                                      <button
                                        className="p-[0.25rem_0.5rem] rounded-[0.25rem] border-[1px] border-[#e2e8f0] bg-[#ffff]"
                                        onClick={() =>
                                          handlePinDrafts(post.article_id)
                                        }
                                        title={
                                          pinnedDrafts.some(
                                            (draft: any) =>
                                              draft.article_id ===
                                              post.article_id
                                          )
                                            ? "Unpin draft"
                                            : "Pin draft"
                                        }
                                      >
                                        <BsPinAngle />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-[14px] text-[#64748b]">
                              You have not published anything.
                            </p>
                          ))}
                      </div>
                    </div>
                    <div className="border-t-[#e2e8f0] border-t-[1px]">
                      <div className="p-[20px_16px] flex flex-col gap-[4px]">
                        <div className="flex items-center gap-[8px] p-[6px_8px] hover:bg-purple-50 rounded-[6px]">
                          <MdOutlineRocketLaunch className="text-blue-600" />
                          <button className="text-[14px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-600 to-purple-700 ">
                            Upgrade to Pro
                          </button>
                        </div>

                        <div className="flex items-center gap-[8px] p-[6px_8px] hover:bg-[#f1f5f9] rounded-[6px]">
                          <PiFilesThin className="text-[#475569]" />
                          <button className="text-[14px] font-medium text-[#475569]">
                            View deleted articles
                          </button>
                        </div>

                        <div className="flex items-center gap-[8px] p-[6px_8px] hover:bg-[#f1f5f9] rounded-[6px]">
                          <IoSettingsOutline className="text-[#475569]" />
                          <button className="text-[14px] font-medium text-[#475569]">
                            Blog dashboard
                          </button>
                        </div>
                        <div className="relative hover:bg-[#f8fafc] mt-[16px]">
                          <BiLeftArrowAlt className="absolute left-[30px] text-[#657c91] top-[50%] translate-y-[-50%] text-[20px]" />
                          <button
                            className="p-[10px_20px] outline-none w-full border-[1px] border-[#cbd5e1] rounded-[30px] text-[14px] text-[#657c91]"
                            onClick={() => router.push("/dashboard")}
                          >
                            Back to Hashnode
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full border-r-[#e2e8f0cc] border-r-[1px]">
            <div className="flex justify-between items-center px-[1.25rem] py-[1rem]">
              <div>
                <button className="rounded-full text-[#334155] p-[0.25px_0.75px] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-[#e2e8f0]">
                  <MdOutlineRocketLaunch />
                  {/* <Image src='/loop.svg' alt="loop" width={100} height={100} /> */}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="border-r-[1px] border-r-[#e2e8f0] flex items-center">
                  <button className="rounded-full text-[#334155] p-[0.25px_0.75px] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-[#e2e8f0]">
                    <MdOutlineRocketLaunch />
                  </button>
                  <button className="rounded-full text-[#334155] p-[0.25px_0.75px] text-[1.5rem] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-[#e2e8f0] mr-[0.5rem]">
                    <MdKeyboardArrowDown />
                  </button>
                </div>
                <div className="flex gap-[0.5rem] items-center ml-[0.5rem]">
                  <button
                    className={`hover:bg-[#e2e8f0] border-[1px] border-[#e2e8f0] rounded-full text-[#334155] text-[1rem] font-medium p-[0.25rem_0.625rem] ${selectedData?.status === "publish"
                      ? "cursor-not-allowed"
                      : ""
                      }`}
                    onClick={handleSaveDraft}
                    disabled={selectedData?.status === "publish"}
                  >
                    Save To Draft
                  </button>
                  <button
                    className="bg-[#2563eb] border-[1px] border-[#2563eb] rounded-full text-[#ffff] text-[1rem] font-medium p-[0.25rem_0.625rem]"
                    onClick={handlePublish}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-[850px] m-auto ">
              <div className="flex items-center gap-[0.5rem] mb-[2.5rem]">
                <button className="text-[#334155] flex items-center gap-[0.5rem] rounded-full p-[0.25rem_0.5rem] hover:bg-[#e2e8f0] font-medium">
                  <GrGallery />
                  <label className="">Add Cover</label>
                </button>
                {!showSubtitle && (
                  <button
                    className="text-[#334155] flex items-center gap-[0.5rem] rounded-full p-[0.25rem_0.5rem] hover:bg-[#e2e8f0] font-medium"
                    onClick={() => {
                      setShowSubtitle(true);
                    }}
                  >
                    <PiSubtitlesThin />
                    <label>Add Subtitle</label>
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  {/* <div className="">
                    <button className="text-[#cbd5e1] text-[16px] hover:bg-[#e2e8f0] rounded-full  p-[0.25px_0.75px] w-[2rem] h-[2rem] flex justify-center items-center">
                      <MdOutlineLibraryAdd />
                    </button>
                  </div> */}
                  <textarea
                    name="title"
                    id="title"
                    placeholder="Article Title..."
                    className="w-full border-none outline-none resize-none appearance-none placeholder:text-[2.25rem] text-[2.25rem] placeholder:font-extrabold px-[1rem] "
                    value={
                      selectedData
                        ? selectedData.article_des.title
                        : article.title
                    }
                    onChange={handleChange}
                  ></textarea>
                </div>

                {showSubtitle && (
                  <div className="relative">
                    <textarea
                      name="subtitle"
                      id="subtitle"
                      placeholder="Article Subtitle..."
                      className="w-full border-none outline-none resize-none appearance-none placeholder:text-[1.5rem] placeholder:font-medium px-[1rem] text-[1.5rem] overflow-hidden pr-[30px]"
                      value={
                        selectedData
                          ? selectedData.article_des.subtitle
                          : article.subtitle
                      }
                      onChange={handleChange}
                    ></textarea>
                    <button
                      className="text-[#cbd5e1] text-[20px] hover:bg-[#e2e8f0] rounded-full  p-[0.25px_0.75px] w-[2rem] h-[2rem] flex justify-center items-center absolute right-0 top-[4px]"
                      onClick={() => {
                        setShowSubtitle(false);
                      }}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                )}
                {/* <Editor /> */}
                <textarea
                  name="description"
                  id="description"
                  placeholder="Article Description ..."
                  className="text-[1.25rem] placeholder:text-[1.25rem] w-full border-none outline-none resize-none appearance-none px-[1rem]"
                  value={
                    selectedData
                      ? selectedData.article_des.description
                      : article.description
                  }
                  onChange={handleChange}
                ></textarea>
                <div>
                  <label htmlFor="file" className="text-left block"></label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="border-2 hover:border-blue-500 rounded w-full"
                    onChange={handleChange}
                    ref={fileInputRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
