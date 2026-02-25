'use client';

// ============================================
// FILE: components/SettingsPage.js
// Purpose: Admin Settings Page
//          — Privacy Policy, Terms & Conditions, About Us (Jodit editor)
//          — FAQ  (list / create / edit / delete)
// API:     lib/settingsApiClient.js  →  lib/api.js
// ============================================

import React, {
  useState, useEffect, useRef, useMemo, useCallback,
} from 'react';
import {
  ArrowLeftIcon, PlusIcon, TrashIcon,
  PencilSquareIcon, CheckIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { createFaq, deleteFaq, fetchSettingByTab, getAllFaqs, saveSettingByTab, updateFaq } from '../lib/settingsApiClient';



// ── Jodit (SSR-safe) ──────────────────────────────────────────────────────────
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: 'privacy-security', label: 'Privacy Policy'     },
  { id: 'terms-conditions', label: 'Terms & Conditions' },
  { id: 'about-us',         label: 'About Us'           },
  { id: 'faq',              label: 'FAQ'                },
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Spinning loader */
const Spinner = () => (
  <div className="flex justify-center items-center py-24">
    <div className="h-9 w-9 rounded-full border-4 border-[#FDD268] border-t-transparent animate-spin" />
  </div>
);

/** Auto-dismissing toast */
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3
      rounded-xl shadow-xl text-white text-sm font-medium animate-fade-in
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
  >
    <span>{message}</span>
    <button
      onClick={onClose}
      className="ml-1 opacity-80 hover:opacity-100 transition-opacity"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  </div>
);

/**
 * Single FAQ row with inline edit.
 * Calls parent handlers so state lives in SettingsPage.
 */
