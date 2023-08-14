import { Post } from "@/app/types";
import Link from "next/link";

export async function getPost(params: string) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params}`, {
    cache: "no-cache",
  });
  const post: Post = await res.json();
  return post;
}

const BlogPost = async ({ params }: { params: { id: string } }) => {
  const data: Post = await getPost(params.id);
  return (
    <div>
      <h1>{params.id}</h1>
      <p>{data.title}</p>
      <p>{data.content}</p>
      <p>{data.created_at}</p>
      <Link href="/view">go back</Link>
    </div>
  );
};

export default BlogPost;
