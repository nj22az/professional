import React, { useState } from 'react';
import { useCareer } from '../contexts/CareerContext';
import { 
  MapPin, 
  Mail, 
  Globe, 
  Ship, 
  Building, 
  Wrench, 
  Car, 
  Code, 
  Cpu, 
  Database,
  Settings,
  Users,
  Shield,
  FileText,
  MessageSquare,
  Laptop,
  Gauge,
  Brain,
  Network,
  Linkedin,
  BarChart,
  ChevronDown,
  ChevronUp,
  Target,
  Briefcase,
  HeartHandshake,
  ClipboardList,
  GanttChart,
  Globe2,
  Plane,
  Calculator,
  Anchor,
  Crown,
  Factory,
  Package,
  GraduationCap,
  Binary,
  Download,
  Clock
} from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import CVModal from './CVModal';
import CoverLetterModal from './CoverLetterModal';

// Category mapping for skills and responsibilities
const skillCategories = {
  professional: {
    'Engineering & Systems': ['Marine Engineering (Electrical, Mechanical)', 'Gas Turbine Systems', 'System Maintenance', 'System Integration'],
    'Software & Programming': ['Technical Systems Development (PLC, Python, Web)', 'Software Configuration', 'HMI Development', 'Bluehill Suite', 'Siemens TIA Portal', 'Astea', 'Amos', 'Concur'],
    'Testing & Quality': ['Testing & Calibration', 'Quality Control', 'Equipment Assessment', 'Technical Documentation'],
    'Project Management': ['Project Management', 'Resource Planning', 'Process Optimization', 'Team Leadership'],
    'Communication': ['Global Communication', 'Client Relations', 'Technical Documentation', 'Team Coordination']
  }
};

const categoryIcons: Record<string, JSX.Element> = {
  'Engineering': <Wrench />,
  'Programming': <Code />,
  'Testing': <Gauge />,
  'Data': <BarChart />,
  'Safety': <Shield />,
  'Management': <Briefcase />,
  'Communication': <MessageSquare />,
  'Software': <Laptop />,
  'Technical': <Settings />,
  'Leadership': <Users />
};

const getJobIcon = (company: string, title: string) => {
  if (['Stena RoRo', 'Stena Baltic A/S', 'Destination Gotland', 'Finnlines', 'Teekay', 'Noble Caledonia', 'Sirius Ship Management S.r.l.', 'Terntank Rederi AS'].includes(company)) {
    return <Ship className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Instron') {
    return <Car className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'AH Automation') {
    return <Binary className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Siemens Energy') {
    return <Plane className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'DEKRA Industrial') {
    return <Calculator className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Trafikverket') {
    return <Anchor className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Persson Innovation AB') {
    return <Crown className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Örebro Kommun') {
    return <Factory className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Various Companies' && title === 'Warehouse Worker') {
    return <Package className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Various Schools') {
    return <GraduationCap className="w-5 h-5 text-blue-500" />;
  }
  if (company === 'Royal Swedish Navy') {
    return <Shield className="w-5 h-5 text-blue-500" />;
  }
  return <Wrench className="w-5 h-5 text-blue-500" />;
};

const getSkillIcon = (category: string) => {
  switch (category) {
    case 'Engineering & Systems':
      return <Settings className="w-4 h-4 text-blue-500" />;
    case 'Software & Programming':
      return <Code className="w-4 h-4 text-blue-500" />;
    case 'Testing & Quality':
      return <Target className="w-4 h-4 text-blue-500" />;
    case 'Project Management':
      return <GanttChart className="w-4 h-4 text-blue-500" />;
    case 'Communication':
      return <MessageSquare className="w-4 h-4 text-blue-500" />;
    default:
      return <Wrench className="w-4 h-4 text-blue-500" />;
  }
};

