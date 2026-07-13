-- Recommended schema for 7asbty (PostgreSQL).
-- Pair with an ORM such as Prisma or Drizzle. The current codebase reads
-- calculator/SEO content from lib/calculators.js as static data; migrating
-- to these tables lets the admin dashboard persist changes without a redeploy.

CREATE TABLE calculators (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(80) UNIQUE NOT NULL,
  category      VARCHAR(40) NOT NULL,
  icon          VARCHAR(40) NOT NULL,
  is_popular    BOOLEAN DEFAULT FALSE,
  is_premium    BOOLEAN DEFAULT FALSE,
  status        VARCHAR(20) DEFAULT 'published', -- draft | published
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE calculator_translations (
  id             SERIAL PRIMARY KEY,
  calculator_id  INTEGER REFERENCES calculators(id) ON DELETE CASCADE,
  locale         VARCHAR(5) NOT NULL, -- 'en' | 'ar'
  name           VARCHAR(120) NOT NULL,
  h1             VARCHAR(160) NOT NULL,
  intro          TEXT NOT NULL,
  meta_title     VARCHAR(160) NOT NULL,
  meta_description VARCHAR(300) NOT NULL,
  keywords       TEXT[], -- comma-separated or normalized to a join table
  UNIQUE (calculator_id, locale)
);

CREATE TABLE calculator_faqs (
  id             SERIAL PRIMARY KEY,
  calculator_id  INTEGER REFERENCES calculators(id) ON DELETE CASCADE,
  locale         VARCHAR(5) NOT NULL,
  question       VARCHAR(300) NOT NULL,
  answer         TEXT NOT NULL,
  sort_order     INTEGER DEFAULT 0
);

CREATE TABLE page_views (
  id             BIGSERIAL PRIMARY KEY,
  calculator_id  INTEGER REFERENCES calculators(id) ON DELETE SET NULL,
  path           VARCHAR(255) NOT NULL,
  locale         VARCHAR(5) NOT NULL,
  referrer       VARCHAR(255),
  country        VARCHAR(2),
  viewed_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  email          VARCHAR(255) UNIQUE NOT NULL,
  password_hash  VARCHAR(255), -- null if using OAuth-only
  is_premium     BOOLEAN DEFAULT FALSE,
  stripe_customer_id VARCHAR(100),
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(100) UNIQUE,
  status         VARCHAR(20), -- active | canceled | past_due
  current_period_end TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_page_views_calculator ON page_views(calculator_id);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX idx_translations_locale ON calculator_translations(locale);
