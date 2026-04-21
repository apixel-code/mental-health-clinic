import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/blogs?published_only=true`);
        setBlogs(res.data );
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main data-testid="blog-page" className="pt-24 pb-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D98A6C] text-sm font-medium tracking-wider uppercase mb-4 block">
            মানসিক স্বাস্থ্য ব্লগ
          </span>
          <h1
            className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4"
            data-testid="blog-page-title"
          >
            জ্ঞান ও সচেতনতা
          </h1>
          <p className="text-base text-[#475569] max-w-2xl mx-auto">
            মানসিক স্বাস্থ্য নিয়ে গুরুত্বপূর্ণ তথ্য ও পরামর্শ পড়ুন
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 animate-pulse"
              >
                <div className="w-full h-48 bg-[#F3F4F1] rounded-2xl mb-6" />
                <div className="h-6 bg-[#F3F4F1] rounded-lg mb-3 w-3/4" />
                <div className="h-4 bg-[#F3F4F1] rounded-lg w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-testid="blog-empty-state"
          >
            <BookOpen size={48} className="mx-auto text-[#94A3B8] mb-6" />
            <h3 className="font-heading text-xl text-[#475569] mb-2">
              এখনো কোনো ব্লগ পোস্ট নেই
            </h3>
            <p className="text-sm text-[#94A3B8]">
              শীঘ্রই নতুন নিবন্ধ প্রকাশিত হবে
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${blog.id}`}
                  data-testid={`blog-card-${i}`}
                  className="group block bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 card-hover h-full"
                >
                  {blog.thumbnail && (
                    <div className="overflow-hidden">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    {blog.category && (
                      <span className="inline-block text-xs font-medium text-[#D98A6C] bg-[#D98A6C]/10 px-3 py-1 rounded-full mb-4">
                        {blog.category}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#2C4B3B] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <Calendar size={13} />
                        <span>
                          {new Date(blog.created_at).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-[#2C4B3B] group-hover:gap-2 transition-all">
                        পড়ুন <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
