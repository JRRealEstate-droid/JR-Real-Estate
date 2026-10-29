import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data/content';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | JR Real Estate' };

  return {
    title: `${post.title} | JR Real Estate Varanasi`,
    description: post.excerpt,
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const otherPosts = (await getBlogPosts()).filter((p) => p.slug !== post.slug);

  return (
    <div className="py-12 bg-charcoal min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-gold text-charcoal">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-ivory/60 pb-4 border-b border-charcoal-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              <span>{post.publishedAt}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" />
              <span>{post.author}</span>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-charcoal-300 border border-charcoal-100 shadow-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 sm:p-10 shadow-lg text-sm text-ivory/85 leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        {/* Consultation Callout */}
        <div className="p-6 rounded-2xl bg-charcoal-300 border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-base text-ivory">
              Need personalized advice for your property or plot in Varanasi?
            </h3>
            <p className="text-xs text-ivory/60 mt-0.5">
              Speak directly with Director Umesh Yadav at our Pandeypur Chauraha office.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-gold text-charcoal font-bold text-xs shadow-gold hover:bg-gold-hover transition-colors flex-shrink-0"
          >
            Schedule Consultation
          </Link>
        </div>

        {/* Other articles */}
        {otherPosts.length > 0 && (
          <div className="pt-8 border-t border-charcoal-100 space-y-4">
            <h3 className="font-serif font-bold text-xl text-ivory">More Real Estate Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.slice(0, 2).map((other) => (
                <Link
                  key={other.id}
                  href={`/blog/${other.slug}`}
                  className="p-4 rounded-xl bg-charcoal-200 border border-charcoal-100 hover:border-gold/40 transition-colors block space-y-1"
                >
                  <span className="text-[10px] text-gold uppercase font-bold">{other.category}</span>
                  <h4 className="font-serif font-bold text-sm text-ivory line-clamp-1">{other.title}</h4>
                  <p className="text-xs text-ivory/60 line-clamp-2">{other.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
