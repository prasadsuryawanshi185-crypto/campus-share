import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import {
  CATEGORIES,
  CONDITIONS,
  SHARING_TYPES,
  CAMPUS_PICKUP_POINTS,
  DEPARTMENTS,
  ACADEMIC_YEARS
} from "../../utils/constants";
import { PlusCircle, Upload, Image as ImageIcon, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";

const PRESET_SAMPLE_IMAGES = [
  { label: "Algorithms / Textbook", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" },
  { label: "Scientific Calculator", url: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80" },
  { label: "Arduino / Electronics", url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80" },
  { label: "Study Notes / Notebook", url: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80" },
  { label: "Lab Equipment", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
];

export const AddResourceModal = ({
  isOpen,
  onClose,
  initialData = null
}) => {
  const { currentUser } = useAuth();
  const { handleAddResource, handleUpdateResource } = useResources();

  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Books");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("Good");
  const [sharingType, setSharingType] = useState("Borrow");
  const [maxDuration, setMaxDuration] = useState("30 Days");
  const [preferredPickup, setPreferredPickup] = useState(CAMPUS_PICKUP_POINTS[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [academicYear, setAcademicYear] = useState(ACADEMIC_YEARS[2]);
  const [imageUrl, setImageUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "Books");
      setDescription(initialData.description || "");
      setCondition(initialData.condition || "Good");
      setSharingType(initialData.sharingType || "Borrow");
      setMaxDuration(initialData.maxDuration || "30 Days");
      setPreferredPickup(initialData.preferredPickup || CAMPUS_PICKUP_POINTS[0]);
      setDepartment(initialData.department || DEPARTMENTS[0]);
      setAcademicYear(initialData.academicYear || ACADEMIC_YEARS[2]);
      setImageUrl(initialData.imageUrl || "");
      setTagsInput(initialData.tags ? initialData.tags.join(", ") : "");
    } else {
      // Reset form
      setTitle("");
      setCategory("Books");
      setDescription("");
      setCondition("Good");
      setSharingType("Borrow");
      setMaxDuration("30 Days");
      setPreferredPickup(CAMPUS_PICKUP_POINTS[0]);
      setDepartment(currentUser?.department || DEPARTMENTS[0]);
      setAcademicYear(currentUser?.academicYear || ACADEMIC_YEARS[2]);
      setImageUrl(PRESET_SAMPLE_IMAGES[0].url);
      setTagsInput("");
    }
  }, [initialData, currentUser, isOpen]);

  // Handle local image file picker
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!pledgeChecked) {
      alert("Please accept the community engagement pledge to share resources.");
      return;
    }

    try {
      setSubmitting(true);
      const tags = tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const payload = {
        title,
        category,
        description,
        condition,
        sharingType,
        maxDuration,
        preferredPickup,
        department,
        academicYear,
        imageUrl: imageUrl || PRESET_SAMPLE_IMAGES[0].url,
        tags
      };

      if (isEditing) {
        await handleUpdateResource(initialData.id, payload);
      } else {
        await handleAddResource(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Resource Listing" : "Share an Academic Resource"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Resource Title & Edition *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Introduction to Algorithms (CLRS 3rd Ed) or Casio fx-991EX ClassWiz"
            className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
          />
        </div>

        {/* Category & Condition Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {CATEGORIES.filter(c => c.id !== "all").map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Condition *
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {CONDITIONS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sharing Type & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sharing Preference *
            </label>
            <select
              value={sharingType}
              onChange={(e) => setSharingType(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {SHARING_TYPES.map(st => (
                <option key={st.value} value={st.value}>{st.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Max Duration / Lending Terms *
            </label>
            <input
              type="text"
              required
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
              placeholder="e.g. 15 Days, One Semester, or Permanent"
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Department & Academic Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Department Relevance
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Recommended Year / Semester
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {ACADEMIC_YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Campus Pickup Point */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Campus Handover Location *
          </label>
          <select
            value={preferredPickup}
            onChange={(e) => setPreferredPickup(e.target.value)}
            className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
          >
            {CAMPUS_PICKUP_POINTS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Detailed Description & Notes *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the item condition, author, highlighted chapters, included kit accessories, and any advice for the borrowing student..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
          />
        </div>

        {/* Image Selection / Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Resource Image (URL or Upload Photo)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste direct image URL or pick preset below..."
              className="flex-1 text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
            />
            <label className="cursor-pointer px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center gap-1.5 flex-shrink-0">
              <Upload className="w-3.5 h-3.5" />
              <span>Browse</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 self-center">Presets:</span>
            {PRESET_SAMPLE_IMAGES.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageUrl(preset.url)}
                className={`text-[10px] px-2 py-1 rounded-md border transition ${
                  imageUrl === preset.url
                    ? "bg-blue-50 text-blue-700 border-blue-300 font-bold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Search Tags (Comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. GATE, DSA, Algorithms, Semester 5, Microcontroller"
            className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
          />
        </div>

        {/* Community Pledge Checkbox */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
          <input
            type="checkbox"
            id="pledge"
            checked={pledgeChecked}
            onChange={(e) => setPledgeChecked(e.target.checked)}
            className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="pledge" className="text-xs text-slate-700 cursor-pointer">
            <strong>Community Engagement Program (CEP) Assurance:</strong> I confirm this resource belongs to me and is in clean, usable condition for academic peers at Walchand College of Engineering.
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{submitting ? "Saving Listing..." : (isEditing ? "Save Changes" : "Publish Listing")}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
