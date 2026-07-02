import { getWordPressPosts } from "@/lib/getPosts";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";

export default async function AllBlogsPage() {
  const posts = await getWordPressPosts(100);

  return (
    <main className="bg-black min-h-screen">
      <BlogHero />
      <BlogList posts={posts} />
    </main>
  );
}