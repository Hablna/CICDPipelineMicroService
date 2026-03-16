
export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  roles: string[];
}

export interface AppEvent {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
