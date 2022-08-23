-- Revert o-book:views from pg

BEGIN;

DROP VIEW "user_library_details";
DROP VIEW "book_in_library";
DROP VIEW "profile_informations";
DROP VIEW "contact_informations";
DROP VIEW "loan_details";

COMMIT;
