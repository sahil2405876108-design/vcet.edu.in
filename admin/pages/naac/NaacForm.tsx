import React, { useEffect, useState } from 'react';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

/* ── UI Components ─────────────────────────────────────────────────────────── */
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

/* ── Sub-Managers ── */

const PDFListManager: React.FC<{ items: any[]; onChange: (val: any[]) => void }> = ({ items, onChange }) => {
  const add = () => onChange([...(items || []), { title: '', fileUrl: '', fileName: '' }]);
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      {(items || []).map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl relative transition-all hover:border-slate-200">
          <div className="flex-grow space-y-4">
            <div>
              <label className={labelBase}>Document Title</label>
              <input value={item.title} onChange={e => upd(idx, { title: e.target.value })} className={inputBase} placeholder="e.g. Activity Report" />
            </div>
            <div>
              <label className={labelBase}>PDF File Link</label>
              <input value={item.fileUrl} onChange={e => upd(idx, { fileUrl: e.target.value })} className={inputBase} placeholder="URL to PDF" />
            </div>
          </div>
          <button onClick={() => del(idx)} className="self-center p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add Document
      </button>
    </div>
  );
};

const AdvancedTableManager: React.FC<{ items: any[]; fields: { key: string; label: string; placeholder: string; isTextarea?: boolean }[]; onChange: (val: any[]) => void }> = ({ items, fields, onChange }) => {
  const add = () => { const empty: any = {}; fields.forEach(f => empty[f.key] = ''); onChange([...(items || []), empty]); };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      {(items || []).map((item, idx) => (
         <div key={idx} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl relative transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 flex-grow">
               {fields.map(f => (
                  <div key={f.key} className={f.isTextarea ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}>
                    <label className={labelBase}>{f.label}</label>
                    {f.isTextarea ? (
                      <textarea value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs h-24 resize-none`} placeholder={f.placeholder} />
                    ) : (
                      <input value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs`} placeholder={f.placeholder} />
                    )}
                  </div>
               ))}
            </div>
            <button onClick={() => del(idx)} className="p-2 h-max bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
      ))}
      <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add Row
      </button>
    </div>
  );
};

/* ── Main Form ── */
interface NaacFormProps {
  slug: string;
  onBack: () => void;
}

