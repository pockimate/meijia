import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ToastContainer from '~/components/ToastContainer.vue';
import { useToastStore } from '~/stores/toast';

describe('ToastContainer', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render without toasts', () => {
    const wrapper = mount(ToastContainer);
    
    expect(wrapper.find('.toast').exists()).toBe(false);
  });

  it('should display success toast', async () => {
    const wrapper = mount(ToastContainer);
    const store = useToastStore();
    
    store.success('Success message');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Success message');
  });

  it('should display error toast', async () => {
    const wrapper = mount(ToastContainer);
    const store = useToastStore();
    
    store.error('Error message');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Error message');
  });

  it('should display warning toast', async () => {
    const wrapper = mount(ToastContainer);
    const store = useToastStore();
    
    store.warning('Warning message');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Warning message');
  });

  it('should display info toast', async () => {
    const wrapper = mount(ToastContainer);
    const store = useToastStore();
    
    store.info('Info message');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Info message');
  });

  it('should remove toast when dismissed', async () => {
    const wrapper = mount(ToastContainer);
    const store = useToastStore();
    
    store.success('Test message');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Test message');
    
    // Find and click close button
    const closeButton = wrapper.find('button');
    await closeButton.trigger('click');
    
    expect(wrapper.text()).not.toContain('Test message');
  });
});
