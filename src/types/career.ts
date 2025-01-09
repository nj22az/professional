export interface Experience {
  title: string;
  company: string;
  periods: Array<{ type: 'simple' | 'detailed'; value: string }>;
  description?: string;
  location: string;
  responsibilities?: string[];
  iconType: 'building' | 'ship';
}

export interface CareerData {
  personalInfo: {
    name: string;
    title: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    contact: {
      email: string;
      phone: string;
      location: string;
      photoUrl: string;
    };
    summary: string;
    languages: Array<{
      language: string;
      proficiency: string;
    }>;
  };
  experiences: Experience[];
  skills: {
    technical: string[];
    operational: string[];
  };
} 