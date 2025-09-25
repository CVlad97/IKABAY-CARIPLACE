```sql
create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  story text,
  photo_url text,
  created_at timestamp with time zone default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  integration_type text check (integration_type in ('autods','zendrop')),
  source_url text,
  created_at timestamp with time zone default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price_cents integer not null,
  origin text check (origin in ('local','import')) not null,
  vendor_id uuid references vendors(id),
  supplier_id uuid references suppliers(id),
  created_at timestamp with time zone default now()
);