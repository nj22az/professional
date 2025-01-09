import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrintableCV from './PrintableCV';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const printableRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printableRef.current) return;

    try {
      // Set up PDF options with compression
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
        orientation: 'portrait',
        compress: true
      });

      // Optimize canvas capture
      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions to maintain aspect ratio
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate scaling to fit the width while maintaining aspect ratio
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      
      // Center vertically if image is shorter than page
      const yPosition = Math.max(0, (pageHeight - imgHeight) / 2);

      // Add image with optimized settings
      pdf.addImage(imgData, 'JPEG', 0, yPosition, imgWidth, imgHeight, undefined, 'FAST');

      // Set PDF metadata for better optimization
      pdf.setProperties({
        title: 'CV - Nils Johansson',
        subject: 'Professional CV',
        creator: 'CV Website',
        author: 'Nils Johansson'
      });

      pdf.save('CV-Nils-Johansson.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={onClose}
          role="dialog"
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#f5f5f7] rounded-2xl shadow-xl max-w-5xl w-full"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Printable CV</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[13px] font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* CV Content */}
              <div className="p-6 bg-white print:p-0">
                <div ref={printableRef} className="print-content">
                  <PrintableCV />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal; 