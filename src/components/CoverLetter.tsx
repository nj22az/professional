import React from 'react';

const CoverLetter: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Nils Johansson</h1>
          <p className="text-lg text-gray-600">Marine & Field Service Engineer</p>
          <p className="text-sm text-gray-500">Örebro, Sweden • Da Nang, Vietnam</p>
        </div>

        {/* Date */}
        <p className="text-gray-600">{currentDate}</p>

        {/* Greeting */}
        <p className="text-gray-900">Dear Hiring Manager,</p>

        {/* Body */}
        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>
            I am writing to express my interest in bringing my extensive engineering expertise to your organization. With over a decade of experience spanning marine engineering, field service, and automation systems, I offer a unique blend of technical proficiency and practical problem-solving skills.
          </p>
          
          <p>
            In my current role as a Field Service Engineer at Instron, I lead complex testing system installations across the Nordic Region and Europe. Previously, as a Commissioning Engineer at Siemens Energy, I successfully launched medium-sized gas turbines worldwide, demonstrating my ability to adapt to diverse environments and deliver results under pressure.
          </p>
          
          <p>
            My technical expertise includes:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Marine and Industrial commissioning and installations and operations</li>
            <li>PLC programming and automation systems</li>
            <li>Calibration and quality control processes</li>
            <li>Maintenance of Material Testing Machines, and Marine Machinery</li>
            <li>Project management and team leadership</li>
          </ul>
          
          <p>
            I am particularly drawn to opportunities that challenge me to apply my diverse skill set in innovative ways. My background in both onshore and offshore operations, combined with my commitment to excellence and safety, positions me to make immediate contributions to your team.
          </p>
          
          <p>
            I would welcome the opportunity to discuss how my skills and experience align with your organization's needs.
          </p>
        </div>

        {/* Closing */}
        <div className="space-y-2">
          <p className="text-gray-900">Best regards,</p>
          <p className="text-gray-900 font-semibold">Nils Johansson</p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter; 