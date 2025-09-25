create extension if not exists pgcrypto;

create table if not exists categories(
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null
);

create table if not exists vendors(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_email text,
  rating numeric default 0
);

create table if not exists products(
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references vendors(id) on delete set null,
  category text,
  slug text unique,
  title text not null,
  price numeric not null,
  image text,
  images jsonb,
  description text,
  tag text,
  stock int default 100,
  created_at timestamptz default now()
);

create table if not exists reviews(
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  author text,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create table if not exists orders(
  id uuid primary key default gen_random_uuid(),
  email text not null,
  items jsonb not null,
  total numeric not null,
  status text not null default 'pending',
  payment_method text, -- crypto | bank | card
  reference text,
  txid text,
  created_at timestamptz default now()
);

create table if not exists partners(
  id uuid primary key default gen_random_uuid(),
  type text not null, -- vendor | carrier | integrator | affiliate
  name text,
  email text,
  created_at timestamptz default now()
);

create table if not exists loyalty(
  id uuid primary key default gen_random_uuid(),
  email text not null,
  points int default 0,
  updated_at timestamptz default now()
);

create table if not exists referrals(
  id uuid primary key default gen_random_uuid(),
  code text unique,
  referred_email text,
  reward_points int default 0,
  created_at timestamptz default now()
);

create table if not exists event_logs(
  id uuid primary key default gen_random_uuid(),
  event text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table products enable row level security;
create policy "public select products" on products for select using (true);

alter table reviews enable row level security;
create policy "public select reviews" on reviews for select using (true);
create policy "public insert reviews" on reviews for insert with check (true);

alter table orders enable row level security;
create policy "public insert orders" on orders for insert with check (true);
create policy "public select orders" on orders for select using (true);
create policy "public update orders" on orders for update using (true);

alter table partners enable row level security;
create policy "public insert partners" on partners for insert with check (true);
create policy "public select partners" on partners for select using (true);

alter table loyalty enable row level security;
create policy "public upsert loyalty" on loyalty for insert with check (true);
create policy "public select loyalty" on loyalty for select using (true);
create policy "public update loyalty" on loyalty for update using (true);

alter table referrals enable row level security;
create policy "public insert referrals" on referrals for insert with check (true);
create policy "public select referrals" on referrals for select using (true);

alter table event_logs enable row level security;
create policy "public insert logs" on event_logs for insert with check (true);

-- Seeds
insert into categories(slug,title) values
('epicerie','Épicerie'),('cosmetique','Cosmétique'),('maison','Maison & Jardin'),('mode','Mode'),('hightech','High-Tech')
on conflict do nothing;

insert into vendors(name, contact_email, rating) values
('Atelier Caraïbe','contact@atelier-caraibe.com',4.7),
('Distrib Martinique','sales@distrib-mq.com',4.2)
on conflict do nothing;

insert into products (vendor_id, category, slug, title, price, image, description, tag, stock) values
((select id from vendors limit 1),'epicerie','epices-colombo-premium','Épices Colombo Premium – 250g',8.90,'https://images.unsplash.com/photo-1604908554150-24bd7a4d67c2?q=80&w=800','Mélange caribéen authentique fabriqué en Martinique.','local',500),
((select id from vendors limit 1),'cosmetique','huile-coco-cosmetique-bio','Huile de Coco Cosmétique – 200ml',12.90,'https://images.unsplash.com/photo-1524594224083-10d9b3a6d21f?q=80&w=800','Huile vierge de coco pour peau et cheveux.','local',300),
((select id from vendors limit 1),'hightech','casque-bluetooth-ikabay','Casque Bluetooth – Réduction de bruit',59.90,'https://images.unsplash.com/photo-1518444080608-dbe5a1f0f0a1?q=80&w=800','Casque sans fil haute autonomie.','import',100)
on conflict do nothing;