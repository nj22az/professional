import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, FileText } from 'lucide-react';
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

const IconWrapper: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <div 
    className={`
      w-8 h-8 rounded-lg flex items-center justify-center
      ${color}
      shadow-[0_1px_2px_rgba(0,0,0,0.1)]
      @media (max-width: 600px) {
        w-7 h-7
      }
    `}
  >
    {children}
  </div>
);

const FloatingLabelInput: React.FC<{
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  description: string;
  isTextArea?: boolean;
  icon: JSX.Element;
}> = ({ id, name, type = "text", required = false, placeholder, description, isTextArea = false, icon }) => {
  const Component = isTextArea ? 'textarea' : 'input';
  return (
    <div className={`
      relative flex gap-3
      ${isTextArea ? 'items-start pt-[3px]' : 'items-center'}
    `}>
      {icon}
      <div className="flex-1 min-w-0">
        <Component
          id={id}
          name={name}
          type={type}
          required={required}
          rows={isTextArea ? 4 : undefined}
          className={`
            w-full px-3 py-2
            bg-[#f1f1f4] border border-gray-200/80
            rounded-xl
            shadow-[0_1px_2px_rgba(0,0,0,0.06)]
            transition-all duration-200 ease-in-out
            text-[17px] leading-5
            font-['SF Pro Text']
            placeholder-gray-600
            focus:ring-2 focus:ring-[#0071e3] focus:bg-white
            focus:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
            focus:border-transparent
            ${isTextArea ? 'resize-none min-h-[120px] py-3' : 'h-[38px]'}
            @media (max-width: 600px) {
              text-[16px]
              ${isTextArea ? 'min-h-[100px]' : 'h-[36px]'}
            }
          `}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

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
        to_email: 'nils.johansson@live.com' // Only used in notification email
      };

      // Send the notification email
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFICATION_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Notification result:', result);

      if (result.text === 'OK') {
        // Send the auto-reply email with minimal necessary information
        console.log('Sending auto-reply...');
        const autoReplyResult = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTOREPLY_TEMPLATE_ID,
          {
            to_name: formData.get('user_name'),    // The recipient's name
            subject: formData.get('subject'),      // Original subject for reference
            to_email: formData.get('user_email')   // The recipient's email
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
          className="fixed inset-0 bg-black/30 backdrop-blur-xl z-50 overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative bg-white/90 backdrop-blur-md 
                rounded-2xl overflow-hidden
                w-full max-w-[400px] mx-auto
                shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                @media (max-width: 600px) {
                  max-w-[95%]
                }
              "
            >
              {/* Modal Header */}
              <div className="
                flex justify-between items-center 
                px-4 py-3 
                border-b border-gray-200/60
                bg-white/60 backdrop-blur-md
              ">
                <button
                  onClick={onClose}
                  className="
                    rounded-full p-2 -ml-2
                    text-[#0071e3] 
                    hover:bg-[#0071e3]/10 
                    transition-colors
                  "
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="
                  absolute left-1/2 -translate-x-1/2 
                  text-[17px] font-semibold text-gray-900 
                  font-['SF Pro Text']
                ">
                  Contact Me
                </h2>
              </div>

              {/* Contact Form */}
              <form ref={form} onSubmit={handleSubmit} className="p-4 space-y-4 sm:p-5 sm:space-y-5">
                <div className="space-y-4 sm:space-y-5">
                  <FloatingLabelInput
                    id="user_name"
                    name="user_name"
                    required
                    placeholder="Name"
                    description="Name"
                    icon={
                      <IconWrapper color="bg-[#007AFF]/10">
                        <User className="w-4 h-4 text-[#007AFF]" />
                      </IconWrapper>
                    }
                  />
                  <FloatingLabelInput
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    placeholder="Email"
                    description="Email"
                    icon={
                      <IconWrapper color="bg-[#34C759]/10">
                        <Mail className="w-4 h-4 text-[#34C759]" />
                      </IconWrapper>
                    }
                  />
                  <FloatingLabelInput
                    id="subject"
                    name="subject"
                    required
                    placeholder="Subject"
                    description="Subject"
                    icon={
                      <IconWrapper color="bg-[#AF52DE]/10">
                        <FileText className="w-4 h-4 text-[#AF52DE]" />
                      </IconWrapper>
                    }
                  />
                  <FloatingLabelInput
                    id="message"
                    name="message"
                    required
                    placeholder="Message"
                    description="Message"
                    isTextArea
                    icon={
                      <IconWrapper color="bg-[#FF9500]/10">
                        <MessageSquare className="w-4 h-4 text-[#FF9500]" />
                      </IconWrapper>
                    }
                  />
                </div>

                {errorMessage && (
                  <div className="
                    text-[13px] text-[#FF3B30] 
                    bg-[#FF3B30]/5 backdrop-blur-[2px] 
                    p-3 rounded-xl font-['SF Pro Text']
                  ">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-auto ml-auto flex items-center justify-center gap-2 
                    px-4 py-2
                    rounded-full
                    text-[15px] font-semibold font-['SF Pro Text']
                    transition-all transform active:scale-[0.98]
                    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                    disabled:opacity-50
                    ${submitStatus === 'success'
                      ? 'bg-[#34C759] text-white'
                      : submitStatus === 'error'
                      ? 'bg-[#FF3B30] text-white'
                      : 'bg-[#007AFF] text-white hover:bg-[#0077ED]'
                    }
                    @media (max-width: 600px) {
                      text-[14px]
                      py-1.5
                    }
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    'Sent!'
                  ) : submitStatus === 'error' ? (
                    'Try Again'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
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