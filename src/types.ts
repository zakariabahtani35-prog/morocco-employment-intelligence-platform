export type PageView = 'home' | 'dashboard' | 'travel' | 'sponsors' | 'events' | 'faq';

export interface Sponsor {
  name: string;
  category: 'platinum' | 'gold' | 'silver' | 'partner';
  logoText: string;
  subtext?: string;
}

export interface EcosystemEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  badge: string;
  bgGradient: string;
  featuredText?: string;
  linkText: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'data' | 'tech' | 'academic' | 'dashboard' | 'tickets' | 'travel' | 'speaking' | 'sponsors';
}

export interface Announcement {
  id: string;
  category: string;
  title: string;
  link: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  handle: string;
  role: string;
  company: string;
  avatarUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}
