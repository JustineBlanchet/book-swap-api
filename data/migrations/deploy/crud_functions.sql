-- Deploy o-book:crud_functions to pg

BEGIN;

CREATE FUNCTION insert_user(user_data json) RETURNS "user" AS $$
    INSERT INTO "user"
    ("firstname", "lastname", "username", "password", "email", "zipcode", "localisation", "tel", "biography", "profile_picture")
    VALUES (
        user_data->>'firstname',
        user_data->>'lastname',
        user_data->>'username',
        user_data->>'password',
        user_data->>'email',
        user_data->>'zipcode',
        user_data->>'localisation',
        user_data->>'tel',
        user_data->>'biography',
        user_data->>'profile_picture'
    )
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_user(user_data json, user_id int) RETURNS "user" AS $$
    UPDATE "user" SET
        "firstname" = user_data->>'firstname',
        "lastname" = user_data->>'lastname',
        "username" = user_data->>'username',
        "password" = user_data->>'password',
        "email" = user_data->>'email',
        "zipcode" = user_data->>'zipcode',
        "localisation" = user_data->>'localisation',
        "tel" = user_data->>'tel',
        "biography" = user_data->>'biography',
        "profile_picture" = user_data->>'profile_picture',
        "updated_at"=now()
    WHERE "id" = user_id::int
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION add_tag_to_user(tagId int, userId int) RETURNS "user_has_tag" AS
$$
    INSERT INTO "user_has_tag" ("tag_id", "user_id") VALUES
    (tagId::int, userId::int)
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION insert_book(isbn text) RETURNS "book" AS
$$
    INSERT INTO "book" ("isbn") VALUES
    (isbn)
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION add_book_to_library(userId int, bookId int) RETURNS "library" AS
$$ 
    INSERT INTO "library" ("user_id", "book_id") VALUES
    (userId::int, bookId::int)
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_library(isAvailable boolean, libraryId int) RETURNS "library" AS
$$ 
    UPDATE "library" SET
    -- On peut aussi toggle la valeur de is_available avec NOT is_available
    "is_available"=isAvailable::boolean,
    "updated_at"=now()
    WHERE "id"=libraryId::int
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION create_loan(userId int, libraryId int) RETURNS "loan" AS
$$
    INSERT INTO "loan" ("user_id", "library_id", "status") VALUES
    (userId, libraryId, 'En attente de validation')
    RETURNING *
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_loan(loan_data json, loan_id int) RETURNS "loan" AS
$$ 
    UPDATE "loan" SET
        "status"=COALESCE((loan_data->>'status')::lend_status, null),
        "date"=COALESCE((loan_data->>'date')::timestamptz, null),
        "updated_at"=now()
    WHERE "loan"."id"=loan_id
    RETURNING *
$$ LANGUAGE sql STRICT;


COMMIT;