const getResponsibilityIcon = (responsibility: string) => {
  const icons: Record<string, JSX.Element> = {
    // Engineering & Systems
    'Testing Systems Installation': <Wrench className="w-3 h-3" />,
    'System Installation': <Wrench className="w-3 h-3" />,
    'System Integration': <Network className="w-3 h-3" />,
    'System Maintenance': <Wrench className="w-3 h-3" />,
    'System Repairs': <Wrench className="w-3 h-3" />,
    'System Operations': <Settings className="w-3 h-3" />,
    'System Optimization': <Settings className="w-3 h-3" />,
    'Equipment Repair': <Wrench className="w-3 h-3" />,
    'Equipment Repairs': <Wrench className="w-3 h-3" />,
    'Equipment Handling': <Wrench className="w-3 h-3" />,
    'Equipment Assessment': <Gauge className="w-3 h-3" />,
    'Equipment Overhaul': <Wrench className="w-3 h-3" />,
    'Equipment Maintenance': <Wrench className="w-3 h-3" />,
    'Equipment Calibration': <Gauge className="w-3 h-3" />,
    'Engine Operations': <Settings className="w-3 h-3" />,
    'Engine Systems': <Settings className="w-3 h-3" />,
    'Machinery Operations': <Settings className="w-3 h-3" />,
    'Gas Turbine Systems': <Settings className="w-3 h-3" />,
    'Dynamic Positioning': <Target className="w-3 h-3" />,
    'Emergency Systems': <Shield className="w-3 h-3" />,
    'Automation Systems': <Cpu className="w-3 h-3" />,
    'Automation Design': <Binary className="w-3 h-3" />,
    'Technical Operations': <Settings className="w-3 h-3" />,

    // Software & Programming
    'IQOQ & Calibration': <Gauge className="w-3 h-3" />,
    'Bluehill Software': <Code className="w-3 h-3" />,
    'Software Configuration': <Code className="w-3 h-3" />,
    'PLC Programming': <Cpu className="w-3 h-3" />,
    'HMI Development': <Settings className="w-3 h-3" />,

    // Management & Leadership
    'Project Management': <Briefcase className="w-3 h-3" />,
    'Team Leadership': <Users className="w-3 h-3" />,
    'Technical Leadership': <Users className="w-3 h-3" />,
    'Team Supervision': <Users className="w-3 h-3" />,
    'Team Coordination': <Users className="w-3 h-3" />,
    'Resource Planning': <GanttChart className="w-3 h-3" />,
    'Process Optimization': <Settings className="w-3 h-3" />,
    'Maintenance Planning': <GanttChart className="w-3 h-3" />,
    'Technical Planning': <GanttChart className="w-3 h-3" />,
    'Logistics Operations': <GanttChart className="w-3 h-3" />,
    'Inventory Management': <Database className="w-3 h-3" />,
    'International Operations': <Globe2 className="w-3 h-3" />,

    // Quality & Safety
    'Quality Control': <Target className="w-3 h-3" />,
    'Quality Assurance': <Target className="w-3 h-3" />,
    'Quality Standards': <Target className="w-3 h-3" />,
    'Safety Protocols': <Shield className="w-3 h-3" />,
    'Safety Compliance': <Shield className="w-3 h-3" />,
    'Safety Standards': <Shield className="w-3 h-3" />,
    'Emergency Response': <Shield className="w-3 h-3" />,
    'Industrial Inspections': <Target className="w-3 h-3" />,
    'Regulatory Standards': <ClipboardList className="w-3 h-3" />,

    // Documentation & Analysis
    'Technical Documentation': <FileText className="w-3 h-3" />,
    'Documentation': <FileText className="w-3 h-3" />,
    'Data Analysis': <BarChart className="w-3 h-3" />,
    'Technical Training': <Users className="w-3 h-3" />,
    'Client Training': <Users className="w-3 h-3" />,
    'Technical Support': <HeartHandshake className="w-3 h-3" />,
    'Client Relations': <HeartHandshake className="w-3 h-3" />,

    // Maritime & Military
    'Military Operations': <Shield className="w-3 h-3" />,
    'Military Training': <Shield className="w-3 h-3" />,
    'Maritime Operations': <Ship className="w-3 h-3" />,
    'Cargo Systems': <Ship className="w-3 h-3" />,
    'Preventive Maintenance': <Wrench className="w-3 h-3" />,
    'Basic Maintenance': <Wrench className="w-3 h-3" />,
    'Practical Training': <Users className="w-3 h-3" />
  };
  return icons[responsibility] || null;
};

interface UnifiedSkillSummaryProps {
  experiences: Array<{
    responsibilities?: string[];
    title: string;
    company: string;
  }>;
  skills: {
    technical: string[];
    operational: string[];
  };
  certifications: string[];
}

