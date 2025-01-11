import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Building2, 
  Calendar,
  MapPin,
  ClipboardList
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useCareer } from '../contexts/CareerContext';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  const printableRef = useRef<HTMLDivElement>(null);
  const { experiences } = useCareer();

  const handleDownloadPDF = async () => {
    if (!printableRef.current) return;

    try {
      const canvas = await html2canvas(printableRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Experience-Timeline-Nils-Johansson.pdf');
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
                <h2 className="text-lg font-semibold text-gray-900">Professional Experience Timeline</h2>
                <div className="flex items-center gap-4">
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

              {/* Timeline Content */}
              <div ref={printableRef} className="p-8 bg-white">
                <div className="max-w-4xl mx-auto space-y-12">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative pl-8 border-l-2 border-blue-100 pb-8 last:pb-0"
                    >
                      {/* Time Period */}
                      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-blue-100 rounded-full border-2 border-blue-500" />
                      <div className="flex items-center gap-2 text-[14px] text-blue-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        {exp.periods[0].value}
                      </div>

                      {/* Role & Company */}
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-[15px] text-gray-600 mt-1">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-500 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </div>
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <p className="text-[15px] text-gray-600 mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {/* Responsibilities */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-[14px] font-medium text-gray-700 mb-2">
                            <ClipboardList className="w-4 h-4" />
                            Key Responsibilities
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-[13px] text-gray-600"
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                {resp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineModal; 