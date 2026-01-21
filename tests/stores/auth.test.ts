import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '~/stores/auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('should initialize with no user', () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });

  it('should login user', async () => {
    const store = useAuthStore();
    
    await store.login('test@example.com', 'password123');
    
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toBeTruthy();
    expect(store.user?.email).toBe('test@example.com');
  });

  it('should register user', async () => {
    const store = useAuthStore();
    
    await store.register('John Doe', 'john@example.com', 'password123');
    
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toBeTruthy();
    expect(store.user?.name).toBe('John Doe');
    expect(store.user?.email).toBe('john@example.com');
  });

  it('should logout user', () => {
    const store = useAuthStore();
    
    store.login('test@example.com', 'password123');
    expect(store.isAuthenticated).toBe(true);
    
    store.logout();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBeNull();
  });

  it('should update user profile', () => {
    const store = useAuthStore();
    
    store.login('test@example.com', 'password123');
    
    store.updateProfile({
      name: 'Updated Name',
      phone: '1234567890',
    });
    
    expect(store.user?.name).toBe('Updated Name');
    expect(store.user?.phone).toBe('1234567890');
  });

  it('should persist to localStorage', async () => {
    const store = useAuthStore();
    
    await store.login('test@example.com', 'password123');
    
    const saved = localStorage.getItem('astro_auth');
    expect(saved).toBeTruthy();
    
    const parsed = JSON.parse(saved!);
    expect(parsed.user.email).toBe('test@example.com');
  });

  it('should load from localStorage', () => {
    const authData = {
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        token: 'mock-token',
      },
    };
    localStorage.setItem('astro_auth', JSON.stringify(authData));
    
    const store = useAuthStore();
    
    expect(store.isAuthenticated).toBe(true);
    expect(store.user?.email).toBe('test@example.com');
  });
});
