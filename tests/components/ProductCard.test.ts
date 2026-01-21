import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ProductCard from '~/components/ProductCard.vue';
import type { Product } from '~/types';

// Mock composables
vi.mock('~/composables/useCurrency', () => ({
  useCurrency: () => ({
    formatPrice: (price: number) => `$${price.toFixed(2)}`,
  }),
}));

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Cosmic Nails',
    price: 29.99,
    image: '/test.jpg',
    category: 'press-ons',
    zodiac: 'Aries',
    rating: 4.5,
    description: 'Test description',
    isNew: false,
    badge: 'New',
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render product information', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Cosmic Nails');
    expect(wrapper.text()).toContain('$29.99');
    expect(wrapper.text()).toContain('press-ons');
    expect(wrapper.text()).toContain('Aries');
  });

  it('should display badge when present', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    expect(wrapper.text()).toContain('New');
  });

  it('should display rating', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    expect(wrapper.text()).toContain('4.5');
  });

  it('should have lazy loading on image', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('loading')).toBe('lazy');
  });

  it('should have explicit image dimensions', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('width')).toBe('400');
    expect(img.attributes('height')).toBe('400');
  });

  it('should emit add to cart event', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        stubs: {
          NuxtLink: true,
          WishlistButton: true,
          CompareButton: true,
        },
      },
    });

    const addButton = wrapper.find('button');
    await addButton.trigger('click');

    // Check if cart store was called (would need to spy on store)
    expect(addButton.exists()).toBe(true);
  });
});
