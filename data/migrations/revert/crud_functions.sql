-- Revert o-book:crud_functions from pg

BEGIN;

DROP FUNCTION "insert_user" ;
DROP FUNCTION "update_user" ;
DROP FUNCTION "add_tag_to_user" ;
DROP FUNCTION "insert_book" ;
DROP FUNCTION "add_book_to_library" ;
DROP FUNCTION "update_library" ;
DROP FUNCTION "create_loan" ;
DROP FUNCTION "update_loan" ;

COMMIT;
