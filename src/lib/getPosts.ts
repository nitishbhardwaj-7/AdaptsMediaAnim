const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getWordPressPosts(limit: number = 100) {
  if (!BASE_URL) {
    console.error("WORDPRESS_URL is not defined in environment variables");
    return [];
  }

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${limit}&_fields=title,slug,date,categories,featured_media,_links,_embedded`,
      { next: { revalidate: 600 } } // Cache for 10 minutes
    );

    if (!res.ok) throw new Error(`WordPress API returned status: ${res.status}`);

    const posts = await res.json();

    return posts.map((post: any) => ({
      // Decoding titles for production-ready text
      title: post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: number) => String.fromCharCode(dec)),
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback.jpg",
      slug: post.slug,
      date: post.date,
      categories: post._embedded?.['wp:term']?.[0]?.filter((t: any) => t.taxonomy === 'category').map((c: any) => c.name) || [],
      content: "",
    }));
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return []; // Return empty array so .map() doesn't break your UI
  }
}

export async function getSinglePost(slug: string) {
  if (!BASE_URL) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) return null;

    const posts = await res.json();
    
    if (!posts || posts.length === 0) return null;

    return posts[0];
  } catch (error) {
    console.error(`Error fetching single post [${slug}]:`, error);
    return null;
  }
}