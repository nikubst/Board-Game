# NIKOO Art Studio

A creative web platform for graphic designers to generate ideas, manage projects, and build color palettes.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x (recommended)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Set up Supabase database**
   
   Create the following tables in your Supabase project:
   - `projects` - For project management
   - `ideas` - For generated design ideas
   - `palettes` - For color palettes
   - `inspirations` - For inspiration gallery (optional)

   You can use the provided SQL schema file:
   ```bash
   supabase db query < supabase_schema.sql
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nikoo-art-studio/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Dashboard pages
│   └── page.tsx                  # Landing page
├── components/                   # React components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── services/                     # Service layer
├── types/                        # TypeScript types
├── middleware.ts                 # Next.js middleware
└── package.json                  # Project dependencies
```

## 🎨 Features

- **Idea Generator**: Transform text prompts into detailed design concepts
- **Project Management**: Create, edit, and organize creative projects
- **Color Palette Tool**: Create, save, and organize beautiful color combinations
- **Inspiration Gallery**: Browse curated design inspiration
- **Authentication**: Email/password login with protected routes
- **Dark Mode**: Modern dark theme by default

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Database & Auth)

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License
