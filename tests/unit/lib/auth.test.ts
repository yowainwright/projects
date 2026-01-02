import { describe, test, expect, beforeEach } from 'bun:test';
import {
  getStoredUser,
  getStoredToken,
  setAuth,
  clearAuth,
  isAuthenticated,
  type GitHubUser,
} from '@/lib/auth';

const mockUser: GitHubUser = {
  login: 'testuser',
  avatar_url: 'https://example.com/avatar.png',
  name: 'Test User',
  email: 'test@example.com',
};

describe('auth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStoredUser', () => {
    test('returns null when no user stored', () => {
      expect(getStoredUser()).toBeNull();
    });

    test('returns parsed user when stored', () => {
      localStorage.setItem('github_user', JSON.stringify(mockUser));
      expect(getStoredUser()).toEqual(mockUser);
    });
  });

  describe('getStoredToken', () => {
    test('returns null when no token stored', () => {
      expect(getStoredToken()).toBeNull();
    });

    test('returns token when stored', () => {
      localStorage.setItem('github_token', 'test-token');
      expect(getStoredToken()).toBe('test-token');
    });
  });

  describe('setAuth', () => {
    test('stores user and token in localStorage', () => {
      setAuth(mockUser, 'my-token');

      expect(localStorage.getItem('github_user')).toBe(JSON.stringify(mockUser));
      expect(localStorage.getItem('github_token')).toBe('my-token');
    });
  });

  describe('clearAuth', () => {
    test('removes user and token from localStorage, oauth_state from sessionStorage', () => {
      localStorage.setItem('github_user', JSON.stringify(mockUser));
      localStorage.setItem('github_token', 'my-token');
      sessionStorage.setItem('oauth_state', 'some-state');

      clearAuth();

      expect(localStorage.getItem('github_user')).toBeNull();
      expect(localStorage.getItem('github_token')).toBeNull();
      expect(sessionStorage.getItem('oauth_state')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    test('returns false when no token', () => {
      expect(isAuthenticated()).toBe(false);
    });

    test('returns true when token exists', () => {
      localStorage.setItem('github_token', 'valid-token');
      expect(isAuthenticated()).toBe(true);
    });
  });
});
