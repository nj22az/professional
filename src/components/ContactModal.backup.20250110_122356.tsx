import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'nils.johansson@live.com';
const EMAILJS_NOTIFICATION_TEMPLATE_ID = 'template_8gm8c5a';
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_xxpcqid';
const EMAILJS_PUBLIC_KEY = 'fLlukK5veEI51Zr_U';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      console.log('Sending notification email...');
      
      // Prepare form data
      const formData = new FormData(form.current);
      const templateParams = {
        from_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      // Send the notification email
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFICATION_TEMPLATE_ID,
        {
          from_name: formData.get('user_name'),
          user_email: formData.get('user_email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          to_email: 'nils.johansson@live.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Notification result:', result);

      if (result.text === 'OK') {
        // Send the auto-reply email
        console.log('Sending auto-reply...');
        const autoReplyResult = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTOREPLY_TEMPLATE_ID,
          {
            from_name: formData.get('user_name'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: formData.get('user_email')
          },
          EMAILJS_PUBLIC_KEY
        );

        console.log('Auto-reply result:', autoReplyResult);
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        if (form.current) form.current.reset();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send email');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#f5f5f7] rounded-2xl shadow-xl max-w-lg w-full"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Contact Me</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Form */}
              <form ref={form} onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errorMessage && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                    submitStatus === 'success'
                      ? 'bg-green-500'
                      : submitStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitStatus === 'success' ? (
                    'Message Sent!'
                  ) : submitStatus === 'error' ? (
                    'Error Sending'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal; 