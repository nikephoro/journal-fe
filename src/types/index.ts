export interface User {
  id: string;
  email: string;
  name: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}