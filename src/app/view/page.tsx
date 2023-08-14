"use client";

import { Post } from "../types";
import styles from "../page.module.css";
import Link from "next/link";
import axios from "axios";

async function getData(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/v1/posts", {
    next: { revalidate: 5 },
  });
  const posts: Post[] = await res.json();
  return posts;
}

const View = async () => {
  const data: Post[] = await getData();

  const deletePost = async (id: string) => {
    // e.preventDefault()
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <h1>一覧</h1>
        <Link href="/create-post" className={styles.createButton}>
          投稿する
        </Link>
        <div>
          {data.map((post: Post) => {
            return (
              <div key={post.id} className={styles.postCard}>
                <Link href={`/post/${post.id}`} className={styles.postCardBox}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>
                <Link
                  href={`/post-edit/${post.id}`}
                  className={styles.editButton}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default View;
