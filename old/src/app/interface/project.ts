export interface Project {
  type: 'commercial' | 'non-commercial';
  title: string;
  offer: string[];
  shortDesc: string;
  techStack: string[];
  route: string;
}