const UnifiedSkillSummary: React.FC<UnifiedSkillSummaryProps> = ({ experiences, skills, certifications }) => {
  const allKeywords = [
    ...skills.technical,
    ...skills.operational,
    ...experiences.flatMap(exp => exp.responsibilities || [])
  ];

  // Count maritime experience duration (approximately)
  const maritimeExperience = experiences.filter(exp => 
    ['Stena RoRo', 'Stena Baltic A/S', 'Destination Gotland', 'Finnlines', 'Teekay', 
     'Noble Caledonia', 'Sirius Ship Management S.r.l.', 'Terntank Rederi AS', 'Trafikverket']
    .includes(exp.company)
  ).length;

  const categoryMapping = {
    'Testing': {
      keywords: [
        'Testing Systems', 'Calibration', 'IQOQ', 'Quality Control', 'Validation',
        'Equipment Assessment', 'Testing Methods', 'Bluehill Software',
        'Load Cell', 'Precision', 'Field Service', 'Installation'
      ],
      weight: 3
    },
    'Systems': {
      keywords: [
        'Marine Engineering', 'Gas Turbine', 'Engine Operations', 'Technical Systems',
        'Mechanical Systems', 'Electrical Systems', 'Equipment', 'Installation',
        'Commissioning', 'System Integration', 'Technical Operations'
      ],
      weight: 2.5
    },
    'Automation': {
      keywords: [
        'PLC Programming', 'Automation', 'HMI Development', 'Control Systems',
        'Software Configuration', 'Programming', 'System Integration',
        'Process Control', 'Technical Design'
      ],
      weight: 2
    },
    'Service': {
      keywords: [
        'Field Service', 'Client Training', 'Technical Support', 'Installation',
        'Commissioning', 'Maintenance', 'Equipment Optimization', 'Global Support',
        'Client Relations', 'Technical Documentation'
      ],
      weight: 2.5
    },
    'Quality': {
      keywords: [
        'Quality Assurance', 'Safety Standards', 'Risk Management', 'Compliance',
        'Regulatory Standards', 'Documentation', 'Validation', 'Emergency Systems',
        'Safety Protocols', 'Maritime Safety'
      ],
      weight: 2
    }
  };

  const getCategoryScore = (category: string, keywords: string[], baseWeight: number) => {
    // Count keyword matches with context
    const keywordMatches = allKeywords.filter(keyword => 
      keywords.some(cat => keyword.toLowerCase().includes(cat.toLowerCase()))
    ).length;

    // Count position matches with more weight for primary roles
    const positionMatches = experiences.filter(exp => {
      // Give extra weight to Instron and key technical roles
      const isKeyTechnicalRole = exp.company === 'Instron' || 
                                exp.company === 'AH Automation' ||
                                exp.company === 'Siemens Energy';
      const roleMultiplier = isKeyTechnicalRole ? 2 : 1;

      const isKeyRole = keywords.some(kw => 
        exp.title.toLowerCase().includes(kw.toLowerCase()) ||
        exp.company.toLowerCase().includes(kw.toLowerCase())
      );
      const hasRelevantResponsibilities = exp.responsibilities?.some(resp =>
        keywords.some(kw => resp.toLowerCase().includes(kw.toLowerCase()))
      );
      return (isKeyRole || hasRelevantResponsibilities) ? roleMultiplier : 0;
    }).length;

    // Add extra weight for certifications
    const certificationMatches = certifications.filter(cert =>
      keywords.some(kw => cert.toLowerCase().includes(kw.toLowerCase()))
    ).length * 2; // Double weight for certifications

    return (keywordMatches + (positionMatches * 3) + (certificationMatches * 2)) * baseWeight;
  };

  const categoryScores = Object.entries(categoryMapping).map(([category, { keywords, weight }]) => ({
    category,
    score: getCategoryScore(category, keywords, weight),
    icon: category === 'Testing' ? <Gauge className="w-6 h-6 text-blue-600" /> :
          category === 'Systems' ? <Settings className="w-6 h-6 text-blue-600" /> :
          category === 'Automation' ? <Cpu className="w-6 h-6 text-blue-600" /> :
          category === 'Service' ? <Wrench className="w-6 h-6 text-blue-600" /> :
          category === 'Quality' ? <Shield className="w-6 h-6 text-blue-600" /> :
          <Settings className="w-6 h-6 text-blue-600" />
  }));

  const topCategories = categoryScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const totalScore = topCategories.reduce((sum, cat) => sum + cat.score, 0);

  return (
    <div className="mt-6">
      <h4 className="text-[15px] font-medium text-gray-700 mb-4">Summary</h4>
      <div className="flex justify-between">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Ship className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[13px] font-medium text-gray-700 text-center">Marine</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Gauge className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[13px] font-medium text-gray-700 text-center">Calibration</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Cpu className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[13px] font-medium text-gray-700 text-center">Automation</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Globe2 className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[13px] font-medium text-gray-700 text-center">Global Operations</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[13px] font-medium text-gray-700 text-center">Technical Leadership</span>
        </motion.div>
      </div>
    </div>
  );
};

