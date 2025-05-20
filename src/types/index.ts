export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryName: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  companyLogo: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}