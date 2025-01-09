import type { CareerData } from '../types/career';

export const careerData: CareerData = {
  personalInfo: {
    name: "Nils Johansson",
    title: {
      primary: "Marine & Field Service Engineer",
      secondary: "Specialized in Calibration, Installation, and Automation",
      tertiary: "Expert in Hands-On Technical Operations—Onshore and Offshore"
    },
    contact: {
      email: "nils.johansson@live.com",
      phone: "+46761655102",
      location: "Örebro, Sweden • Da Nang, Quang Nam, Vietnam",
      photoUrl: "https://media.licdn.com/dms/image/v2/D5603AQGGj6KXXWm7YA/profile-displayphoto-shrink_400_400/0/1690835503939?e=1741219200&v=beta&t=fqqPILNXAZcpmMpSL4SQIwfiszdkbb3lPqlvCaAjDPQ"
    },
    summary: "I am an experienced Marine and Automation Engineer with a strong background in field service, commissioning, and technical operations. My expertise spans both offshore and onshore projects, where I combine hands-on engineering proficiency with in-depth technical knowledge. I specialize in calibration, installation, and automation systems, ensuring seamless operational performance.",
    languages: [
      { language: "Swedish", proficiency: "Native" },
      { language: "English", proficiency: "Fluent" }
    ]
  },
  experiences: [
    // Your experiences data here
  ],
  skills: {
    technical: [
      "Marine Engineering & Systems",
      "Testing & Calibration",
      "Electrical Systems",
      "Data Analysis & Reporting",
      "Automation & PLC",
      "Gas Turbine Systems",
      "Mechanical Systems"
    ],
    operational: [
      "Project Management",
      "Team Leadership",
      "Safety & Risk Management",
      "Resource Planning",
      "Global Communication",
      "Technical Documentation"
    ]
  }
}; 