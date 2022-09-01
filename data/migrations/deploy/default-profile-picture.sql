-- Deploy o-book:default-profile-picture to pg

BEGIN;

UPDATE "user" 
SET "profile_picture"='https://res.cloudinary.com/obook/image/upload/v1661345211/nl2gtqzgbnqyo5ilgzfz.jpg'
WHERE "profile_picture" IS NULL;

ALTER TABLE "user"
ALTER COLUMN "profile_picture"
SET DEFAULT 'https://res.cloudinary.com/obook/image/upload/v1661345211/nl2gtqzgbnqyo5ilgzfz.jpg';

COMMIT;
