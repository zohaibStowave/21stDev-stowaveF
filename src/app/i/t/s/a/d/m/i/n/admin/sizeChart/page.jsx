"use client";

// FILE PATH: app/admin/size-charts/page.jsx
//
// Assumes these backend routes (routes/sizeChartRoutes.js) are mounted at /api/sizecharts:
//   GET    /api/sizecharts
//   GET    /api/sizecharts/category/:category
//   GET    /api/sizecharts/:id
//   POST   /api/sizecharts        (multipart/form-data — title, category, rows, image file)
//   PUT    /api/sizecharts/:id    (multipart/form-data)
//   DELETE /api/sizecharts/:id
//
// The image is sent as a file field named "image" (multipart/form-data), so the
// controller needs multer (or similar) wired up to receive it, e.g.:
//   const upload = multer({ storage: ... });
//   router.post('/', upload.single('image'), createSizeChart);
//   router.put('/:id', upload.single('image'), updateSizeChart);

import { useEffect, useRef, useState } from "react";

const API_BASE = "/api/sizecharts";
const CATEGORIES = ["Men", "Women", "Kids", "Shoes", "Accessories"];

const emptyForm = {
  _id: null,
  title: "",
  category: CATEGORIES[0],
  imageFile: null,
  existingImageUrl: "",
  rows: [{ size: "", chest: "", waist: "", hip: "", length: "" }],
};

