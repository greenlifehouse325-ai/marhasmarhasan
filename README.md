# 🎨 Marhas Admin Panel

Frontend Admin Panel menggunakan **Next.js 15** dengan TypeScript dan Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy template environment
cp .env.local.example .env.local

# Edit sesuai kebutuhan (pastikan backend URL benar)
```

### 3. Run Development Server
```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

---

## 📁 Struktur Folder

```
next.js_admin/
├── src/
│   ├── app/              # App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── lib/
│       └── api.ts        # API client untuk backend
├── public/               # Static assets
├── .env.local            # Environment variables (jangan commit!)
└── .env.local.example    # Template environment
```

---

## 🔧 Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL backend API | `http://localhost:3001/api` |

---

## 📝 Available Scripts

```bash
# Development
npm run dev           # Run dengan hot-reload (http://localhost:3000)

# Production
npm run build         # Build production
npm run start         # Start production server

# Linting
npm run lint          # Run ESLint
```

---

## 🔗 Integrasi dengan Backend

### Menggunakan API Client

```typescript
import api from '@/lib/api';

// GET request
const data = await api.get<UserType>('/users');

// POST request
const newUser = await api.post<UserType>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT request
await api.put('/users/1', { name: 'Jane Doe' });

// DELETE request
await api.delete('/users/1');
```

### Error Handling

```typescript
import api, { ApiError } from '@/lib/api';

try {
  const data = await api.get('/protected');
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status);      // 401
    console.log(error.message);     // "Unauthorized"
  }
}
```

---

## 🎨 Styling dengan Tailwind CSS

Tailwind CSS sudah terkonfigurasi. Gunakan utility classes langsung:

```tsx
export default function Card() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800">
        Title
      </h2>
    </div>
  );
}
```

---

## 🛡️ Best Practices

1. ⚠️ **Jangan commit file `.env.local`** - Sudah di-ignore di .gitignore
2. 🔐 **Gunakan environment variables** untuk semua konfigurasi sensitif
3. 📱 **Responsive design** - Gunakan Tailwind breakpoints (sm, md, lg, xl)
4. 🔄 **Type safety** - Definisikan types untuk semua API responses

---

## 📚 Dokumentasi Tambahan

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
