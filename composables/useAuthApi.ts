import type { User } from '~/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  zodiacSign?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export const useAuthApi = () => {
  const api = useApi();
  
  // 登录
  const login = async (credentials: LoginCredentials) => {
    // 模拟登录验证
    const mockUser: User = {
      id: Math.floor(Math.random() * 10000),
      email: credentials.email,
      name: credentials.email.split('@')[0],
      zodiacSign: 'Aries',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(7);
    
    const response: AuthResponse = {
      user: mockUser,
      token: mockToken,
      expiresIn: 3600, // 1 hour
    };
    
    return api.post('/auth/login', credentials, response);
  };
  
  // 注册
  const register = async (data: RegisterData) => {
    // 模拟注册
    const mockUser: User = {
      id: Math.floor(Math.random() * 10000),
      email: data.email,
      name: data.name,
      zodiacSign: data.zodiacSign,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(7);
    
    const response: AuthResponse = {
      user: mockUser,
      token: mockToken,
      expiresIn: 3600,
    };
    
    return api.post('/auth/register', data, response);
  };
  
  // 登出
  const logout = async () => {
    return api.post('/auth/logout', {}, { success: true });
  };
  
  // 获取当前用户
  const getCurrentUser = async () => {
    // 从 localStorage 获取用户信息
    if (process.client) {
      const authData = localStorage.getItem('astro_auth');
      if (authData) {
        const { user } = JSON.parse(authData);
        return api.get('/auth/me', user);
      }
    }
    
    return api.get<User>('/auth/me', undefined);
  };
  
  // 更新用户资料
  const updateProfile = async (userId: number, data: Partial<User>) => {
    const updatedUser: User = {
      id: userId,
      email: data.email || '',
      name: data.name || '',
      zodiacSign: data.zodiacSign,
      avatar: data.avatar,
      createdAt: new Date().toISOString(),
    };
    
    return api.put(`/auth/users/${userId}`, data, updatedUser);
  };
  
  // 修改密码
  const changePassword = async (oldPassword: string, newPassword: string) => {
    return api.post('/auth/change-password', { oldPassword, newPassword }, {
      success: true,
      message: 'Password changed successfully',
    });
  };
  
  // 重置密码请求
  const requestPasswordReset = async (email: string) => {
    return api.post('/auth/forgot-password', { email }, {
      success: true,
      message: 'Password reset email sent',
    });
  };
  
  // 验证 token
  const verifyToken = async (token: string) => {
    return api.post('/auth/verify-token', { token }, {
      valid: true,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    });
  };
  
  return {
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    requestPasswordReset,
    verifyToken,
  };
};
