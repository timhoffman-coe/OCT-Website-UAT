export type Role = 'user' | 'model' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export interface Document {
  name: string;
  content: string;
}

export type Category = 'Service Management' | 'IT Service Desk' | 'HR Policies';
