CREATE TABLE IF NOT EXISTS todos (
	td_id          SERIAL PRIMARY KEY,
	td_title       VARCHAR(200) NOT NULL,
	td_description VARCHAR(500),
	td_is_done     BOOLEAN NOT NULL DEFAULT FALSE,
	td_created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	td_updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
