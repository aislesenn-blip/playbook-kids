-- Seed Data for Unimonday: Nursery University

-- Modules
INSERT INTO modules (id, title, description, level, order_index, icon_name) VALUES
('11111111-1111-1111-1111-111111111111', 'The Alphabet', 'Learn to recognize and say the ABCs.', 'First Words', 1, 'book-open'),
('22222222-2222-2222-2222-222222222222', 'Animals', 'Discover animals and their names.', 'First Words', 2, 'smile'),
('33333333-3333-3333-3333-333333333333', 'Colors & Shapes', 'Identify basic colors and shapes.', 'First Words', 3, 'star')
ON CONFLICT DO NOTHING;

-- Lessons
INSERT INTO lessons (id, module_id, title, type, order_index) VALUES
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Speaking A to E', 'Speaking', 1),
('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Writing A to E', 'Writing', 2),
('66666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'Pet Names', 'Speaking', 1),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'Spell the Pets', 'Writing', 2)
ON CONFLICT DO NOTHING;

-- Vocabulary
INSERT INTO vocabulary (id, lesson_id, word, image_url, pronunciation_target, spelling_target) VALUES
('88888888-8888-8888-8888-888888888888', '66666666-6666-6666-6666-666666666666', 'Cat', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop', 'cat', 'CAT'),
('99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666', 'Dog', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop', 'dog', 'DOG'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'Apple', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?q=80&w=2070&auto=format&fit=crop', 'apple', 'APPLE')
ON CONFLICT DO NOTHING;