import { getWordPressPosts } from "@/lib/getPosts";
import Tailwind3DCard from "@/components/cards/Tailwind3DCard";



export default async function AllBlogsPage() {
  const posts = await getWordPressPosts(100);

  return (
    <main className="bg-black min-h-screen py-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl text-white font-bold mb-12">All Insights</h1>

        {/* Grid layout for all blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post: any) => (
            <a href={`/blogs/${post.slug}`} key={post.slug}>
              <Tailwind3DCard title={post.title} image={post.image} />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}