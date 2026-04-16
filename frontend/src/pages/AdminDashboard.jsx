import axios from "axios";
import {
  BookOpen,
  CalendarDays,
  Eye,
  EyeOff,
  FileText,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");
  const [blogs, setBlogs] = useState([]);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    thumbnail: "",
    published: true,
  });

  // Check auth
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
      setApiError("");
    } catch (err) {
      console.error("Error fetching blogs:", err);
      const detail = err?.response?.data?.detail;
      setApiError(
        detail ||
          "ব্লগ লোড করা যায়নি। ব্যাকএন্ড সার্ভার চালু আছে কিনা যাচাই করুন।",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  const openCreateDialog = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      thumbnail: "",
      published: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      thumbnail: blog.thumbnail,
      published: blog.published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingBlog) {
        await axios.put(`${API}/blogs/${editingBlog.id}`, formData);
      } else {
        await axios.post(`${API}/blogs`, formData);
      }
      setApiError("");
      setDialogOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      const detail = err?.response?.data?.detail;
      setApiError(
        detail ||
          "পোস্ট সেভ করা যায়নি। ব্যাকএন্ড সার্ভার ও ডেটাবেস কানেকশন যাচাই করুন।",
      );
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("এই পোস্টটি মুছে ফেলতে চান?")) {
      try {
        await axios.delete(`${API}/blogs/${blogId}`);
        setApiError("");
        fetchBlogs();
      } catch (err) {
        console.error("Error deleting blog:", err);
        const detail = err?.response?.data?.detail;
        setApiError(detail || "পোস্ট ডিলিট করা যায়নি।");
      }
    }
  };

  const tabs = [
    { id: "blog", label: "ব্লগ ম্যানেজ", icon: BookOpen },
    { id: "appointments", label: "অ্যাপয়েন্টমেন্ট", icon: CalendarDays },
    { id: "content", label: "কন্টেন্ট এডিট", icon: FileText },
  ];

  return (
    <main data-testid="admin-dashboard" className="min-h-screen bg-[#F3F4F1]">
      {/* Top Bar */}
      <div className="bg-[#1A2E24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1
            className="font-heading text-lg font-semibold"
            data-testid="admin-dashboard-title"
          >
            অ্যাডমিন ড্যাশবোর্ড
          </h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <LogOut size={18} className="mr-2" />
            লগ আউট
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
          data-testid="admin-tabs"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`admin-tab-${tab.id}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#2C4B3B] text-white shadow-md"
                    : "bg-white text-[#475569] hover:bg-[#EBECE8]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <h2 className="font-heading text-xl font-bold text-[#0F172A]">
                ব্লগ পোস্ট
              </h2>
              <Button
                onClick={openCreateDialog}
                data-testid="create-blog-btn"
                className="bg-[#2C4B3B] hover:bg-[#1E3529] text-white rounded-xl"
              >
                <Plus size={16} className="mr-2" />
                নতুন পোস্ট
              </Button>
            </div>

            {apiError && (
              <div
                className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                data-testid="admin-blog-api-error"
              >
                {apiError}
              </div>
            )}

            {loading ? (
              <div className="p-10 text-center text-[#94A3B8]">লোড হচ্ছে...</div>
            ) : blogs.length === 0 ? (
              <div
                className="p-10 text-center"
                data-testid="admin-blog-empty"
              >
                <BookOpen size={40} className="mx-auto text-[#94A3B8] mb-4" />
                <p className="text-[#94A3B8]">কোনো ব্লগ পোস্ট নেই</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#475569]">শিরোনাম</TableHead>
                      <TableHead className="text-[#475569]">ক্যাটাগরি</TableHead>
                      <TableHead className="text-[#475569]">স্ট্যাটাস</TableHead>
                      <TableHead className="text-[#475569]">তারিখ</TableHead>
                      <TableHead className="text-[#475569] text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog, i) => (
                      <TableRow key={blog.id}>
                        <TableCell
                          className="font-medium text-[#0F172A] max-w-[200px] truncate"
                          data-testid={`blog-row-title-${i}`}
                        >
                          {blog.title}
                        </TableCell>
                        <TableCell className="text-[#475569] text-sm">
                          {blog.category || "—"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                              blog.published
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {blog.published ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff size={12} />
                            )}
                            {blog.published ? "প্রকাশিত" : "ড্রাফট"}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-[#94A3B8]">
                          {new Date(blog.created_at).toLocaleDateString("bn-BD")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(blog)}
                              data-testid={`edit-blog-btn-${i}`}
                              className="text-[#475569] hover:text-[#2C4B3B]"
                            >
                              <Pencil size={15} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(blog.id)}
                              data-testid={`delete-blog-btn-${i}`}
                              className="text-[#475569] hover:text-red-500"
                            >
                              <Trash2 size={15} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}

        {/* Appointments Tab - Placeholder */}
        {activeTab === "appointments" && (
          <div
            className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center"
            data-testid="admin-appointments-placeholder"
          >
            <CalendarDays size={48} className="mx-auto text-[#94A3B8] mb-4" />
            <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-2">
              অ্যাপয়েন্টমেন্ট ম্যানেজমেন্ট
            </h3>
            <p className="text-sm text-[#94A3B8]">
              এই ফিচারটি শীঘ্রই আসছে
            </p>
          </div>
        )}

        {/* Content Edit Tab - Placeholder */}
        {activeTab === "content" && (
          <div
            className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center"
            data-testid="admin-content-placeholder"
          >
            <FileText size={48} className="mx-auto text-[#94A3B8] mb-4" />
            <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-2">
              কন্টেন্ট এডিটর
            </h3>
            <p className="text-sm text-[#94A3B8]">
              এই ফিচারটি শীঘ্রই আসছে
            </p>
          </div>
        )}
      </div>

      {/* Blog Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {editingBlog ? "পোস্ট সম্পাদনা" : "নতুন পোস্ট তৈরি"}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#94A3B8]">
              {editingBlog ? "বিদ্যমান পোস্টে পরিবর্তন করুন" : "একটি নতুন ব্লগ পোস্ট তৈরি করুন"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 mt-4">
            <div>
              <label className="text-sm font-medium text-[#475569] mb-1.5 block">
                শিরোনাম
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                data-testid="blog-form-title"
                placeholder="ব্লগ শিরোনাম লিখুন"
                className="bg-[#F3F4F1] border-0 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#475569] mb-1.5 block">
                ক্যাটাগরি
              </label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                data-testid="blog-form-category"
                placeholder="যেমন: উদ্বেগ, বিষণ্নতা"
                className="bg-[#F3F4F1] border-0 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#475569] mb-1.5 block">
                সারাংশ
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                data-testid="blog-form-excerpt"
                placeholder="সংক্ষিপ্ত বিবরণ লিখুন"
                rows={3}
                className="w-full bg-[#F3F4F1] border-0 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2C4B3B]/20 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#475569] mb-1.5 block">
                কন্টেন্ট (HTML সাপোর্টেড)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                data-testid="blog-form-content"
                placeholder="ব্লগ পোস্টের পূর্ণ কন্টেন্ট লিখুন"
                rows={10}
                className="w-full bg-[#F3F4F1] border-0 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2C4B3B]/20 resize-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#475569] mb-1.5 block">
                থাম্বনেইল URL
              </label>
              <Input
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                data-testid="blog-form-thumbnail"
                placeholder="https://example.com/image.jpg"
                className="bg-[#F3F4F1] border-0 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setFormData({ ...formData, published: !formData.published })
                }
                data-testid="blog-form-published-toggle"
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  formData.published ? "bg-[#2C4B3B]" : "bg-[#94A3B8]"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.published ? "left-7" : "left-1"
                  }`}
                />
              </button>
              <span className="text-sm text-[#475569]">
                {formData.published ? "প্রকাশিত" : "ড্রাফট"}
              </span>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                data-testid="blog-form-save-btn"
                className="flex-1 bg-[#2C4B3B] hover:bg-[#1E3529] text-white rounded-xl"
              >
                <Save size={16} className="mr-2" />
                {editingBlog ? "আপডেট করুন" : "প্রকাশ করুন"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-testid="blog-form-cancel-btn"
                className="rounded-xl"
              >
                <X size={16} className="mr-2" />
                বাতিল
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
