CREATE TABLE family_members(
    group_id UUID REFERENCES family_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK(role IN('OWNER','MEMBER')),

    PRIMARY KEY(group_id,user_id)
);