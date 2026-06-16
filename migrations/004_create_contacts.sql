CREATE TABLE contacts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phone_hash TEXT NOT NULL,
    display_name TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_owner_user_id_phone_hash ON contacts(owner_user_id,phone_hash);
CREATE INDEX idx_contacts_phone_hash ON contacts(phone_hash);
