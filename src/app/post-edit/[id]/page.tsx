"use client";

import { Post } from "@/app/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export async function getPost(params: string) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params}`);
  const post: Post = await res.json();
  return post;
}

function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  //APIからpostデータ取得
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data: Post = await getPost(params.id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${params.id}`, {
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
            value={title}
          />
          <label htmlFor="content">content</label>
          <textarea
            value={content}
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

export default EditPost;
