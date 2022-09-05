-- Revert o-book:tags-color from pg

BEGIN;

ALTER TABLE "tag"
DROP COLUMN "color";

ALTER TABLE "tag"
DROP COLUMN "hover";

COMMIT;
