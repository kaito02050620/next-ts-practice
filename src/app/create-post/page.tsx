"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/v1/posts", {
        title: title,
        content: content,
      });
      router.push("/view");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>新規投稿</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">title</label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            type="text"
          />
          <label htmlFor="content">content</label>
          <textarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          ></textarea>
          <button type="submit">投稿</button>
        </form>
        <Link href="/view">一覧へ戻る</Link>
      </div>
    </>
  );
}

export default CreatePost;
