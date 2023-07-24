export interface UserProfile {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  websites?: string[];
}

export type ChatPrompt = {
  id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  topic: string[];
  createdAt: Date;
  upvotedBy?: User[] | null;
  savedBy?: User[] | null;
  submittedBy?: User | null;
};

export interface User {
  email: string;
  name: string;
  image?: string;
}
