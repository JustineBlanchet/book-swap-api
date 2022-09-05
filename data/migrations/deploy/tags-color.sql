-- Deploy o-book:tags-color to pg

BEGIN;

ALTER TABLE "tag" 
ADD COLUMN "color" TEXT DEFAULT NULL;

ALTER TABLE "tag" 
ADD COLUMN "hover" TEXT DEFAULT NULL;

UPDATE "tag"
SET 
    "color" = 'bg-sky-600',
    "hover" = 'hover:bg-sky-700'
WHERE "label" = 'Romans';

UPDATE "tag"
SET 
    "color" = 'bg-red-600',
    "hover" = 'hover:bg-red-700'
WHERE "label" = 'Science-Fiction & Fantasy';

UPDATE "tag"
SET 
    "color" = 'bg-gray-800',
    "hover" = 'hover:bg-gray-900'
WHERE "label" = 'Polar & Thriller';

UPDATE "tag"
SET 
    "color" = 'bg-amber-400',
    "hover" = 'hover:bg-amber-500'
WHERE "label" = 'BD & Manga';

UPDATE "tag"
SET 
    "color" = 'bg-yellow-800',
    "hover" = 'hover:bg-yellow-900'
WHERE "label" = 'Littérature classique';

UPDATE "tag"
SET 
    "color" = 'bg-fuchsia-500',
    "hover" = 'hover:bg-fuchsia-600'
WHERE "label" = 'Enfants & Jeunesse';

UPDATE "tag"
SET 
    "color" = 'bg-green-600',
    "hover" = 'hover:bg-green-700'
WHERE "label" = 'Savoir';

UPDATE "tag"
SET 
    "color" = 'bg-orange-600',
    "hover" = 'hover:bg-orange-700'
WHERE "label" = 'Loisirs';

UPDATE "tag"
SET 
    "color" = 'bg-teal-600',
    "hover" = 'hover:bg-teal-700'
WHERE "label" = 'Autre';

COMMIT;
