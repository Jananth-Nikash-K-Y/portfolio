import { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    id: 1,
    role: 'AI Engineer',
    company: 'Tata Consultancy Services',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg',
    companyUrl: 'https://www.tcs.com',
    location: 'Chennai, India',
    startDate: 'Dec 2024',
    endDate: 'Present',
    responsibilities: [
      'Led the AI integration for ContAI, enhancing global container tracking with GenAI APIs.',
      'Developed and deployed AI/ML systems into full-stack enterprise applications.',
      'Contributed to AI-driven automation initiatives and scalable microservices for logistics.'
    ],
    technologies: ['Python ML Libraries', 'Agentic AI', 'GenAI', 'Langchain']
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Tata Consultancy Services',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg',
    companyUrl: 'https://www.tcs.com',
    location: 'Chennai, India',
    startDate: 'Sep 2023',
    endDate: 'Nov 2024',
    responsibilities: [
      'Developed APIs using FastAPI for supply chain and logistics solutions.',
      'Implemented Apache Beam pipelines to process and transform large-scale datasets.',
      'Managed backend logic and data engineering to support predictive analytics.'
    ],
    technologies: ['Python', 'FastAPI', 'Apache Beam', 'Flask' , 'PostgreSQL', 'Azure Service']
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Tata Consultancy Services',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg',
    companyUrl: 'https://www.tcs.com',
    location: 'Chennai, India',
    startDate: 'Feb 2022',
    endDate: 'Aug 2023',
    responsibilities: [
      'Designed user interfaces for the Scot-IP and warehouse management systems using Angular.',
      'Integrated Keycloak for secure user authentication and authorization.',
      'Contributed to projects that passed TCS IP-Safe and earned patent recognition.'
    ],
    technologies: ['Angular', 'TypeScript', 'Keycloak', 'Three.js']
  }
];
