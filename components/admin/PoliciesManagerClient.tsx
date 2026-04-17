'use client';

import { useState, useTransition } from 'react';
import {
  createPolicy,
  updatePolicy,
  deletePolicy,
  reorderPolicies,
} from '@/lib/actions/policies-actions';
import {
  Pencil, Trash2, Plus, Save, X, ArrowUp, ArrowDown, Star,
} from 'lucide-react';

interface PolicyItem {
  id: string;
  title: string;
  type: string;
  code: string;
  category: string;
  description: string;
  url: string;
  featured: boolean;
  sortOrder: number;
}

const TYPE_OPTIONS = [
  'Directive & Procedure',
  'Policy',
  'Standard Operating Procedures',
];

const CATEGORY_OPTIONS = [
  { value: 'security', label: 'Security & Risk' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'governance', label: 'Data Governance' },
  { value: 'personnel', label: 'Personnel' },
];

const TYPE_BADGE_COLOR: Record<string, string> = {
  'Directive & Procedure': 'bg-blue-100 text-blue-800',
  'Policy': 'bg-green-100 text-green-800',
  'Standard Operating Procedures': 'bg-amber-100 text-amber-800',
};

const CATEGORY_LABEL: Record<string, string> = {
  security: 'Security & Risk',
  infrastructure: 'Infrastructure',
  governance: 'Data Governance',
  personnel: 'Personnel',
};

const emptyForm = {
  title: '',
  type: 'Directive & Procedure',
  code: '',
  category: 'infrastructure',
  description: '',
  url: '',
  featured: false,
};

export default function PoliciesManagerClient({
  policies: initialPolicies,
}: {
  policies: PolicyItem[];
}) {
  const [editingPolicy, setEditingPolicy] = useState<string | null>(null);
  const [addingPolicy, setAddingPolicy] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [policyForm, setPolicyForm] = useState(emptyForm);

  // ── Operations ──────────────────────────────────────

  function startEdit(p: PolicyItem) {
    setEditingPolicy(p.id);
    setPolicyForm({
      title: p.title,
      type: p.type,
      code: p.code,
      category: p.category,
      description: p.description,
      url: p.url,
      featured: p.featured,
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createPolicy(policyForm);
      setAddingPolicy(false);
      setPolicyForm(emptyForm);
    });
  }

  function handleSave(id: string) {
    startTransition(async () => {
      await updatePolicy(id, policyForm);
      setEditingPolicy(null);
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this policy?')) return;
    startTransition(async () => {
      await deletePolicy(id);
    });
  }

  function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= initialPolicies.length) return;

    const reordered = [...initialPolicies];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];

    startTransition(async () => {
      await reorderPolicies(reordered.map(p => p.id));
    });
  }

  // ── Form ────────────────────────────────────────────

  function renderForm(onSubmit: () => void, onCancel: () => void, submitLabel: string) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
            <input
              value={policyForm.title}
              onChange={e => setPolicyForm({ ...policyForm, title: e.target.value })}
              placeholder="e.g. Acceptable Use of Communication Technology"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Code</label>
            <input
              value={policyForm.code}
              onChange={e => setPolicyForm({ ...policyForm, code: e.target.value })}
              placeholder="e.g. A1429D"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Type</label>
            <select
              value={policyForm.type}
              onChange={e => setPolicyForm({ ...policyForm, type: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            >
              {TYPE_OPTIONS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Category</label>
            <select
              value={policyForm.category}
              onChange={e => setPolicyForm({ ...policyForm, category: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            >
              {CATEGORY_OPTIONS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 font-sans text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={policyForm.featured}
                onChange={e => setPolicyForm({ ...policyForm, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              Featured
            </label>
          </div>
        </div>
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
          <textarea
            value={policyForm.description}
            onChange={e => setPolicyForm({ ...policyForm, description: e.target.value })}
            placeholder="Brief description of the policy..."
            rows={2}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans resize-none"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">URL</label>
          <input
            value={policyForm.url}
            onChange={e => setPolicyForm({ ...policyForm, url: e.target.value })}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
          />
        </div>
        {policyForm.featured && (
          <p className="text-xs text-amber-600 font-sans">
            Only one policy can be featured at a time. Setting this will un-feature any other policy.
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            disabled={isPending || !policyForm.title || !policyForm.code || !policyForm.url}
            className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
          >
            {submitLabel === 'Save' ? <Save className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {submitLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Policies ({initialPolicies.length})
        </h2>
        <button
          onClick={() => {
            setAddingPolicy(true);
            setPolicyForm(emptyForm);
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Policy
        </button>
      </div>

      <div className="space-y-3">
        {initialPolicies.map((p, index) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg">
            {editingPolicy === p.id ? (
              <div className="p-4">
                {renderForm(
                  () => handleSave(p.id),
                  () => setEditingPolicy(null),
                  'Save'
                )}
              </div>
            ) : (
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {p.featured && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                    )}
                    <span className="font-sans font-semibold text-gray-900">{p.title}</span>
                    <span className="font-sans text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {p.code}
                    </span>
                    <span className={`font-sans text-[10px] font-bold uppercase px-2 py-0.5 rounded ${TYPE_BADGE_COLOR[p.type] || 'bg-gray-100 text-gray-600'}`}>
                      {p.type}
                    </span>
                    <span className="font-sans text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                      {CATEGORY_LABEL[p.category] || p.category}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-500 line-clamp-1">{p.description}</p>
                  <p className="font-sans text-xs text-gray-400 mt-1 truncate">{p.url}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={isPending || index === 0}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={isPending || index === initialPolicies.length - 1}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startEdit(p)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add policy form */}
        {addingPolicy && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4">
            {renderForm(
              handleCreate,
              () => setAddingPolicy(false),
              'Create Policy'
            )}
          </div>
        )}

        {initialPolicies.length === 0 && !addingPolicy && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 font-sans text-sm">
            No policies yet. Click &quot;Add Policy&quot; to create your first one.
          </div>
        )}
      </div>
    </div>
  );
}
