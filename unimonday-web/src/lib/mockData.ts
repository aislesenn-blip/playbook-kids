import { DocumentTemplate, StationaryPartner } from '@/types';

export const documentTemplates: DocumentTemplate[] = [
  {
    id: "tpl-1",
    title: "Official Request Letter",
    description: "Standard format for requesting permissions, transcripts, or official documents from the university.",
    category: "Letters",
    icon: "FileText",
    color: "blue",
    popularity: 98
  },
  {
    id: "tpl-2",
    title: "Coursework Assignment",
    description: "APA/MLA formatted template with automated cover page, page numbers, and reference sections.",
    category: "Assignments",
    icon: "BookOpen",
    color: "emerald",
    popularity: 95
  },
  {
    id: "tpl-3",
    title: "Professional Internship CV",
    description: "ATS-friendly layout tailored for students applying for field attachments and internships.",
    category: "CVs & Resumes",
    icon: "Briefcase",
    color: "purple",
    popularity: 92
  },
  {
    id: "tpl-4",
    title: "Project Proposal",
    description: "Structured template for final year project proposals including budget tables and timelines.",
    category: "Reports",
    icon: "PieChart",
    color: "amber",
    popularity: 88
  }
];

export const stationaryPartners: StationaryPartner[] = [
  {
    id: "stat-1",
    storeName: "UDSM Main Campus Printers",
    storeSlug: "udsm-main-printers",
    description: "Fast and reliable printing near the library.",
    rating: 4.8,
    region: "Dar es Salaam",
    campusName: "UDSM",
    isVerified: true,
    printCostPerPage: 100,
    locationDetails: "Yombo Building, Ground Floor"
  },
  {
    id: "stat-2",
    storeName: "Mlimani City Express Print",
    storeSlug: "mlimani-express",
    description: "High quality color printing and binding.",
    rating: 4.5,
    region: "Dar es Salaam",
    campusName: "Near UDSM",
    isVerified: true,
    printCostPerPage: 150,
    locationDetails: "Mlimani City Mall, Shop 42"
  }
];
