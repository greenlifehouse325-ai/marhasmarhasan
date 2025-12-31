# SMK Marhas - Tutorial: Frontend-Backend Integration

## 1. Overview

Tutorial ini menjelaskan cara mengintegrasikan frontend Next.js dengan backend Nest.js.

---

## 2. Setup API Client

### Install Dependencies
```bash
npm install axios @tanstack/react-query
```

### Create API Instance

**`src/lib/api.ts`**
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try refresh token or redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 3. Setup React Query

**`src/app/providers.tsx`**
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## 4. Create Service Layer

**`src/services/siswa.service.ts`**
```typescript
import api from '@/lib/api';

export const siswaService = {
  getAll: async (params?: any) => {
    const { data } = await api.get('/siswa', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/siswa/${id}`);
    return data.data;
  },

  create: async (payload: any) => {
    const { data } = await api.post('/siswa', payload);
    return data.data;
  },

  update: async (id: string, payload: any) => {
    const { data } = await api.put(`/siswa/${id}`, payload);
    return data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/siswa/${id}`);
  },
};
```

---

## 5. Create Custom Hooks

**`src/hooks/useSiswa.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siswaService } from '@/services/siswa.service';
import { toast } from 'react-hot-toast';

export function useSiswaList(params?: any) {
  return useQuery({
    queryKey: ['siswa', params],
    queryFn: () => siswaService.getAll(params),
  });
}

export function useSiswa(id: string) {
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
      toast.success('Siswa berhasil ditambahkan');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menambahkan siswa');
    },
  });
}

export function useUpdateSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      siswaService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['siswa'] });
      queryClient.invalidateQueries({ queryKey: ['siswa', id] });
      toast.success('Siswa berhasil diupdate');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal mengupdate siswa');
    },
  });
}

export function useDeleteSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siswaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siswa'] });
      toast.success('Siswa berhasil dihapus');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menghapus siswa');
    },
  });
}
```

---

## 6. Use in Page Component

**`src/app/(dashboard)/siswa/page.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { useSiswaList, useDeleteSiswa } from '@/hooks/useSiswa';
import { DataTable, Pagination, FilterBar, Loading, EmptyState } from '@/components/shared';

export default function SiswaPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isLoading, error } = useSiswaList(filters);
  const deleteMutation = useDeleteSiswa();

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.data?.length) return <EmptyState message="Tidak ada data siswa" />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Siswa</h1>
        <Link href="/siswa/create">
          <Button>Tambah Siswa</Button>
        </Link>
      </div>

      <FilterBar
        value={filters.search}
        onChange={(search) => setFilters({ ...filters, search, page: 1 })}
        placeholder="Cari nama/NISN..."
      />

      <DataTable
        columns={[
          { key: 'nis', header: 'NIS' },
          { key: 'name', header: 'Nama' },
          { key: 'kelas.name', header: 'Kelas' },
          { key: 'status', header: 'Status' },
        ]}
        data={data.data}
        actions={(row) => (
          <>
            <Link href={`/siswa/${row.id}`}>
              <Button size="sm">Detail</Button>
            </Link>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                if (confirm('Yakin hapus?')) {
                  deleteMutation.mutate(row.id);
                }
              }}
            >
              Hapus
            </Button>
          </>
        )}
      />

      <Pagination
        currentPage={filters.page}
        totalPages={data.meta.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
    </div>
  );
}
```

---

## 7. Create Form Page

**`src/app/(dashboard)/siswa/create/page.tsx`**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCreateSiswa } from '@/hooks/useSiswa';
import { Input, Select, Button } from '@/components/shared';

interface FormData {
  nisn: string;
  nis: string;
  name: string;
  email: string;
  gender: 'L' | 'P';
  kelasId: string;
}

export default function CreateSiswaPage() {
  const router = useRouter();
  const createMutation = useCreateSiswa();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/siswa');
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Tambah Siswa</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="NISN"
          {...register('nisn', { required: 'NISN wajib diisi' })}
          error={errors.nisn?.message}
        />

        <Input
          label="NIS"
          {...register('nis', { required: 'NIS wajib diisi' })}
          error={errors.nis?.message}
        />

        <Input
          label="Nama"
          {...register('name', { required: 'Nama wajib diisi' })}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register('email')}
        />

        <Select
          label="Jenis Kelamin"
          {...register('gender', { required: 'Pilih jenis kelamin' })}
          options={[
            { value: 'L', label: 'Laki-laki' },
            { value: 'P', label: 'Perempuan' },
          ]}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" loading={isSubmitting}>
            Simpan
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
```

---

## 8. Authentication Integration

**`src/contexts/AuthContext.tsx`**
```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    setUser(data.data.user);
    
    router.push('/dashboard');
  };

  const logout = () => {
    api.post('/auth/logout').catch(() => {});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

---

## 9. Error Handling

```typescript
// Create error handler utility
export function handleApiError(error: any): string {
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (error.response?.data?.error?.details) {
    return error.response.data.error.details
      .map((d: any) => d.message)
      .join(', ');
  }
  return 'Terjadi kesalahan';
}

// Use in components
try {
  await api.post('/siswa', data);
} catch (error) {
  toast.error(handleApiError(error));
}
```

---

## 10. Environment Setup

**`.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/v1
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

**`.env.production`**
```env
NEXT_PUBLIC_API_URL=https://api.marhas.sch.id/v1
NEXT_PUBLIC_WS_URL=wss://api.marhas.sch.id
```

---

## Related Documentation

- [API Client](../06-integration/api-client.md)
- [WebSocket](../06-integration/websocket.md)
- [Backend Setup](./backend-setup.md)
