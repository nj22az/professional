import React, { createContext, useContext, type ReactNode, useState } from 'react';

interface PersonalInfo {
  name: string;
  title: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  summary: string;
  contact: {
    location: string;
    email: string;
    linkedIn: string;
    photoUrl: string;
  };
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  periods: Array<{
    value: string;
  }>;
  description?: string;
  responsibilities?: string[];
}

interface Education {
  degree: string;
  school: string;
  period: string;
  location: string;
  description: string;
  details: string[];
}

interface CareerContextType {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: {
    technical: string[];
    operational: string[];
  };
  certifications: string[];
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateExperience: (index: number, experience: Partial<Experience>) => void;
  updateEducation: (index: number, education: Partial<Education>) => void;
}

const defaultContext: Omit<CareerContextType, 'updatePersonalInfo' | 'updateExperience' | 'updateEducation'> = {
  personalInfo: {
    name: "Nils Johansson",
    title: {
      primary: "Marine & Field Service Engineer",
      secondary: "Specialized in Calibration, Installation, and Automation",
      tertiary: "Expert in Hands-On Technical Operations—Onshore and Offshore"
    },
    summary: "I am an experienced Marine and Automation Engineer with a strong background in field service, commissioning, and technical operations. My expertise spans both offshore and onshore projects, where I combine hands-on engineering proficiency with in-depth technical knowledge. I specialize in calibration, installation, and automation systems, ensuring seamless operational performance.",
    contact: {
      location: "Örebro, Sweden • Da Nang, Quang Nam, Vietnam",
      email: "Please contact me via LinkedIn for details",
      linkedIn: "https://www.linkedin.com/in/nils-johansson-86744583/",
      photoUrl: "https://media.licdn.com/dms/image/v2/D5603AQGGj6KXXWm7YA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690835503939?e=1741219200&v=beta&t=fqqPILNXAZcpmMpSL4SQIwfiszdkbb3lPqlvCaAjDPQ"
    },
    languages: [
      { language: "Swedish", proficiency: "Native" },
      { language: "English", proficiency: "Fluent" }
    ]
  },
  experiences: [
    {
      title: "Field Service Engineer",
      company: "Instron",
      location: "Nordic Region",
      periods: [{ value: "January 2024 • Present" }],
      description: "Installation and commissioning of testing systems across Nordic Region and Europe. Perform comprehensive IQOQ processes and develop testing methods using Bluehill software. Specialize in load cell calibration and provide client training for equipment optimization.",
      responsibilities: [
        "Testing Systems Installation",
        "IQOQ & Calibration",
        "Bluehill Software",
        "Technical Training",
        "Data Analysis"
      ]
    },
    {
      title: "Automation Engineer",
      company: "AH Automation",
      location: "Sweden",
      periods: [{ value: "Jul 2023 • Dec 2023" }],
      description: "Developed expertise in Siemens TIA Portal and automation systems. Implemented conveyor belt systems with touchscreen HMI interfaces. Engaged in continuous professional development and maintenance of electric motors in conveyor systems.",
      responsibilities: [
        "PLC Programming",
        "HMI Development",
        "System Integration",
        "Technical Documentation",
        "Automation Design"
      ]
    },
    {
      title: "Commissioning Engineer",
      company: "Siemens Energy",
      location: "Worldwide",
      periods: [{ value: "Sep 2020 • Jul 2023" }],
      description: "As a Commissioning Engineer at Siemens Energy, I was pivotal in launching medium-sized gas turbines worldwide, with a focus on Thailand, Uzbekistan, and the UK. I drew on my expertise in mechanical, electrical, and control systems to guide turbine assembly, installation, and testing while upholding strict safety standards. By working closely with engineering, project management, and operational teams, I streamlined communication and tackled challenges head-on. My exposure to diverse settings sharpened my cultural adaptability and technical know-how, making me an invaluable asset in demanding environments.",
      responsibilities: [
        "Gas Turbine Systems",
        "Project Management",
        "International Operations",
        "Technical Leadership",
        "System Integration",
        "Safety Compliance"
      ]
    },
    {
      title: "Inspection Engineer",
      company: "DEKRA Industrial",
      location: "Sweden",
      periods: [{ value: "Dec 2019 • Sep 2020" }],
      responsibilities: [
        "Quality Control",
        "Safety Compliance",
        "Technical Documentation",
        "Industrial Inspections",
        "Equipment Assessment",
        "Regulatory Standards"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Stena RoRo",
      location: "Nynäshamn, Sweden",
      periods: [{ value: "Sep 2018 • Dec 2019" }],
      responsibilities: [
        "Engine Operations",
        "Maintenance Planning",
        "System Repairs",
        "Equipment Overhaul",
        "Safety Protocols",
        "Technical Documentation"
      ]
    },
    {
      title: "Regional Technical Engineer",
      company: "Trafikverket",
      location: "Visingsö, Sweden",
      periods: [{ value: "Apr 2018 • Sep 2018" }],
      responsibilities: [
        "Technical Operations",
        "Team Leadership",
        "Maintenance Planning",
        "Safety Compliance",
        "System Optimization",
        "Equipment Repairs"
      ]
    },
    {
      title: "Technical Manager",
      company: "Persson Innovation AB",
      location: "Kumla, Örebro län, Sweden",
      periods: [{ value: "Jan 2018 • Apr 2018" }],
      responsibilities: [
        "Project Management",
        "Automation Systems",
        "Team Supervision",
        "Process Optimization",
        "Technical Planning",
        "Quality Control"
      ]
    },
    {
      title: "Field Service Engineer",
      company: "Instron",
      location: "Nordic Region • Ireland • Poland",
      periods: [{ value: "Sep 2015 • Jan 2018" }],
      responsibilities: [
        "System Installation",
        "Equipment Calibration",
        "Software Configuration",
        "Client Training",
        "Technical Support",
        "Quality Assurance"
      ]
    },
    {
      title: "Engine Fitter",
      company: "Örebro Kommun",
      location: "Örebro, Sweden",
      periods: [{ value: "Apr 2015 • Sep 2015" }],
      responsibilities: [
        "Equipment Repair",
        "System Maintenance",
        "Technical Operations",
        "Safety Compliance",
        "Documentation",
        "Quality Control"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Stena Baltic A/S",
      location: "Worldwide",
      periods: [{ value: "Nov 2014 • Apr 2015" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Overhaul",
        "Safety Protocols",
        "Technical Documentation",
        "Quality Standards"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Destination Gotland",
      location: "Visby, Sweden",
      periods: [{ value: "May 2014 • Oct 2014" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Compliance",
        "Technical Documentation",
        "Quality Control"
      ]
    },
    {
      title: "Engineer/Motorman",
      company: "Trafikverket",
      location: "Hampetorp, Sweden",
      periods: [{ value: "Jan 2014 • Apr 2014" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Standards",
        "Technical Documentation",
        "Quality Assurance"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Finnlines",
      location: "Worldwide",
      periods: [{ value: "Nov 2013 • Dec 2013" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Protocols",
        "Technical Documentation",
        "Quality Standards"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Teekay",
      location: "Worldwide",
      periods: [{ value: "Aug 4th • Aug 18th 2013" }],
      responsibilities: [
        "Dynamic Positioning",
        "Engine Operations",
        "System Maintenance",
        "Safety Compliance",
        "Technical Documentation",
        "Emergency Systems"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Noble Caledonia",
      location: "Worldwide",
      periods: [{ value: "Mar 2013 • Jul 2013" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Standards",
        "Technical Documentation",
        "Quality Control"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Finnlines",
      location: "Worldwide",
      periods: [{ value: "Dec 2012 • Feb 2013" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Overhaul",
        "Safety Protocols",
        "Technical Documentation",
        "Quality Standards"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Sirius Ship Management S.r.l.",
      location: "Worldwide",
      periods: [{ value: "Oct 2012 • Dec 2012" }],
      responsibilities: [
        "Engine Operations",
        "Cargo Systems",
        "Equipment Maintenance",
        "Safety Standards",
        "Technical Documentation",
        "Quality Control"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Finnlines",
      location: "Worldwide",
      periods: [{ value: "Jul 2012 • Oct 2012" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Protocols",
        "Technical Documentation",
        "Quality Standards"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Terntank Rederi AS",
      location: "Worldwide",
      periods: [{ value: "Jul 7th • Jul 21st 2012" }],
      responsibilities: [
        "Engine Operations",
        "Cargo Systems",
        "Equipment Maintenance",
        "Safety Standards",
        "Technical Documentation",
        "Quality Control"
      ]
    },
    {
      title: "3rd Engineer",
      company: "Finnlines",
      location: "Worldwide",
      periods: [{ value: "Mar 2012 • Jul 2012" }],
      responsibilities: [
        "Engine Operations",
        "System Maintenance",
        "Equipment Repair",
        "Safety Protocols",
        "Technical Documentation",
        "Quality Standards"
      ]
    },
    {
      title: "Engineer",
      company: "Royal Swedish Navy",
      location: "Swedish Archipelago",
      periods: [{ value: "Sep 2011 • Mar 2012" }],
      responsibilities: [
        "Military Operations",
        "Engine Systems",
        "Equipment Maintenance",
        "Safety Protocols",
        "Technical Documentation",
        "Emergency Response"
      ]
    },
    {
      title: "Warehouse Worker",
      company: "Various Companies",
      location: "Örebro, Sweden",
      periods: [{ value: "2003 • 2007" }],
      responsibilities: [
        "Inventory Management",
        "Logistics Operations",
        "Equipment Handling",
        "Safety Standards",
        "Documentation",
        "Quality Control"
      ]
    },
    {
      title: "Military Service, AB",
      company: "Royal Swedish Navy",
      location: "Sweden",
      periods: [{ value: "Jan 2003 • Dec 2003" }],
      responsibilities: [
        "Military Training",
        "Maritime Operations",
        "Equipment Handling",
        "Safety Protocols",
        "Team Coordination",
        "Emergency Response"
      ]
    },
    {
      title: "Temporary Teacher",
      company: "Various Schools",
      location: "Sweden",
      periods: [{ value: "2002 • 2003" }],
      responsibilities: []
    }
  ],
  education: [
    {
      degree: "Marine Engineering",
      school: "Linnaeus University",
      period: "2007 • 2011",
      location: "Linnaeus University • Kalmar, Sweden",
      description: "",
      details: [
        "Associate's degree in Marine Engineering. Comprehensive 4-year Marine Engineering program, including a 10-month seagoing cadetship for practical experience. Advanced coursework and hands-on training specialized in marine systems, automation, and engineering. Completed 4 months of intensive training in electrical and mechanical systems."
      ]
    },
    {
      degree: "Social Science (Bilingual)",
      school: "Rudbecksskolan",
      period: "1999 • 2002",
      location: "Rudbecksskolan • Örebro, Sweden",
      description: "",
      details: [
        "3-year program focused on societal structures, human behavior, and global issues. Included advanced coursework and practical projects to develop critical thinking and analytical skills. Specialized in sociology, political science, economics, and history."
      ]
    }
  ],
  skills: {
    technical: [
      "Marine Engineering & Systems",
      "Testing & Calibration",
      "Programming (Python, JS)",
      "PLC (TIA Portal)",
      "Electrical Systems",
      "Mechanical Systems",
      "Data Analysis & Reporting",
      "Gas Turbine Systems"
    ],
    operational: [
      "Project Management",
      "Team Leadership",
      "Safety & Risk Management",
      "Resource Planning",
      "Global Communication",
      "Technical Documentation",
      "Client Relations"
    ]
  },
  certifications: [
    "Certificate of Competency EOOW - Marine Engineering",
    "Siemens Gas Turbine Certification",
    "PLC Programming - TIA Portal",
    "IQOQ Validation Specialist",
    "Basic Safety Training (STCW)",
    "Advanced Firefighting",
    "Medical First Aid",
    "Instron Calibration Training - Static Systems",
    "Instron Calibration Training - Dynamic Systems",
    "High Voltage Training",
    "Crowd & Crisis Management"
  ]
};

export const CareerContext = createContext<CareerContextType>({
  ...defaultContext,
  updatePersonalInfo: () => {},
  updateExperience: () => {},
  updateEducation: () => {}
});

export function CareerProvider({ children }: { children: ReactNode }) {
  const [contextValue, setContextValue] = useState(defaultContext);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setContextValue(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  const updateExperience = (index: number, experience: Partial<Experience>) => {
    setContextValue(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, ...experience } : exp
      )
    }));
  };

  const updateEducation = (index: number, education: Partial<Education>) => {
    setContextValue(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, ...education } : edu
      )
    }));
  };

  return (
    <CareerContext.Provider 
      value={{
        ...contextValue,
        updatePersonalInfo,
        updateExperience,
        updateEducation
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
} 