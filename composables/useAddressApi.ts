import type { Address } from '~/types';

export interface CreateAddressData {
  userId: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export const useAddressApi = () => {
  const api = useApi();
  
  // 获取用户地址列表
  const getUserAddresses = async (userId: number) => {
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      if (addressesData) {
        const allAddresses: Address[] = JSON.parse(addressesData);
        const userAddresses = allAddresses.filter(a => a.userId === userId);
        
        return api.get(`/users/${userId}/addresses`, userAddresses);
      }
    }
    
    return api.get(`/users/${userId}/addresses`, []);
  };
  
  // 创建地址
  const createAddress = async (data: CreateAddressData) => {
    const newAddress: Address = {
      id: Math.floor(Math.random() * 10000),
      userId: data.userId,
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: data.isDefault || false,
    };
    
    // 保存到 localStorage
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      const addresses: Address[] = addressesData ? JSON.parse(addressesData) : [];
      
      // 如果设置为默认，取消其他地址的默认状态
      if (newAddress.isDefault) {
        addresses.forEach(a => {
          if (a.userId === newAddress.userId) {
            a.isDefault = false;
          }
        });
      }
      
      addresses.push(newAddress);
      localStorage.setItem('astro_addresses', JSON.stringify(addresses));
    }
    
    return api.post('/addresses', data, newAddress);
  };
  
  // 更新地址
  const updateAddress = async (addressId: number, data: Partial<CreateAddressData>) => {
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      if (addressesData) {
        const addresses: Address[] = JSON.parse(addressesData);
        const addressIndex = addresses.findIndex(a => a.id === addressId);
        
        if (addressIndex !== -1) {
          // 如果设置为默认，取消其他地址的默认状态
          if (data.isDefault) {
            addresses.forEach((a, i) => {
              if (a.userId === addresses[addressIndex].userId && i !== addressIndex) {
                a.isDefault = false;
              }
            });
          }
          
          addresses[addressIndex] = {
            ...addresses[addressIndex],
            ...data,
          };
          
          localStorage.setItem('astro_addresses', JSON.stringify(addresses));
          
          return api.put(`/addresses/${addressId}`, data, addresses[addressIndex]);
        }
      }
    }
    
    return api.put<Address>(`/addresses/${addressId}`, data, undefined);
  };
  
  // 删除地址
  const deleteAddress = async (addressId: number) => {
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      if (addressesData) {
        const addresses: Address[] = JSON.parse(addressesData);
        const filteredAddresses = addresses.filter(a => a.id !== addressId);
        localStorage.setItem('astro_addresses', JSON.stringify(filteredAddresses));
      }
    }
    
    return api.delete(`/addresses/${addressId}`, {
      success: true,
      message: 'Address deleted successfully',
    });
  };
  
  // 设置默认地址
  const setDefaultAddress = async (userId: number, addressId: number) => {
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      if (addressesData) {
        const addresses: Address[] = JSON.parse(addressesData);
        
        addresses.forEach(a => {
          if (a.userId === userId) {
            a.isDefault = a.id === addressId;
          }
        });
        
        localStorage.setItem('astro_addresses', JSON.stringify(addresses));
        
        const defaultAddress = addresses.find(a => a.id === addressId);
        return api.patch(`/addresses/${addressId}/default`, {}, defaultAddress);
      }
    }
    
    return api.patch<Address>(`/addresses/${addressId}/default`, {}, undefined);
  };
  
  // 获取默认地址
  const getDefaultAddress = async (userId: number) => {
    if (process.client) {
      const addressesData = localStorage.getItem('astro_addresses');
      if (addressesData) {
        const addresses: Address[] = JSON.parse(addressesData);
        const defaultAddress = addresses.find(a => a.userId === userId && a.isDefault);
        
        if (defaultAddress) {
          return api.get(`/users/${userId}/addresses/default`, defaultAddress);
        }
      }
    }
    
    return api.get<Address>(`/users/${userId}/addresses/default`, undefined);
  };
  
  return {
    getUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress,
  };
};
