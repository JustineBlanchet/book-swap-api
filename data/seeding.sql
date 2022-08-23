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

INSERT INTO "book" ("google_api_id") VALUES 
('5vpGywEACAAJ'), -- Signal - Chattam
('AyOyDwAAQBAJ'), -- Un(e) secte - Chattam
('Nw2p98GuXC8C'), -- Archanes du chaos - Chattam
('np2VDAAAQBAJ'), -- Seigneur des anneaux (1) - Tolkien
('eZ2VDAAAQBAJ'), -- Seigneur des anneaux (2) - Tolkien
('tdkqDQAAQBAJ'), -- Seigneur des anneaux (3) - Tolkien
('JLs1EAAAQBAJ'), -- Attaque des titans - Isayama
('ewx7jgEACAAJ'), -- Harry Potter (1) - J.K Rowling
('xaWRzQEACAAJ') -- 1984 - Orwell
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