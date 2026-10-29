import React from 'react';
import { getFaqs, getBlogPosts } from '@/lib/data/content';
import Link from 'next/link';
import { FileText, HelpCircle, MessageSquare, Plus, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminContentPage() {
  const [faqs, blogs] = await Promise.all([getFaqs(), getBlogPosts()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">
          Content Management System (CMS)
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Manage Varanasi property guides, frequently asked questions, and verified reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQs */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold" />
              <span>Published FAQs ({faqs.length})</span>
            </h2>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-xs">
            {faqs.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-gold uppercase">{f.category}</span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
                <h3 className="font-serif font-bold text-ivory text-sm">{f.question}</h3>
                <p className="text-ivory/70 line-clamp-2 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Guides */}
        <div className="bg-charcoal-200 border border-charcoal-100 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
            <h2 className="font-serif font-bold text-lg text-ivory flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              <span>Property Guides &amp; Articles ({blogs.length})</span>
            </h2>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-xs">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-charcoal-300 border border-charcoal-100/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-gold uppercase">{b.category}</span>
                  <span className="text-ivory/50">{b.publishedAt}</span>
                </div>
                <h3 className="font-serif font-bold text-ivory text-sm">{b.title}</h3>
                <p className="text-ivory/70 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-ivory/50">Author: {b.author}</span>
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="text-gold font-bold hover:underline"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