const FaqRow = ({ faq, onSave, onDelete }) => {
  const [editing,  setEditing]  = useState(false);
  const [title,    setTitle]    = useState(faq.title   ?? '');
  const [content,  setContent]  = useState(faq.content ?? '');
  const [saving,   setSaving]   = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(faq.id, { title, content });
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(faq.title   ?? '');
    setContent(faq.content ?? '');
    setEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3 bg-white shadow-sm transition-shadow hover:shadow-md">

      {/* ── Row header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        {editing ? (
          <input
            className="flex-1 text-sm font-semibold text-gray-800 bg-white border border-gray-300
                       rounded-lg px-3 py-1.5 mr-3 focus:outline-none focus:ring-2 focus:ring-[#FDD268]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question / Title"
          />
        ) : (
          <p className="text-sm font-semibold text-gray-800 truncate">
            {faq.title || <span className="text-gray-400 italic">No title</span>}
          </p>
        )}

        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1 text-xs bg-[#FDD268] hover:bg-yellow-300 text-black
                           font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckIcon className="h-3.5 w-3.5" />
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700
                           font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium
                           px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <PencilSquareIcon className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => onDelete(faq.id)}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium
                           px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                <TrashIcon className="h-3.5 w-3.5" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Row content ── */}
      {editing ? (
        <textarea
          className="w-full text-sm text-gray-700 px-4 py-3 min-h-[100px] resize-y
                     focus:outline-none focus:ring-2 focus:ring-[#FDD268]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Answer / Content"
        />
      ) : (
        <div
          className="px-4 py-3 text-sm text-gray-600 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: faq.content || '<span class="text-gray-400 italic">No content</span>',
          }}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const SettingsPage = ({ onBackClick }) => {
  const editorRef = useRef(null);

  // ── state ────────────────────────────────────────────────────────────────
  const [activeTab,       setActiveTab]       = useState('privacy-security');
  const [editableContent, setEditableContent] = useState('');
  const [faqs,            setFaqs]            = useState([]);

  // new-FAQ form
  const [newTitle,   setNewTitle]   = useState('');
  const [newContent, setNewContent] = useState('');

  // UI flags
  const [loading,    setLoading]    = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [addingFaq,  setAddingFaq]  = useState(false);
  const [toast,      setToast]      = useState(null); // { message, type }

  // ── toast helper ─────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── load content on tab change ───────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        if (activeTab === 'faq') {
          const data = await getAllFaqs();
          if (!cancelled) setFaqs(Array.isArray(data) ? data : []);
        } else {
          const data = await fetchSettingByTab(activeTab);
          if (!cancelled) setEditableContent(data?.content ?? '');
        }
      } catch (err) {
        if (!cancelled) showToast(err.message || 'Failed to load content.', 'error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [activeTab, showToast]);

  // ── Jodit config (memoised so editor doesn't re-mount) ───────────────────
  const joditConfig = useMemo(() => ({
    readonly: false,
    spellcheck: false,
    theme: 'light',
    toolbarButtonSize: 'large',
    minHeight: 300,
    buttons: [
      'undo', 'redo', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'link', '|',
      'align', '|',
      'cut', 'copy', 'paste', '|',
      'source',
    ],
  }), []);

  // ── save rich-text setting ───────────────────────────────────────────────
  const handleSaveSetting = async () => {
    setSaving(true);
    try {
      await saveSettingByTab(activeTab, editableContent);
      showToast('Saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── FAQ handlers ─────────────────────────────────────────────────────────
  const handleCreateFaq = async () => {
    if (!newTitle.trim() && !newContent.trim()) return;
    setAddingFaq(true);
    try {
      const created = await createFaq({ title: newTitle, content: newContent });
      setFaqs((prev) => [...prev, created]);
      setNewTitle('');
      setNewContent('');
      showToast('FAQ created!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to create FAQ.', 'error');
    } finally {
      setAddingFaq(false);
    }
  };

  const handleUpdateFaq = async (id, payload) => {
    try {
      const updated = await updateFaq(id, payload);
      setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
      showToast('FAQ updated!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update FAQ.', 'error');
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Delete this FAQ? This cannot be undone.')) return;
    try {
      await deleteFaq(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      showToast('FAQ deleted.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete FAQ.', 'error');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl min-h-screen text-black p-6 sm:p-8 font-inter">

      {/* ── Page header ── */}
      <div className="flex items-center mb-6">
        {onBackClick && (
          <button
            onClick={onBackClick}
            aria-label="Go back"
            className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors mr-3"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
      </div>

      {/* ── Tabs ── */}
      <div className="border-b border-gray-300">
        <div className="flex justify-start bg-gray-100 rounded-t-lg overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-shrink-0 px-5 py-4 text-sm sm:text-[15px] font-medium relative transition-colors
                ${activeTab === id ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              {label}
              {activeTab === id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] -mb-[1px] bg-[#FDD268] rounded-t" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab panel ── */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-b-lg -mt-px min-h-[400px]">

        {loading ? <Spinner /> : activeTab === 'faq' ? (

          /* ════════════════════════════════════════
             FAQ TAB
          ════════════════════════════════════════ */
          <div>
            {/* header */}
            <div className="mb-5">
              <h2 className="text-xl font-semibold">FAQ</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {faqs.length} item{faqs.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* list */}
            {faqs.length === 0 ? (
              <p className="text-center text-gray-400 italic py-10">
                No FAQs yet — add one below!
              </p>
            ) : (
              faqs.map((faq) => (
                <FaqRow
                  key={faq.id}
                  faq={faq}
                  onSave={handleUpdateFaq}
                  onDelete={handleDeleteFaq}
                />
              ))
            )}

            {/* ── Add new FAQ form ── */}
            <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-5 bg-white">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <PlusIcon className="h-4 w-4 text-[#FDD268]" />
                Add New FAQ
              </p>

              <input
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 mb-2
                           focus:outline-none focus:ring-2 focus:ring-[#FDD268]"
                placeholder="Question / Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 mb-4
                           min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-[#FDD268]"
                placeholder="Answer / Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />

              <button
                onClick={handleCreateFaq}
                disabled={addingFaq || (!newTitle.trim() && !newContent.trim())}
                className="w-full flex justify-center items-center gap-2 rounded-lg bg-[#FDD268]
                           hover:bg-yellow-300 text-black py-2.5 text-sm font-semibold
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingFaq ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-4 w-4" />
                    Create FAQ
                  </>
                )}
              </button>
            </div>
          </div>

        ) : (

          /* ════════════════════════════════════════
             RICH-TEXT TABS  (Privacy / Terms / About)
          ════════════════════════════════════════ */
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>
            </div>

            <div className="rounded-md mb-6">
              <JoditEditor
                ref={editorRef}
                value={editableContent}
                config={joditConfig}
                onChange={(val) => setEditableContent(val)}
              />
            </div>

            <button
              type="button"
              onClick={handleSaveSetting}
              disabled={saving}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-[#FDD268]
                         hover:bg-yellow-300 text-black py-2.5 font-semibold text-sm
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Saving…
                </>
              ) : (
                'Save & Change'
              )}
            </button>
          </>
        )}
      </div>

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SettingsPage;