import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'ContAI - Container Tracking System',
    description: "Pioneered ContAI's Container Tracking System, optimizing global logistics and enhancing system intelligence with GenAI APIs.",
    image: 'https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'frontend',
    categoryName: 'Frontend',
    technologies: ['Angular', 'GenAI', 'Azure AI Foundry']
  },
  {
    id: 2,
    title: 'Safety Stock Solution for Warehouse Management',
    description: 'Developed a safety stock solution using Angular for the front end, FastAPI for the back end, and Apache Beam for data processing.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'frontend',
    categoryName: 'Frontend',
    technologies: ['Angular', 'Bootstrap']
  },
  {
    id: 3,
    title: 'Scot-IP Project',
    description: "Designed and implemented Scot-IP's UI, contributing to successful IP-Safe clearance and a patented technology solution.",
    image: 'https://saddlepointtech.com/wp-content/uploads/2020/11/Control-Tower-1110x550.png',
    category: 'frontend',
    categoryName: 'Frontend',
    technologies: ['Angular', 'Keycloak']
  },
  {
    id: 4,
    title: 'Data Engineering for Stock and Logistics Analysis',
    description: 'Developed a full-stack solution for stock and logistics data analysis, integrating event and stream processing with Apache Kafka to manage real-time data.',
    image: 'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'fullstack',
    categoryName: 'Full Stack',
    technologies: ['Python', 'Apache Kafka & Beam', 'FastAPI', 'ADL']
  },
  {
    id: 5,
    title: 'Slotting Optimization for Stocks and Containers',
    description: 'Built a full-stack slotting optimization solution for warehouse stock and container management, improving stock placement and operational efficiency.',
    image: 'https://images.pexels.com/photos/4483774/pexels-photo-4483774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'backend',
    categoryName: 'Backend',
    technologies: ['Angular', 'Python', 'FastAPI', 'PostgreSQL', 'Azure Service']
  },
  {
    id: 6,
    title: 'AI Model - Deployment and Analysis Service',
    description: 'Developed a platform for uploading, deploying, and running AI models as a service, providing real-time analysis of uploaded files and models.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'backend',
    categoryName: 'Backend',
    technologies: ['Python', 'FastAPI', 'MLOps', 'PostgreSQL']
  },
  {
    id: 7,
    title: 'YOLO Model for Pallet Identification and Anomaly Detection',
    description: 'Developed a machine learning model for pallet identification and anomaly detection using Convolutional Neural Networks (CNN) and YOLO for real-time object detection.',
    image: 'https://www.ifm.com/responsive/medium/content/gallery/us/robotics/o3r_warehouse.png?v=-1780198951',
    category: 'ai',
    categoryName: 'AI & ML',
    technologies: ['CNN', 'YOLO', 'Python', 'TensorFlow', 'OpenCV']
  },
  {
    id: 8,
    title: 'Portfolio Website',
    description: 'Building an interactive portfolio website to showcase my projects, skills, and professional journey with modern web technologies.',
    image: '/assets/projectImages/Screenshot_11-5-2025_165033_localhost.jpeg',
    category: 'personal',
    categoryName: 'Personal Project',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    liveUrl: 'https://example.com/portfolio',
    githubUrl: 'https://github.com/Jananth-Nikash-K-Y/portfolio'
  },
  {
    id: 9,
    title: 'Version Controlled Resume (LaTeX)',
    description: 'Created a version-controlled resume built with LaTeX, allowing for easy updates and management using Git.',
    image: '/assets/projectImages/Screenshot_11-5-2025_172314_localhost.jpeg',
    category: 'personal',
    categoryName: 'Personal Project',
    technologies: ['LaTeX', 'Tex', 'GitHub'],
    liveUrl: 'assets/Jananth Nikash K Y.pdf',
    githubUrl: 'https://github.com/Jananth-Nikash-K-Y/Resume-template-Latex'
  },
  {
    id: 11,
    title: 'Autonomous Logistics Agent using LangChain and Ollama',
    description: 'Developed an AI-powered logistics agent using LangChain and Ollama that performs warehouse and stock-related tasks autonomously by chaining tools and responding intelligently to complex inputs.',
    image: '/assets/projectImages/ai-model.jpg',
    category: 'ai',
    categoryName: 'AI & ML',
    technologies: ['LangChain', 'Ollama', 'Python'],
    githubUrl: 'https://github.com/Jananth-Nikash-K-Y/autobot',
  }  
];
