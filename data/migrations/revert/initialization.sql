-- Revert o-book:initialization from pg

BEGIN;

DROP TABLE "tag", "user", "book", "library", "loan", "user_has_tag";

DROP DOMAIN "mail", "tel", "french_zipcode";

DROP TYPE "lend_status";

COMMIT;