export default function SizeChartAdminPage() {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCharts();
  }, []);

  async function fetchCharts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Could not load size charts");
      const data = await res.json();
      setCharts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleEdit(chart) {
    setForm({
      _id: chart._id,
      title: chart.title || "",
      category: chart.category || CATEGORIES[0],
      imageFile: null,
      existingImageUrl: chart.imageUrl || chart.image || "",
      rows: chart.rows && chart.rows.length ? chart.rows : emptyForm.rows,
    });
    setPreviewUrl(chart.imageUrl || chart.image || "");
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this size chart? This can't be undone.")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCharts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));
    setPreviewUrl(URL.createObjectURL(file));
  }

  function updateRow(index, field, value) {
    setForm((prev) => {
      const rows = [...prev.rows];
      rows[index] = { ...rows[index], [field]: value };
      return { ...prev, rows };
    });
  }

  function addRow() {
    setForm((prev) => ({
      ...prev,
      rows: [...prev.rows, { size: "", chest: "", waist: "", hip: "", length: "" }],
    }));
  }

  function removeRow(index) {
    setForm((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const isEdit = Boolean(form._id);
      const url = isEdit ? `${API_BASE}/${form._id}` : API_BASE;
      const method = isEdit ? "PUT" : "POST";

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("rows", JSON.stringify(form.rows));
      if (form.imageFile) fd.append("image", form.imageFile);

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error(isEdit ? "Update failed" : "Create failed");

      await fetchCharts();
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#211C18] px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-7 flex items-center gap-3.5">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FBEFE7]">
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
              <path d="M4 6h26M4 17h26M4 28h18" stroke="#C25B2E" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="27" cy="28" r="3" stroke="#C25B2E" strokeWidth="2.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Size charts</h1>
            <p className="mt-1 text-sm text-[#6B6259]">Add and manage the fit guides shown on product pages.</p>
          </div>
        </header>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-9 rounded-2xl border border-[#E9E2D8] bg-white p-6 shadow-sm">
          <h2 className="mb-4.5 text-[17px] font-semibold">{form._id ? "Edit chart" : "New chart"}</h2>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col">
              <span className="mb-1.5 text-[13px] font-medium text-[#4A433C]">Title</span>
              <input
                className="rounded-md border border-[#DCD3C6] bg-[#FDFCFA] px-3 py-2 text-sm outline-none focus:border-[#C25B2E]"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Women's tops — standard fit"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1.5 text-[13px] font-medium text-[#4A433C]">Category</span>
              <select
                className="rounded-md border border-[#DCD3C6] bg-[#FDFCFA] px-3 py-2 text-sm outline-none focus:border-[#C25B2E]"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4.5 flex flex-col">
            <span className="mb-1.5 text-[13px] font-medium text-[#4A433C]">Chart image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="rounded-md border border-[#DCD3C6] bg-[#FDFCFA] px-3 py-2 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-[#C25B2E] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
            />

            {previewUrl && (
              <div className="mt-3 flex justify-center rounded-lg border border-dashed border-[#DCD3C6] bg-[#FDFCFA] p-2.5">
                <img src={previewUrl} alt="Size chart preview" className="max-h-44 rounded object-contain" />
              </div>
            )}
          </div>

          <div className="mb-1.5 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#4A433C]">Measurements</span>
              <button
                type="button"
                onClick={addRow}
                className="rounded-md border border-[#DCD3C6] bg-white px-2.5 py-1 text-xs text-[#4A433C] hover:bg-[#FDFCFA]"
              >
                + Add size
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#E9E2D8]">
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_28px] gap-2 bg-[#F5F0E9] px-2.5 py-2 text-xs font-medium text-[#847A6E]">
                <span>Size</span>
                <span>Chest</span>
                <span>Waist</span>
                <span>Hip</span>
                <span>Length</span>
                <span></span>
              </div>
              {form.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_28px] items-center gap-2 border-t border-[#EFEAE2] px-2.5 py-1.5"
                >
                  <input className="rounded border border-[#E2D9CC] px-2 py-1.5 text-[13px] outline-none focus:border-[#C25B2E]" value={row.size} onChange={(e) => updateRow(i, "size", e.target.value)} placeholder="S" />
                  <input className="rounded border border-[#E2D9CC] px-2 py-1.5 text-[13px] outline-none focus:border-[#C25B2E]" value={row.chest} onChange={(e) => updateRow(i, "chest", e.target.value)} placeholder="36" />
                  <input className="rounded border border-[#E2D9CC] px-2 py-1.5 text-[13px] outline-none focus:border-[#C25B2E]" value={row.waist} onChange={(e) => updateRow(i, "waist", e.target.value)} placeholder="30" />
                  <input className="rounded border border-[#E2D9CC] px-2 py-1.5 text-[13px] outline-none focus:border-[#C25B2E]" value={row.hip} onChange={(e) => updateRow(i, "hip", e.target.value)} placeholder="38" />
                  <input className="rounded border border-[#E2D9CC] px-2 py-1.5 text-[13px] outline-none focus:border-[#C25B2E]" value={row.length} onChange={(e) => updateRow(i, "length", e.target.value)} placeholder="27" />
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    disabled={form.rows.length === 1}
                    className="text-lg leading-none text-red-400 hover:text-red-600 disabled:opacity-30"
                    aria-label="Remove row"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2.5">
            {form._id && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-[#DCD3C6] px-4.5 py-2.5 text-sm text-[#6B6259] hover:bg-[#FDFCFA]"
              >
                Cancel edit
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[#C25B2E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#AD4E26] disabled:opacity-60"
            >
              {saving ? "Saving..." : form._id ? "Save changes" : "Create chart"}
            </button>
          </div>
        </form>

        <section>
          <h2 className="mb-3.5 text-base font-semibold">Existing charts</h2>
          {loading ? (
            <p className="text-sm text-[#8C8177]">Loading...</p>
          ) : charts.length === 0 ? (
            <p className="text-sm text-[#8C8177]">No size charts yet. Add one above.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {charts.map((chart) => (
                <div
                  key={chart._id}
                  className="flex items-center gap-3.5 rounded-xl border border-[#E9E2D8] bg-white p-3"
                >
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-[#F5F0E9]">
                    {(chart.imageUrl || chart.image) ? (
                      <img src={chart.imageUrl || chart.image} alt={chart.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-1 text-center text-[10px] text-[#A99E90]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14.5px] font-semibold">{chart.title}</p>
                    <p className="mt-0.5 text-xs text-[#8C8177]">{chart.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(chart)}
                      className="rounded-md border border-[#DCD3C6] px-3 py-1.5 text-xs text-[#4A433C] hover:bg-[#FDFCFA]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(chart._id)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}