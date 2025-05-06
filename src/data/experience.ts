import { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    id: 1,
    role: 'Lead AI Engineer',
    company: 'FutureTech AI',
    companyLogo: 'https://images.pexels.com/photos/668553/pexels-photo-668553.jpeg?auto=compress&cs=tinysrgb&w=1600',
    companyUrl: 'https://example.com/company1',
    location: 'San Francisco, CA',
    startDate: 'Jan 2022',
    endDate: 'Present',
    responsibilities: [
      'Led a team of 5 engineers in developing state-of-the-art AI agents for customer service automation',
      'Architected and implemented neural network infrastructure reducing inference time by 60%',
      'Designed robust testing frameworks for AI systems ensuring 99.8% uptime in production',
      'Collaborated with product teams to create user-friendly interfaces for AI tools'
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Python', 'Angular', 'Node.js', 'AWS']
  },
  {
    id: 2,
    role: 'Senior Full-Stack Developer',
    company: 'InnovateX Solutions',
    companyLogo: 'https://images.pexels.com/photos/705164/pexels-photo-705164.jpeg?auto=compress&cs=tinysrgb&w=1600',
    companyUrl: 'https://example.com/company2',
    location: 'Seattle, WA',
    startDate: 'Mar 2019',
    endDate: 'Dec 2021',
    responsibilities: [
      'Built scalable microservice architecture supporting 1M+ daily active users',
      'Developed responsive and performant front-end applications using Angular',
      'Implemented CI/CD pipelines reducing deployment time from days to minutes',
      'Optimized PostgreSQL database queries resulting in 40% improved response times'
    ],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker']
  },
  {
    id: 3,
    role: 'Machine Learning Engineer',
    company: 'DataVision Analytics',
    companyLogo: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1600',
    companyUrl: 'https://example.com/company3',
    location: 'Boston, MA',
    startDate: 'Jun 2017',
    endDate: 'Feb 2019',
    responsibilities: [
      'Developed predictive models for financial forecasting with 92% accuracy',
      'Created computer vision algorithms for medical image analysis',
      'Built data processing pipelines handling 50TB+ of training data',
      'Presented technical findings to non-technical stakeholders'
    ],
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Flask']
  },
  {
    id: 4,
    role: 'Frontend Developer',
    company: 'WebSphere Innovations',
    companyLogo: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1600',
    companyUrl: 'https://example.com/company4',
    location: 'Austin, TX',
    startDate: 'Aug 2015',
    endDate: 'May 2017',
    responsibilities: [
      'Designed and implemented responsive UI components for enterprise applications',
      'Created interactive data visualizations using D3.js',
      'Optimized frontend performance reducing load times by 35%',
      'Collaborated with UX designers to implement pixel-perfect interfaces'
    ],
    technologies: ['Angular', 'JavaScript', 'HTML', 'CSS', 'SASS', 'D3.js']
  }
];