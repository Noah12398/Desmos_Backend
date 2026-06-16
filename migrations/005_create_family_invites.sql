CREATE TABLE family_invites(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES family_groups(id) ON DELETE CASCADE,
    invited_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invited_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK(status IN('PENDING','ACCEPTED','REJECTED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);