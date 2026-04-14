import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPostPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="h-8 bg-[#F3F4F1] rounded-lg w-1/3 mb-8" />
          <div className="h-12 bg-[#F3F4F1] rounded-xl w-3/4 mb-4" />
          <div className="h-6 bg-[#F3F4F1] rounded-lg w-1/2 mb-8" />
          <div className="h-72 bg-[#F3F4F1] rounded-2xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-[#F3F4F1] rounded-lg w-full" />
            <div className="h-4 bg-[#F3F4F1] rounded-lg w-full" />
            <div className="h-4 bg-[#F3F4F1] rounded-lg w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-[#FDFBF7]" data-testid="blog-not-found">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
          <h2 className="font-heading text-2xl text-[#0F172A] mb-4">
            পোস্টটি পাওয়া যায়নি
          </h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#2C4B3B] hover:text-[#1E3529] font-medium"
          >
            <ArrowLeft size={18} />
            ব্লগে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main data-testid="blog-post-page" className="pt-28 pb-20 min-h-screen bg-[#FDFBF7]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            data-testid="blog-back-link"
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#2C4B3B] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            সব ব্লগ পোস্ট
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {blog.category && (
            <span className="inline-block text-xs font-medium text-[#D98A6C] bg-[#D98A6C]/10 px-3 py-1 rounded-full mb-4">
              {blog.category}
            </span>
          )}
          <h1
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-6"
            data-testid="blog-post-title"
          >
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-[#94A3B8] mb-10">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(blog.created_at).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {Math.max(1, Math.ceil(blog.content.split(" ").length / 200))} মিনিট পড়ার সময়
            </span>
          </div>
        </motion.div>

        {/* Featured Image */}
        {blog.thumbnail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full rounded-3xl object-cover max-h-96"
              data-testid="blog-post-image"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="blog-content text-base sm:text-lg text-[#475569] leading-relaxed"
          data-testid="blog-post-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 sm:p-10 bg-[#F3F4F1] rounded-3xl text-center"
        >
          <p className="font-heading text-xl font-semibold text-[#0F172A] mb-4">
            মানসিক স্বাস্থ্য নিয়ে কথা বলতে চান?
          </p>
          <a
            href="https://wa.me/8801700000000?text=আমি%20অ্যাপয়েন্টমেন্ট%20নিতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="blog-post-cta"
            className="inline-flex items-center gap-2 bg-[#2C4B3B] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#1E3529] transition-all duration-300"
          >
            অ্যাপয়েন্টমেন্ট বুক করুন
          </a>
        </motion.div>
      </article>
    </main>
  );
}