interface ProfileViewProps {
  onDownloadCV: () => void;
  onDownloadCoverLetter: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onDownloadCV, onDownloadCoverLetter }) => {
  const { personalInfo, experiences, skills, education, certifications } = useCareer();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  
  // Add motion values for tilt animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 3);

  const downloadAllData = () => {
    type DataItem = Record<string, string | number | boolean>;
    type DataSection = DataItem | DataItem[] | string[];
    type AllData = Record<string, DataSection>;

    // Type guard function
    const isDataItem = (item: unknown): item is DataItem => {
      return typeof item === 'object' && item !== null && !Array.isArray(item);
    };

    const isStringArray = (arr: unknown[]): arr is string[] => {
      return arr.every(item => typeof item === 'string');
    };

    const isDataItemArray = (arr: unknown[]): arr is DataItem[] => {
      return arr.every(item => isDataItem(item));
    };

    // Create sections for different data types
    const personalSection = {
      'Personal Information': {
        'Name': personalInfo.name,
        'Primary Title': personalInfo.title.primary,
        'Secondary Title': personalInfo.title.secondary,
        'Tertiary Title': personalInfo.title.tertiary,
        'Summary': personalInfo.summary,
        'Location': personalInfo.contact.location,
        'Email': personalInfo.contact.email,
        'LinkedIn': personalInfo.contact.linkedIn,
        'Languages': personalInfo.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')
      }
    };

    const skillsSection = {
      'Skills': {
        'Technical': skills.technical.join(', '),
        'Operational': skills.operational.join(', ')
      }
    };

    const educationSection = {
      'Education': education.map(edu => ({
        'Degree': edu.degree,
        'School': edu.school,
        'Period': edu.period,
        'Location': edu.location,
        'Details': edu.details.join('; ')
      }))
    };

    const experienceSection = {
      'Experience': experiences.map(exp => ({
        'Title': exp.title,
        'Company': exp.company,
        'Location': exp.location,
        'Period': exp.periods[0].value,
        'Description': exp.description || '',
        'Responsibilities': (exp.responsibilities || []).join('; ')
      }))
    };

    const certificationsSection = {
      'Certifications': certifications
    };

    // Combine all sections
    const allData: AllData = {
      ...personalSection,
      ...skillsSection,
      ...educationSection,
      ...experienceSection,
      ...certificationsSection
    };

    // Convert to CSV format
    const csvRows: string[][] = [];
    
    // Add headers and data for each section
    Object.entries(allData).forEach(([section, data]) => {
      csvRows.push([`# ${section}`]); // Section header
      
      if (Array.isArray(data)) {
        if (data.length > 0) {
          if (isStringArray(data)) {
            // Handle string arrays (like certifications)
            data.forEach(item => {
              csvRows.push([item]);
            });
          } else if (isDataItemArray(data)) {
            // Handle object arrays (like education and experience)
            const headers = Object.keys(data[0]);
            csvRows.push(headers);
            data.forEach(item => {
              csvRows.push(headers.map(header => String(item[header] || '')));
            });
          }
        }
      } else if (isDataItem(data)) {
        // Handle object data (like personal information)
        Object.entries(data).forEach(([key, value]) => {
          csvRows.push([key, String(value)]);
        });
      }
      
      csvRows.push([]); // Empty row between sections
    });

    // Convert rows to CSV string
    const csvContent = csvRows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'cv_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTimelineCSV = () => {
    // Create CSV content
    const headers = ['Period', 'Role', 'Company', 'Location', 'Description', 'Responsibilities'];
    const rows = experiences.map(exp => [
      exp.periods[0].value,
      exp.title,
      exp.company,
      exp.location,
      exp.description || '',
      (exp.responsibilities || []).join('; ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'experience-timeline.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] print:bg-white print:min-h-0">
      <div className="max-w-5xl mx-auto px-4 py-8 print:p-6 print:max-w-none">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ios-card mb-6"
        >
          <div className="ios-card-padding">
            <div className="ios-stack sm:flex-row sm:gap-8 sm:items-start">
              {/* Profile Image and Buttons */}
              <div className="ios-stack items-center gap-4 w-full max-w-[280px]">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ rotate: -10 }}
                  whileTap={{ rotate: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-[160px] h-[160px] rounded-[32px] overflow-hidden shadow-lg shrink-0 print:w-[120px] print:h-[120px]"
                >
                  <img
                    src={personalInfo.contact.photoUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
                <div className="w-[160px] flex flex-col gap-2">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={downloadTimelineCSV}
                    className="ios-button-large bg-blue-50 text-blue-600 hover:bg-blue-100 h-8 text-[13px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Timeline
                  </motion.button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left mt-8 sm:mt-0">
                <h1 className="text-[34px] ios-text-primary mb-2 print:text-[24px] print:mb-1">
                  {personalInfo.name}
                </h1>
                <div className="ios-stack-small mb-4 print:mb-2">
                  <h2 className="text-[22px] ios-text-primary print:text-[18px]">
                    {personalInfo.title.primary}
                  </h2>
                  <p className="text-[17px] ios-text-secondary print:text-[14px]">
                    {personalInfo.title.secondary}
                  </p>
                  <p className="text-[17px] ios-text-secondary print:text-[14px]">
                    {personalInfo.title.tertiary}
                  </p>
                </div>
                <p className="text-[17px] ios-text-secondary leading-relaxed print:text-[14px] print:leading-snug sm:text-left">
                  {personalInfo.summary}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ios-card"
            >
              <div className="ios-card-padding">
                <h3 className="text-[20px] font-semibold mb-4 ios-text-primary">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-[15px] text-gray-600">{personalInfo.contact.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-gray-400" />
                    <a 
                      href={personalInfo.contact.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-[15px] text-gray-600">{personalInfo.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-[15px] text-gray-600">
                      {personalInfo.languages.map(lang => 
                        `${lang.language} (${lang.proficiency})`
                      ).join(' • ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ios-card"
            >
              <div className="ios-card-padding">
                <h3 className="text-[20px] font-semibold mb-4 ios-text-primary">
                  Professional Skills
                </h3>
                <div className="space-y-4">
                  {Object.entries(skillCategories.professional).map(([category, skills]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2">
                        {getSkillIcon(category)}
                        <span className="text-[13px] font-medium text-gray-700">{category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[11px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <UnifiedSkillSummary experiences={experiences} skills={skills} certifications={certifications} />
              </div>
            </motion.div>

            {/* Education & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ios-card"
            >
              <div className="ios-card-padding">
                <h3 className="text-[20px] font-semibold mb-4 ios-text-primary">
                  Education & Certifications
                </h3>
                
                {/* Education */}
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-[15px] font-medium text-blue-600">{edu.degree}</h4>
                      <p className="text-[15px] text-gray-900">{edu.school}</p>
                      <p className="text-[13px] text-gray-500 italic">{edu.period}</p>
                      <p className="text-[13px] text-gray-500 italic">{edu.location}</p>
                      {edu.details.map((detail, idx) => (
                        <p key={idx} className="text-[13px] text-gray-600">{detail}</p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mt-6">
                  <h4 className="text-[15px] font-medium text-gray-700 mb-3">Certifications</h4>
                  <div className="space-y-2">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-[13px] text-gray-600"
                      >
                        <Shield className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ios-card"
            >
              <div className="ios-card-padding">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-[20px] font-semibold">Experience Timeline</h3>
                  <button
                    onClick={() => setShowAllExperiences(!showAllExperiences)}
                    className="text-blue-600 hover:text-blue-700"
                    title={showAllExperiences ? "Show Less" : "Show All"}
                  >
                    {showAllExperiences ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="space-y-8">
                  {displayedExperiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="relative pl-6 border-l border-gray-200"
                    >
                      <div className="absolute left-0 top-2 w-8 h-8 -translate-x-1/2 bg-white rounded-full border-2 border-gray-200 shadow-sm flex items-center justify-center">
                        {getJobIcon(exp.company, exp.title)}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-medium text-blue-600">{exp.title}</h4>
                        <p className="text-[15px] text-gray-900">{exp.company}</p>
                        <p className="text-[13px] text-gray-500 italic">{exp.periods[0].value}</p>
                        <p className="text-[13px] text-gray-500 italic">{exp.location}</p>
                        {exp.description && (
                          <p className="text-[13px] text-gray-600 mt-2">{exp.description}</p>
                        )}
                        {exp.responsibilities && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {exp.responsibilities.map((resp, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[11px]"
                              >
                                {getResponsibilityIcon(resp)}
                                {resp}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <CVModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
      <CoverLetterModal isOpen={showCoverLetterModal} onClose={() => setShowCoverLetterModal(false)} />
    </div>
  );
};

export default ProfileView; 