# SMK Marhas - Frontend Integration: API Client

## 1. Axios Setup

**`src/lib/api.ts`**
```typescript
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors & token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const message = (error.response?.data as any)?.error?.message || 'Terjadi kesalahan';
    return Promise.reject(new Error(message));
  }
);

export default api;
```

---

## 2. API Service Layer

**`src/services/auth.service.ts`**
```typescript
import api from '@/lib/api';
import { LoginCredentials, LoginResponse, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post('/auth/login', credentials);
    return data.data;
  },

  async verify2FA(tempToken: string, otp: string): Promise<LoginResponse> {
    const { data } = await api.post('/auth/2fa/verify', { tempToken, otp });
    return data.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },
};
```

**`src/services/siswa.service.ts`**
```typescript
import api from '@/lib/api';
import { Student, PaginatedResponse, FilterParams } from '@/types/shared';
import { CreateSiswaDto, UpdateSiswaDto } from '@/types/siswa';

export const siswaService = {
  async getAll(params?: FilterParams): Promise<PaginatedResponse<Student>> {
    const { data } = await api.get('/siswa', { params });
    return data;
  },

  async getById(id: string): Promise<Student> {
    const { data } = await api.get(`/siswa/${id}`);
    return data.data;
  },

  async create(dto: CreateSiswaDto): Promise<Student> {
    const { data } = await api.post('/siswa', dto);
    return data.data;
  },

  async update(id: string, dto: UpdateSiswaDto): Promise<Student> {
    const { data } = await api.put(`/siswa/${id}`, dto);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/siswa/${id}`);
  },

  async export(params?: FilterParams): Promise<Blob> {
    const { data } = await api.get('/siswa/export', {
      params,
      responseType: 'blob',
    });
    return data;
  },

  async import(file: File): Promise<{ success: number; failed: number; errors: any[] }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/siswa/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
};
```

---

## 3. React Query Hooks

**`src/hooks/useSiswa.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siswaService } from '@/services/siswa.service';
import { FilterParams, Student } from '@/types';
import { toast } from 'react-hot-toast';

// Query keys
export const siswaKeys = {
  all: ['siswa'] as const,
  lists: () => [...siswaKeys.all, 'list'] as const,
  list: (filters: FilterParams) => [...siswaKeys.lists(), filters] as const,
  details: () => [...siswaKeys.all, 'detail'] as const,
  detail: (id: string) => [...siswaKeys.details(), id] as const,
};

// Get list with pagination
export function useSiswaList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: siswaKeys.list(filters),
    queryFn: () => siswaService.getAll(filters),
    keepPreviousData: true,
  });
}

// Get single siswa
export function useSiswa(id: string) {
  return useQuery({
    queryKey: siswaKeys.detail(id),
    queryFn: () => siswaService.getById(id),
    enabled: !!id,
  });
}

// Create siswa
export function useCreateSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siswaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(siswaKeys.lists());
      toast.success('Siswa berhasil ditambahkan');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Update siswa
export function useUpdateSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSiswaDto }) =>
      siswaService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(siswaKeys.detail(id));
      queryClient.invalidateQueries(siswaKeys.lists());
      toast.success('Siswa berhasil diupdate');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Delete siswa
export function useDeleteSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siswaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(siswaKeys.lists());
      toast.success('Siswa berhasil dihapus');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
```

---

## 4. Component Usage

**`src/app/(dashboard)/siswa/page.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { useSiswaList, useDeleteSiswa } from '@/hooks/useSiswa';
import { DataTable, Pagination, FilterBar } from '@/components/shared';

export default function SiswaPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: 'active',
  });

  const { data, isLoading, error } = useSiswaList(filters);
  const deleteMutation = useDeleteSiswa();

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus siswa ini?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <PageHeader title="Data Siswa" />
      
      <FilterBar
        onSearch={handleSearch}
        filters={[
          { key: 'status', options: ['active', 'inactive', 'graduated'] },
          { key: 'kelasId', type: 'select', options: kelasOptions },
        ]}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
      />

      <DataTable
        data={data.data}
        columns={columns}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={filters.page}
        totalPages={data.meta.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

---

## 5. Error Handling

```typescript
// Global error handler
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    
    // Validation errors
    if (data?.error?.details) {
      return data.error.details
        .map((d: any) => `${d.field}: ${d.message}`)
        .join(', ');
    }

    // General error
    return data?.error?.message || 'Terjadi kesalahan pada server';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Terjadi kesalahan tidak diketahui';
}

// Usage
try {
  await siswaService.create(data);
} catch (error) {
  const message = handleApiError(error);
  toast.error(message);
}
```

---

## 6. Environment Variables

**`.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/v1
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## Related Documentation

- [WebSocket Integration](./websocket.md)
- [File Upload Integration](./file-upload.md)
- [State Management](./state-management.md)