const NaacForm: React.FC<NaacFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<any>({ name: slug.replace(/-/g, ' ').toUpperCase() });
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Simulate fetching
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [slug]);

  const handleSubmit = async () => {
    setSaving(true);
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      setToast({ message: 'Saved successfully', type: 'success' });
    }, 800);
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const renderContent = () => {
    switch (slug) {
      case 'sss':
        return (
          <div className="space-y-8">
            <SectionCard title="1. SSS Overview" icon="📊">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelBase}>Section Name (Max 50 chars)</label>
                  <input maxLength={50} value={payload.sectionName} onChange={e => setPayload({...payload, sectionName: e.target.value})} className={inputBase} placeholder="e.g. Student Satisfaction Survey (SSS)" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Purpose of Survey (Max 150 chars)</label>
                  <textarea maxLength={150} value={payload.purpose} onChange={e => setPayload({...payload, purpose: e.target.value})} className={`${inputBase} h-24 resize-none`} placeholder="Describe the purpose..." />
                </div>
                <div>
                  <label className={labelBase}>Target Audience (Max 50 chars)</label>
                  <input maxLength={50} value={payload.audience} onChange={e => setPayload({...payload, audience: e.target.value})} className={inputBase} placeholder="e.g. All Students" />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="2. Survey Platform & Link" icon="🔗">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Platform Type</label>
                  <input maxLength={50} value={payload.platformType} onChange={e => setPayload({...payload, platformType: e.target.value})} className={inputBase} placeholder="e.g. Google Form" />
                </div>
                <div>
                  <label className={labelBase}>Form Title</label>
                  <input maxLength={100} value={payload.formTitle} onChange={e => setPayload({...payload, formTitle: e.target.value})} className={inputBase} placeholder="Form title..." />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Survey Link URL</label>
                  <input maxLength={150} value={payload.link} onChange={e => setPayload({...payload, link: e.target.value})} className={inputBase} placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Description</label>
                  <textarea maxLength={150} value={payload.formDesc} onChange={e => setPayload({...payload, formDesc: e.target.value})} className={`${inputBase} h-24 resize-none`} placeholder="Short description..." />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="4. Participation & Data Handling" icon="🛡️">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Eligible Participants</label>
                  <input maxLength={100} value={payload.participants} onChange={e => setPayload({...payload, participants: e.target.value})} className={inputBase} placeholder="..." />
                </div>
                <div>
                  <label className={labelBase}>Participation Requirement</label>
                  <input maxLength={50} value={payload.requirement} onChange={e => setPayload({...payload, requirement: e.target.value})} className={inputBase} placeholder="Mandatory / Optional" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Data Collection Purpose & Confidentiality</label>
                  <textarea maxLength={300} value={payload.dataHandling} onChange={e => setPayload({...payload, dataHandling: e.target.value})} className={`${inputBase} h-24 resize-none`} placeholder="State confidentiality..." />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="6. SSS Details (PDF)" icon="📄">
              <PDFListManager items={payload.sssPdfs || []} onChange={val => setPayload({...payload, sssPdfs: val})} />
            </SectionCard>
          </div>
        );

      case 'sss-report':
        return (
          <div className="space-y-8">
            <SectionCard title="SSS Report Overview" icon="📑">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Section Name</label>
                  <input maxLength={50} value={payload.sectionName} onChange={e => setPayload({...payload, sectionName: e.target.value})} className={inputBase} />
                </div>
                <div>
                  <label className={labelBase}>Description</label>
                  <input maxLength={120} value={payload.desc} onChange={e => setPayload({...payload, desc: e.target.value})} className={inputBase} />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Year-wise SSS Reports" icon="🗓️">
              <AdvancedTableManager items={payload.reports} fields={[
                {key: 'year', label: 'Academic Year', placeholder: 'e.g. 2018-19'},
                {key: 'desc', label: 'Short Description', placeholder: 'Optional description...'},
                {key: 'url', label: 'PDF URL', placeholder: 'https://...'}
              ]} onChange={val => setPayload({...payload, reports: val})} />
            </SectionCard>
            <SectionCard title="SSS Reports Collection (Cumulative)" icon="📚">
              <PDFListManager items={payload.collectionPdfs || []} onChange={val => setPayload({...payload, collectionPdfs: val})} />
            </SectionCard>
          </div>
        );

      case 'ssr-cycle-1':
      case 'ssr-cycle-2':
        return (
          <div className="space-y-8">
            <SectionCard title="SSR Overview" icon="🏆">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Section Name</label>
                  <input maxLength={100} value={payload.sectionName} onChange={e => setPayload({...payload, sectionName: e.target.value})} className={inputBase} />
                </div>
                <div>
                  <label className={labelBase}>Cycle Type</label>
                  <input maxLength={20} value={payload.cycle} onChange={e => setPayload({...payload, cycle: e.target.value})} className={inputBase} placeholder="Cycle 1 / Cycle 2" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Description</label>
                  <textarea maxLength={150} value={payload.desc} onChange={e => setPayload({...payload, desc: e.target.value})} className={`${inputBase} h-24 resize-none`} />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Extended Profile" icon="📊">
              <AdvancedTableManager items={payload.extendedProfile} fields={[
                {key: 'category', label: 'Category', placeholder: 'Students/Teachers/Institution'},
                {key: 'metricId', label: 'Metric ID', placeholder: 'e.g. 1.1'},
                {key: 'desc', label: 'Description', placeholder: 'Metric description...'},
                {key: 'link', label: 'Resource Link', placeholder: 'https://...'}
              ]} onChange={val => setPayload({...payload, extendedProfile: val})} />
            </SectionCard>
            <SectionCard title="QIF (Quantitative Indicator)" icon="📈">
              <AdvancedTableManager items={payload.qif} fields={[
                {key: 'criteriaName', label: 'Criteria Name', placeholder: '...'},
                {key: 'code', label: 'Sub-Criteria Code', placeholder: '...'},
                {key: 'desc', label: 'Description', placeholder: '...'},
                {key: 'link', label: 'Resource Link', placeholder: 'https://...'}
              ]} onChange={val => setPayload({...payload, qif: val})} />
            </SectionCard>
            <SectionCard title="DVV Clarifications" icon="⚖️">
              <AdvancedTableManager items={payload.dvv} fields={[
                {key: 'categoryOrCriteria', label: 'Category / Criteria', placeholder: '...'},
                {key: 'metricOrCode', label: 'Metric ID / Code', placeholder: '...'},
                {key: 'link', label: 'Updated Link', placeholder: 'https://...'}
              ]} onChange={val => setPayload({...payload, dvv: val})} />
            </SectionCard>
            <SectionCard title="SSR Documents & Media" icon="📁">
              <PDFListManager items={payload.docs || []} onChange={val => setPayload({...payload, docs: val})} />
            </SectionCard>
          </div>
        );

      case 'best-practices':
        return (
          <div className="space-y-8">
            <SectionCard title="Overview" icon="🌟">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelBase}>Section Name</label>
                  <input maxLength={100} value={payload.sectionName} onChange={e => setPayload({...payload, sectionName: e.target.value})} className={inputBase} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelBase}>Description</label>
                  <textarea maxLength={150} value={payload.desc} onChange={e => setPayload({...payload, desc: e.target.value})} className={`${inputBase} h-24 resize-none`} />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Best Practices List" icon="🏆">
              <AdvancedTableManager items={payload.practices} fields={[
                {key: 'title', label: 'Title of Practice', placeholder: 'Max 100 chars...'},
                {key: 'objective', label: 'Objective', placeholder: 'Max 120 chars...'},
                {key: 'desc', label: 'Description', placeholder: 'Max 150 chars...', isTextarea: true},
                {key: 'outcome', label: 'Outcome / Impact', placeholder: 'Max 120 chars...'},
                {key: 'pdfLink', label: 'Linked Document URL', placeholder: 'https://...'}
              ]} onChange={val => setPayload({...payload, practices: val})} />
            </SectionCard>
            <SectionCard title="Institutional Distinctiveness" icon="✨">
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="md:col-span-2"><label className={labelBase}>Title</label><input maxLength={100} value={payload.distinct_title} onChange={e => setPayload({...payload, distinct_title: e.target.value})} className={inputBase} /></div>
                 <div className="md:col-span-2"><label className={labelBase}>Description</label><textarea maxLength={150} value={payload.distinct_desc} onChange={e => setPayload({...payload, distinct_desc: e.target.value})} className={`${inputBase} h-24 resize-none`} /></div>
                 <div><label className={labelBase}>Key Features</label><textarea maxLength={120} value={payload.distinct_features} onChange={e => setPayload({...payload, distinct_features: e.target.value})} className={`${inputBase} h-24 resize-none`} /></div>
                 <div><label className={labelBase}>Impact / Outcome</label><textarea maxLength={120} value={payload.distinct_impact} onChange={e => setPayload({...payload, distinct_impact: e.target.value})} className={`${inputBase} h-24 resize-none`} /></div>
                 <div className="md:col-span-2"><label className={labelBase}>Resource Link / PDF</label><input maxLength={150} value={payload.distinct_link} onChange={e => setPayload({...payload, distinct_link: e.target.value})} className={inputBase} /></div>
               </div>
            </SectionCard>
          </div>
        );

      case 'naac-score':
        return (
          <div className="space-y-8">
            <SectionCard title="NAAC Accreditation Score" icon="💯">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2"><label className={labelBase}>Section Title</label><input maxLength={100} value={payload.title} onChange={e => setPayload({...payload, title: e.target.value})} className={inputBase} /></div>
                <div className="md:col-span-2"><label className={labelBase}>Accreditation Summary</label><textarea maxLength={150} value={payload.summary} onChange={e => setPayload({...payload, summary: e.target.value})} className={`${inputBase} h-24 resize-none`} /></div>
                <div><label className={labelBase}>Accreditation Status</label><input maxLength={30} value={payload.status} onChange={e => setPayload({...payload, status: e.target.value})} className={inputBase} /></div>
                <div><label className={labelBase}>Grade Awarded</label><input maxLength={20} value={payload.grade} onChange={e => setPayload({...payload, grade: e.target.value})} className={inputBase} placeholder="e.g. A+" /></div>
                <div><label className={labelBase}>CGPA Score</label><input maxLength={10} value={payload.cgpa} onChange={e => setPayload({...payload, cgpa: e.target.value})} className={inputBase} placeholder="e.g. 3.42" /></div>
                <div><label className={labelBase}>Accreditation Cycle</label><input maxLength={20} value={payload.cycle} onChange={e => setPayload({...payload, cycle: e.target.value})} className={inputBase} /></div>
                <div><label className={labelBase}>Validity Period</label><input maxLength={50} value={payload.validity} onChange={e => setPayload({...payload, validity: e.target.value})} className={inputBase} placeholder="e.g. Valid up to 2028" /></div>
              </div>
            </SectionCard>
            <SectionCard title="Official Certificates & Verification" icon="🏛️">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="md:col-span-2"><label className={labelBase}>Certificate Link URL</label><input maxLength={150} value={payload.certLink} onChange={e => setPayload({...payload, certLink: e.target.value})} className={inputBase} /></div>
                 <div><label className={labelBase}>Issuing Authority</label><input maxLength={50} value={payload.authority} onChange={e => setPayload({...payload, authority: e.target.value})} className={inputBase} placeholder="e.g. Executive Committee" /></div>
                 <div><label className={labelBase}>Certificate Issue Date</label><input maxLength={20} value={payload.issueDate} onChange={e => setPayload({...payload, issueDate: e.target.value})} className={inputBase} placeholder="e.g. Oct 12, 2023" /></div>
              </div>
            </SectionCard>
          </div>
        );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">{data?.name}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">NAAC EDITOR</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
         {renderContent()}
      </div>
    </div>
  );
};

export default NaacForm;
