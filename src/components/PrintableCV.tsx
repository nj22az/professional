import React from 'react';
import { useCareer } from '../contexts/CareerContext';

const PrintableCV: React.FC = () => {
  const { personalInfo, experiences, skills, education, certifications } = useCareer();

  const recentExperiences = experiences.slice(0, 3);

  return (
    <div className="max-w-[900px] mx-auto p-8 font-sans bg-white text-gray-900 print:p-6">
      {/* Header with Profile Picture */}
      <div className="relative mb-6">
        <header className="pr-32">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
          <div className="text-lg text-gray-600 mb-1">{personalInfo.title.primary}</div>
          <div className="text-sm text-gray-500 mb-1">{personalInfo.title.secondary}</div>
          <div className="text-sm text-gray-500">{personalInfo.title.tertiary}</div>
          <div className="text-sm text-gray-600 mt-2">{personalInfo.contact.location}</div>
        </header>
        {/* Profile Picture */}
        <div className="absolute top-0 right-0">
          <img 
            src={personalInfo.contact.photoUrl} 
            alt={personalInfo.name}
            className="w-24 h-24 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          As a Field Service Engineer at Instron, I've built on my background in Marine and Automation Engineering to develop a well-rounded technical skillset. I take pride in my work conducting field service operations and commissioning projects both offshore and onshore. Over the years, I've gained deep experience with calibration procedures, installation processes, and automation systems that help ensure everything runs smoothly.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Technical</h3>
            <p className="text-gray-600">Marine Engineering & Systems, Calibration & Testing, Project Management, Data Analysis, Technical Documentation, Global Operations</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Software</h3>
            <p className="text-gray-600">Bluehill Suite, Siemens TIA Portal, Astea, Amos, Concur</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="text-sm mb-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <span className="font-medium text-gray-800">{edu.degree}</span>
                <span className="text-gray-600"> • {edu.school}</span>
              </div>
              <div className="text-gray-500">{edu.period}</div>
            </div>
            <p className="text-gray-600">{edu.details[0]}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Experience</h2>
        <div className="space-y-4">
          {recentExperiences.map((job, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium text-gray-800">{job.title}</span>
                  <span className="text-gray-600"> • {job.company}</span>
                </div>
                <div className="text-gray-500 text-right">{job.periods[0].value}</div>
              </div>
              <div className="text-gray-600">{job.location}</div>
              {job.description && (
                <p className="text-gray-600 mt-1">{job.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Certifications</h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          {certifications.slice(0, 4).map((cert, index) => (
            <div key={index}>• {cert}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrintableCV; 