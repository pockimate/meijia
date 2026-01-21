export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客户端运行
  if (process.client) {
    const adminData = localStorage.getItem('astro_admin');
    
    if (!adminData) {
      return navigateTo('/admin/login');
    }
    
    const { isAdmin } = JSON.parse(adminData);
    
    if (!isAdmin) {
      return navigateTo('/admin/login');
    }
  }
});
