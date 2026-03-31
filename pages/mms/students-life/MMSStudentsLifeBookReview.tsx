import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeBookReview() {
  const [data, setData] = useState<MMSStudentsLifeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: MMSStudentsLifeData }>('/pages/mms-students-life');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch students life data:', err);
      }
    };
    fetchData();
  }, []);

  const defaultImages = [
    { id: 'def-1', label: "Book Review Session 01", src: "/images/Departments/MMS(MBA)/Students life/mms-studentlife-bookreview-1.jpg" },
    { id: 'def-2', label: "Book Review Session 02", src: undefined },
  ];

  const backendImages = (data?.bookReview?.images || []).map((img, i) => ({
    id: `dyn-${i}`,
    label: img.label || `Book Review Session ${String(defaultImages.length + i + 1).padStart(2, '0')}`,
    src: resolveApiUrl(img.image),
  })).filter(img => img.src);

  // Use backend images to overwrite undefined placeholders, or just append them if enough images exist
  const allImages = backendImages.length > 0 
    ? [...defaultImages.filter(di => di.src !== undefined), ...backendImages] 
    : defaultImages;

  return (
    <MMSLayout title="Book Review">
      <StudentsLifeSectionCard title="Book Review" subtitle="Critical reading and reflective learning for future business leaders">
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.bookReview?.description || `Book review activities are invaluable for developing critical thinking and analytical skills. They encourage
          students to engage deeply with business literature, enhancing their understanding of key concepts and
          theories. By articulating their insights and critiques, students improve their communication skills. This
          activity also fosters a habit of continuous learning, essential for future business leaders. Our students at
          the department have successfully reviewed and presented their learning on selected books.`}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {allImages.map(({ id, label, src }) => (
             <StudentsLifeImageHolder key={id} label={label} size="large" src={src} />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
