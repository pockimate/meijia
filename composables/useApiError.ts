// API 错误处理
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export const useApiError = () => {
  const { useToastStore } = {
    useToastStore: () => {
      if (process.client) {
        return import('~/stores/toast').then(m => m.useToastStore());
      }
      return null;
    }
  };
  
  // 错误消息映射
  const errorMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'Access denied. You don\'t have permission.',
    404: 'Resource not found.',
    409: 'Conflict. Resource already exists.',
    422: 'Validation error. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Service temporarily unavailable.',
    503: 'Service unavailable. Please try again later.',
  };
  
  // 处理 API 错误
  const handleError = async (error: ApiError, showToast: boolean = true) => {
    console.error('API Error:', error);
    
    // 获取错误消息
    const message = error.message || 
                   (error.status ? errorMessages[error.status] : undefined) ||
                   'An unexpected error occurred';
    
    // 显示 toast 通知
    if (showToast && process.client) {
      const toastStore = await useToastStore();
      if (toastStore) {
        toastStore.error(message);
      }
    }
    
    // 特殊错误处理
    if (error.status === 401) {
      // 未授权，清除认证信息并跳转到登录页
      if (process.client) {
        localStorage.removeItem('astro_auth');
        window.location.href = '/auth/login';
      }
    }
    
    return {
      error: true,
      message,
      code: error.code,
      status: error.status,
    };
  };
  
  // 创建错误对象
  const createError = (
    message: string,
    status?: number,
    code?: string,
    details?: any
  ): ApiError => ({
    message,
    status,
    code,
    details,
  });
  
  // 验证错误
  const isValidationError = (error: ApiError) => error.status === 422;
  
  // 认证错误
  const isAuthError = (error: ApiError) => 
    error.status === 401 || error.status === 403;
  
  // 网络错误
  const isNetworkError = (error: ApiError) => 
    error.status === 502 || error.status === 503 || !error.status;
  
  // 服务器错误
  const isServerError = (error: ApiError) => 
    error.status ? error.status >= 500 : false;
  
  return {
    handleError,
    createError,
    isValidationError,
    isAuthError,
    isNetworkError,
    isServerError,
    errorMessages,
  };
};
