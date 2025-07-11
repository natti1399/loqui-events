export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  description: string;
  image: string;
  stripeLink: string;
  maxParticipants: number;
  category: 'Workshop' | 'Social' | 'Fitness' | 'Creative' | 'Quiz' | 'Game Night';
  status: 'upcoming' | 'sold-out' | 'cancelled';
  shortDescription?: string;
  published: boolean;
  slug?: string;
  id?: string;
}

export interface EventFrontmatter extends Event {
  // Additional fields that might come from markdown frontmatter
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  openingHours: string;
}