"use client";
import { FaFilePdf } from "react-icons/fa";

const pdfSummaries = [
  {
    title: "DBMS Summary",
    description: "Quick revision notes for Database Management System.",
    link: "https://drive.google.com/drive/folders/1L9X2AJI7hOdP5dOcoOp4dPwZgD46g0df?usp=sharing",
  },
  {
    title: "Operating System Summary",
    description: "Important concepts & algorithms for OS exams.",
    link: "https://drive.google.com/drive/folders/1L9X2AJI7hOdP5dOcoOp4dPwZgD46g0df?usp=sharing",
  },
  {
    title: "Computer Networks Formula Sheet",
    description: "Protocols, layers, and key formulas in one page.",
    link: "https://drive.google.com/drive/folders/1L9X2AJI7hOdP5dOcoOp4dPwZgD46g0df?usp=sharing",
  },
  {
    title: "DSA Quick Revision",
    description: "Time complexities, patterns, and important DSA notes.",
    link: "https://drive.google.com/drive/folders/1L9X2AJI7hOdP5dOcoOp4dPwZgD46g0df?usp=sharing",
  },
];

export default function PdfSummaries() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📂 PDF Summaries
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pdfSummaries.map((pdf, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FaFilePdf className="text-red-500 text-3xl" />
                <h3 className="text-lg font-semibold text-gray-700">
                  {pdf.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {pdf.description}
              </p>

              <a
                href={pdf.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                📥 Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
