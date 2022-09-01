-- Revert o-book:default-profile-picture from pg

BEGIN;

UPDATE "user" 
SET "profile_picture"=null
WHERE "profile_picture"='https://res.cloudinary.com/obook/image/upload/v1661345211/nl2gtqzgbnqyo5ilgzfz.jpg';

ALTER TABLE "user"
ALTER COLUMN "profile_picture"
DROP DEFAULT;

COMMIT;
