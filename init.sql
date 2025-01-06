-- postgresql
CREATE SCHEMA IF NOT EXISTS plants;

CREATE TABLE plants.species (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE plants.categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE plants.position_in_house (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TYPE plants.sanity AS ENUM (
	'good',
	'bad',
	'ugly',
	'dead'
);

CREATE TABLE plants.plants (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	species_id INTEGER NOT NULL,
	position_in_house_id INTEGER NOT NULL,
	birthdate DATE NOT NULL,
	image_url VARCHAR NOT NULL,
	sanity plants.sanity NOT NULL,
	weekly_hydration INTEGER NOT NULL,
	categories_id INTEGER NOT NULL,
	commentary TEXT
);

ALTER TABLE plants.plants ADD CONSTRAINT fk_species_id FOREIGN KEY (species_id) REFERENCES plants.species(id);
ALTER TABLE plants.plants ADD CONSTRAINT fk_categories_id FOREIGN KEY (categories_id) REFERENCES plants.categories(id);
ALTER TABLE plants.plants ADD CONSTRAINT fk_position_in_house_id FOREIGN KEY (position_in_house_id) REFERENCES plants.position_in_house(id);

CREATE FUNCTION plants.add_plant(
	_name VARCHAR(100),
	_species VARCHAR(100),
	_position_in_house VARCHAR(100),
	_birthdate DATE,
	_image_url VARCHAR(255),
	_weekly_hydration INTEGER,
	_commentary TEXT,
	_categories VARCHAR(100)
) RETURNS VOID AS $$
BEGIN
	INSERT INTO plants.species (name) VALUES (_species) ON CONFLICT DO NOTHING;
	INSERT INTO plants.categories (name) VALUES (_categories) ON CONFLICT DO NOTHING;
	INSERT INTO plants.position_in_house (name) VALUES (_position_in_house) ON CONFLICT DO NOTHING;
	INSERT INTO plants.plants (name, species_id, categories_id, position_in_house_id, birthdate, image_url, weekly_hydration, commentary, sanity) VALUES (
		_name,
		(SELECT id FROM plants.species WHERE name = _species),
		(SELECT id FROM plants.categories WHERE name = _categories),
		(SELECT id FROM plants.position_in_house WHERE name = _position_in_house),
		_birthdate,
		_image_url,
		_weekly_hydration,
		_commentary,
		'good'
	);
END;
$$ LANGUAGE plpgsql;

CREATE VIEW plants.get_plants AS
SELECT
	p.id,
	p.name,
	s.name AS species,
	c.name AS categories,
	pos.name AS position_in_house,
	AGE(p.birthdate) AS age,
	p.image_url,
	p.sanity,
	p.weekly_hydration,
	p.commentary
FROM plants.plants p
JOIN
	plants.species s
ON
	p.species_id = s.id
JOIN
	plants.categories c
ON
	p.categories_id = c.id
JOIN
	plants.position_in_house pos
ON
	p.position_in_house_id = pos.id;

-- ppostgrest
CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'aRandomPassword';
CREATE ROLE web_anon NOLOGIN;
GRANT web_anon TO authenticator;

GRANT USAGE ON SCHEMA plants TO web_anon;
GRANT SELECT ON plants.get_plants TO web_anon;
GRANT EXECUTE ON FUNCTION plants.add_plant TO web_anon;
GRANT INSERT, SELECT, DELETE ON plants.plants TO web_anon;
GRANT USAGE ON SEQUENCE plants.plants_id_seq TO web_anon;
GRANT INSERT, SELECT ON plants.species TO web_anon;
GRANT USAGE ON SEQUENCE plants.species_id_seq TO web_anon;
GRANT INSERT, SELECT ON plants.categories TO web_anon;
GRANT USAGE ON SEQUENCE plants.categories_id_seq TO web_anon;
GRANT INSERT, SELECT ON plants.position_in_house TO web_anon;
GRANT USAGE ON SEQUENCE plants.position_in_house_id_seq TO web_anon;

