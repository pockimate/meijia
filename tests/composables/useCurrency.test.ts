import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCurrency } from '~/composables/useCurrency';

describe('useCurrency', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should format price in USD', () => {
    const { formatPrice } = useCurrency();
    
    const result = formatPrice(29.99);
    
    expect(result).toContain('29.99');
    expect(result).toContain('$');
  });

  it('should convert price to different currency', () => {
    const { convertPrice } = useCurrency();
    
    const result = convertPrice(100, 'USD', 'EUR');
    
    expect(result).toBeGreaterThan(0);
    expect(result).not.toBe(100); // Should be converted
  });

  it('should get currency symbol', () => {
    const { getCurrencySymbol } = useCurrency();
    
    expect(getCurrencySymbol('USD')).toBe('$');
    expect(getCurrencySymbol('EUR')).toBe('€');
    expect(getCurrencySymbol('GBP')).toBe('£');
    expect(getCurrencySymbol('JPY')).toBe('¥');
    expect(getCurrencySymbol('CNY')).toBe('¥');
  });

  it('should format price with different currencies', () => {
    const { formatPriceWithCurrency } = useCurrency();
    
    const usd = formatPriceWithCurrency(100, 'USD');
    const eur = formatPriceWithCurrency(100, 'EUR');
    const gbp = formatPriceWithCurrency(100, 'GBP');
    
    expect(usd).toContain('$');
    expect(eur).toContain('€');
    expect(gbp).toContain('£');
  });
});
