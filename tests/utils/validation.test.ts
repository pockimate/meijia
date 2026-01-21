import { describe, it, expect } from 'vitest';

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Credit card validation
const isValidCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

// CVV validation
const isValidCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

// Expiry date validation
const isValidExpiryDate = (expiry: string): boolean => {
  const [month, year] = expiry.split('/').map(s => parseInt(s.trim()));
  if (!month || !year) return false;
  
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

describe('Validation Utils', () => {
  describe('Email Validation', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
    });
  });

  describe('Card Number Validation', () => {
    it('should validate correct card number', () => {
      expect(isValidCardNumber('4532015112830366')).toBe(true);
      expect(isValidCardNumber('4532 0151 1283 0366')).toBe(true);
    });

    it('should reject invalid card number', () => {
      expect(isValidCardNumber('123')).toBe(false);
      expect(isValidCardNumber('abcd1234')).toBe(false);
    });
  });

  describe('CVV Validation', () => {
    it('should validate correct CVV', () => {
      expect(isValidCVV('123')).toBe(true);
      expect(isValidCVV('1234')).toBe(true);
    });

    it('should reject invalid CVV', () => {
      expect(isValidCVV('12')).toBe(false);
      expect(isValidCVV('12345')).toBe(false);
      expect(isValidCVV('abc')).toBe(false);
    });
  });

  describe('Expiry Date Validation', () => {
    it('should validate future dates', () => {
      expect(isValidExpiryDate('12/30')).toBe(true);
      expect(isValidExpiryDate('06/28')).toBe(true);
    });

    it('should reject past dates', () => {
      expect(isValidExpiryDate('01/20')).toBe(false);
    });

    it('should reject invalid months', () => {
      expect(isValidExpiryDate('13/30')).toBe(false);
      expect(isValidExpiryDate('00/30')).toBe(false);
    });

    it('should reject invalid format', () => {
      expect(isValidExpiryDate('invalid')).toBe(false);
      expect(isValidExpiryDate('12')).toBe(false);
    });
  });
});
