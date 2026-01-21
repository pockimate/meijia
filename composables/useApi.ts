// API Base Configuration
export const useApi = () => {
  const config = useRuntimeConfig();
  
  // API Base URL (可以从环境变量配置)
  const baseURL = config.public.apiUrl || 'http://localhost:3001/api';
  
  // 模拟延迟（毫秒）
  const MOCK_DELAY = 800;
  
  // 模拟网络延迟
  const delay = (ms: number = MOCK_DELAY) => 
    new Promise(resolve => setTimeout(resolve, ms));
  
  // 模拟随机错误（用于测试）
  const shouldSimulateError = (errorRate: number = 0.05) => 
    Math.random() < errorRate;
  
  // API 响应包装器
  interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number;
    success: boolean;
  }
  
  // 创建成功响应
  const createSuccessResponse = <T>(data: T, status: number = 200): ApiResponse<T> => ({
    data,
    error: null,
    status,
    success: true,
  });
  
  // 创建错误响应
  const createErrorResponse = <T>(error: string, status: number = 500): ApiResponse<T> => ({
    data: null,
    error,
    status,
    success: false,
  });
  
  // 通用 API 请求方法
  const request = async <T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      body?: any;
      headers?: Record<string, string>;
      mockData?: T;
      mockError?: string;
      skipDelay?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> => {
    const {
      method = 'GET',
      body,
      headers = {},
      mockData,
      mockError,
      skipDelay = false,
    } = options;
    
    try {
      // 模拟网络延迟
      if (!skipDelay) {
        await delay();
      }
      
      // 模拟随机错误
      if (shouldSimulateError() || mockError) {
        throw new Error(mockError || 'Network error occurred');
      }
      
      // 在真实环境中，这里会使用 $fetch
      // const response = await $fetch<T>(`${baseURL}${endpoint}`, {
      //   method,
      //   body,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...headers,
      //   },
      // });
      
      // 模拟环境：返回 mockData
      if (mockData !== undefined) {
        return createSuccessResponse(mockData);
      }
      
      throw new Error('No mock data provided');
    } catch (error: any) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      return createErrorResponse(error.message || 'Unknown error occurred');
    }
  };
  
  // GET 请求
  const get = <T>(endpoint: string, mockData?: T) =>
    request<T>(endpoint, { method: 'GET', mockData });
  
  // POST 请求
  const post = <T>(endpoint: string, body: any, mockData?: T) =>
    request<T>(endpoint, { method: 'POST', body, mockData });
  
  // PUT 请求
  const put = <T>(endpoint: string, body: any, mockData?: T) =>
    request<T>(endpoint, { method: 'PUT', body, mockData });
  
  // DELETE 请求
  const del = <T>(endpoint: string, mockData?: T) =>
    request<T>(endpoint, { method: 'DELETE', mockData });
  
  // PATCH 请求
  const patch = <T>(endpoint: string, body: any, mockData?: T) =>
    request<T>(endpoint, { method: 'PATCH', body, mockData });
  
  return {
    baseURL,
    request,
    get,
    post,
    put,
    delete: del,
    patch,
  };
};
