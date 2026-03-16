
import { User, AppEvent } from '../types';

const USER_SERVICE_URL = 'http://localhost:8081';
const EVENT_SERVICE_URL = 'http://localhost:8082';

export const userService = {
  register: async (userData: User): Promise<any> => {
    const response = await fetch(`${USER_SERVICE_URL}/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  login: async (credentials: Pick<User, 'email' | 'password'>): Promise<User> => {
    const response = await fetch(`${USER_SERVICE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  }
};

export const eventService = {
  getAll: async (): Promise<AppEvent[]> => {
    const response = await fetch(`${EVENT_SERVICE_URL}/getEvents`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  create: async (event: AppEvent): Promise<number> => {
    const response = await fetch(`${EVENT_SERVICE_URL}/createEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  },

  update: async (event: AppEvent): Promise<AppEvent> => {
    const response = await fetch(`${EVENT_SERVICE_URL}/updateEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Failed to update event');
    return response.json();
  },

  delete: async (eventId: number): Promise<boolean> => {
    const response = await fetch(`${EVENT_SERVICE_URL}/deleteEvent`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventId),
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return response.json();
  }
};
