-- postgresql
CREATE SCHEMA IF NOT EXISTS plants;

CREATE TABLE plants.species (
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
	commentary TEXT
);

ALTER TABLE plants.plants ADD CONSTRAINT fk_species_id FOREIGN KEY (species_id) REFERENCES plants.species(id);
ALTER TABLE plants.plants ADD CONSTRAINT fk_position_in_house_id FOREIGN KEY (position_in_house_id) REFERENCES plants.position_in_house(id);

CREATE FUNCTION plants.add_plant(
	_name VARCHAR(100),
	_species VARCHAR(100),
	_position_in_house VARCHAR(100),
	_birthdate DATE,
	_image_url VARCHAR(255),
	_weekly_hydration INTEGER,
	_commentary TEXT
) RETURNS VOID AS $$
BEGIN
	INSERT INTO plants.species (name) VALUES (_species) ON CONFLICT DO NOTHING;
	INSERT INTO plants.position_in_house (name) VALUES (_position_in_house) ON CONFLICT DO NOTHING;
	INSERT INTO plants.plants (name, species_id, position_in_house_id, birthdate, image_url, weekly_hydration, commentary, sanity) VALUES (
		_name,
		(SELECT id FROM plants.species WHERE name = _species),
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
	plants.position_in_house pos
ON
	p.position_in_house_id = pos.id;

