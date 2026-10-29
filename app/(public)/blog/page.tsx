import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data/content';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Varanasi Real Estate & Construction Guides | JR Real Estate',
  description:
    'Authoritative guides on circle rates, registry procedure, VDA approval regulations, and house construction in Varanasi.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kashi Property Intelligence &amp; Builder Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Real Estate &amp; Construction Guides
          </h1>

          <p className="text-sm text-ivory/70 leading-relaxed">
            Legal procedures, circle rate revisions, foundation engineering, and investment corridors in Varanasi explained simply for home buyers and plot owners.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-charcoal-200 border border-charcoal-100 rounded-2xl overflow-hidden shadow-xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {post.coverImage && (
                  <div className="relative aspect-[16/9] w-full bg-charcoal-300 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-charcoal/90 text-gold border border-gold/40">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-ivory/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{post.publishedAt}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gold" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif font-bold text-xl text-ivory group-hover:text-gold transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
