-- Supabase database schema for NIKOO Art Studio
-- Run this in your Supabase SQL editor or database migration tool.

-- Enable UUID generation if not already enabled
create extension if not exists "pgcrypto";

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ideas table
create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  prompt text not null,
  concept text,
  color_palette text[] default array[]::text[],
  style_direction text,
  typography text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Palettes table
create table if not exists palettes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  name text not null,
  colors text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Inspirations table
create table if not exists inspirations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Optional: Add row-level security policies if using Supabase Auth
-- alter table projects enable row level security;
-- alter table ideas enable row level security;
-- alter table palettes enable row level security;
-- alter table inspirations enable row level security;
