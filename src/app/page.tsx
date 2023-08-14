import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3001/api/v1/posts");
//   const posts = await res.json();

//   console.log(posts);

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// }

export default function Home() {
  return (
    <>
      <Link href="/view">一覧へ</Link>
    </>
  );
}
