# SMK Marhas Admin - Frontend Integration Guide

## Overview

Panduan integrasi frontend Next.js dengan backend Nest.js API.

---

## Setup API Client

### 1. Install Dependencies

```bash
npm install axios @tanstack/react-query
```

### 2. Create API Client

**`src/lib/api.ts`**

```typescript
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.marhas.sch.id/v1';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        
        localStorage.setItem('accessToken', response.data.accessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## API Service Layer

### AuthService

**`src/services/auth.service.ts`**

```typescript
import { api } from '@/lib/api';
import { LoginRequest, AuthResponse, User } from '@/types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    
    // Store tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },
};
```

### SiswaService

**`src/services/siswa.service.ts`**

```typescript
import { api } from '@/lib/api';
import { Siswa, CreateSiswaRequest, PaginatedResponse } from '@/types';

interface SiswaFilters {
  page?: number;
  limit?: number;
  kelas?: string;
  jurusan?: string;
  status?: string;
  search?: string;
}

export const siswaService = {
  async getAll(filters?: SiswaFilters): Promise<PaginatedResponse<Siswa>> {
    const response = await api.get('/siswa', { params: filters });
    return response.data;
  },

  async getById(id: string): Promise<Siswa> {
    const response = await api.get(`/siswa/${id}`);
    return response.data;
  },

  async create(data: CreateSiswaRequest): Promise<Siswa> {
    const response = await api.post('/siswa', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateSiswaRequest>): Promise<Siswa> {
    const response = await api.put(`/siswa/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/siswa/${id}`);
  },

  async import(file: File): Promise<{ success: number; failed: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/siswa/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async export(format: 'xlsx' | 'pdf', filters?: SiswaFilters): Promise<Blob> {
    const response = await api.get('/siswa/export', {
      params: { format, ...filters },
      responseType: 'blob',
    });
    return response.data;
  },
};
```

---

## React Query Integration

### Setup Provider

**`src/providers/QueryProvider.tsx`**

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Custom Hooks

**`src/hooks/useSiswa.ts`**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siswaService } from '@/services/siswa.service';

export function useSiswaList(filters?: SiswaFilters) {
  return useQuery({
    queryKey: ['siswa', filters],
    queryFn: () => siswaService.getAll(filters),
  });
}

export function useSiswaDetail(id: string) {
  return useQuery({
    queryKey: ['siswa', id],
    queryFn: () => siswaService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSiswa() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: siswaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siswa'] });
    },
  });
}

export function useUpdateSiswa() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateSiswaRequest> }) =>
      siswaService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['siswa'] });
      queryClient.invalidateQueries({ queryKey: ['siswa', variables.id] });
    },
  });
}

export function useDeleteSiswa() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: siswaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siswa'] });
    },
  });
}
```

---

## Usage Examples

### List Page with Filtering

```tsx
'use client';

import { useState } from 'react';
import { useSiswaList } from '@/hooks/useSiswa';

export default function SiswaPage() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, isLoading, error } = useSiswaList(filters);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {/* Filters */}
      <SiswaFilters onChange={setFilters} />
      
      {/* Table */}
      <SiswaTable data={data?.items || []} />
      
      {/* Pagination */}
      <Pagination 
        meta={data?.meta} 
        onChange={(page) => setFilters({ ...filters, page })} 
      />
    </div>
  );
}
```

### Create Form

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCreateSiswa } from '@/hooks/useSiswa';
import { useToast } from '@/components/shared/Toast';

export default function CreateSiswaPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const createMutation = useCreateSiswa();

  const handleSubmit = async (data: CreateSiswaRequest) => {
    try {
      await createMutation.mutateAsync(data);
      showToast('success', 'Siswa berhasil ditambahkan');
      router.push('/siswa');
    } catch (error) {
      showToast('error', 'Gagal menambahkan siswa');
    }
  };

  return (
    <SiswaForm 
      onSubmit={handleSubmit} 
      isSubmitting={createMutation.isPending} 
    />
  );
}
```

---

## Environment Variables

**`.env.local`**

```env
NEXT_PUBLIC_API_URL=https://api.marhas.sch.id/v1
NEXT_PUBLIC_APP_NAME=SMK Marhas Admin
```

**`.env.production`**

```env
NEXT_PUBLIC_API_URL=https://api.marhas.sch.id/v1
```

---

## Error Handling

### Global Error Handler

```typescript
// src/lib/error-handler.ts
import { AxiosError } from 'axios';

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{ field: string; message: string }>;
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data?.error as ApiError;
    
    if (apiError?.details?.length) {
      return apiError.details.map(d => d.message).join(', ');
    }
    
    return apiError?.message || 'Terjadi kesalahan pada server';
  }
  
  return 'Terjadi kesalahan yang tidak diketahui';
}
```

---

## File Upload

```typescript
// Upload with progress
async function uploadWithProgress(
  file: File,
  onProgress: (percent: number) => void
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      onProgress(percent);
    },
  });

  return response.data.url;
}
```

---

## Real-time Updates (WebSocket)

```typescript
// src/lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function connectSocket(token: string) {
  socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  return socket;
}

export function subscribeToNotifications(callback: (data: any) => void) {
  socket?.on('notification', callback);
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
```
