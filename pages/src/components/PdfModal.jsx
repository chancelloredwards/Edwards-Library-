﻿/* eslint-disable no-unused-vars */
// src/components/PdfModal.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?worker&url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfModal({ paper, onClose }) {
    useEffect(() => {
        const h = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose]);

    if (!paper) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-11/12 h-5/6 p-4 overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold mr-4 flex-1 line-clamp-1">{paper.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
                    </div>
                    <Document file={paper.pdfUrl} className="flex flex-col items-center gap-8">
                        <Page pageNumber={1} width={800} />
                    </Document>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}


