BEGIN;

INSERT INTO "tag" ("label") VALUES
('Romans'),
('Science-Fiction & Fantasy'),
('Polar & Thriller'),
('BD & Manga'),
('Littérature classique'),
('Enfants & Jeunesse'),
('Savoir'),
('Loisirs'),
('Autre')
;

INSERT INTO "user" ("username", "password", "email") VALUES
('Totodu75', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'toto@gmail.com'),
('Ju', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'ju@gmail.com'),
('Marwan', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'marwan@gmail.com'),
('Duke', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'duke@gmail.com'),
('Mohamed', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'mohamed@gmail.com'),
('Hannah', '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02', 'hannah@gmail.com'), 
('Nour' , '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02' , 'nour@gmail.com'),
('Jacks' , '$2b$10$sdm9dxE/dDAV..RtpsMTnOX5fSuINvHeXfgG4LGXt/1ZJc.oNfj02' , 'jacks@gmail.com') 
;

INSERT INTO "book" ("isbn") VALUES 
('2226319484'), -- Signal - Chattam
('2298157596'), -- Un(e) secte - Chattam
('2266194453'), -- Archanes du chaos - Chattam
('2266154117'), -- Seigneur des anneaux (1) - Tolkien
('2253012084'), -- Seigneur des anneaux (2) - Tolkien
('2070501426'), -- Seigneur des anneaux (3) - Tolkien
('2070541274'), -- Harry Potter (1) - J.K Rowling
('178110106X'), -- Harry Potter (4) - J.K Rowling
('0452284236') -- 1984 - Orwell
;

INSERT INTO "library" ("user_id", "book_id") VALUES 
(2, 7), 
(2, 8),
(3, 2),
(3, 6),
(4, 9),
(4, 8),
(4, 5),
(5, 1),
(5, 3),
(6, 2),
(6, 4),
(6, 5),
(7, 4),
(7, 6)
;

INSERT INTO "loan" ("status", "date", "user_id", "library_id") VALUES 
('En attente de validation', null, 1, 5),
('En attente de validation', null, 1, 3),
('En cours', now(), 1, 8),
('En attente de validation', null, 3,  6),
('Terminé','2022-06-08 04:05:06 -8:00' , 4,  7)
;

INSERT INTO "user_has_tag" ("user_id", "tag_id") VALUES 
(2, 2),
(2, 3),
(3, 2),
(4, 8),
(5, 6),
(5, 7),
(6, 7)
;

COMMIT;