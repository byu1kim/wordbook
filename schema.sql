DROP DATABASE IF EXISTS wordbook;
CREATE DATABASE wordbook;
USE wordbook;


CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checked BOOL NOT NULL DEFAULT false,
    eng TEXT NOT NULL,
    kor TEXT NOT NULL,
    created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);






-- Change a database
ALTER DATABASE wordbook
  CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci; 

-- Change a table
ALTER TABLE words 
  CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

-- Change a column
ALTER TABLE words
  CHANGE kor VARCHAR(255) 
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


