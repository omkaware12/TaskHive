import React from 'react';

export default function TrustBanner() {
  const companies = [
    { name: 'Proline', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
    { name: 'DevWise', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M4 6h16M4 12h16M4 18h16" /></svg> },
    { name: 'Invert', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 3a9 9 0 109 9 9.75 9.75 0 00-9-9z" /><path d="M12 3v18" /></svg> },
    { name: 'Proline', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
    { name: 'Hitech', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
    { name: 'Flash', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Trusted by over 90% of Fortune 100 companies
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <span className="mr-2">{company.icon}</span>
              <span className="font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}