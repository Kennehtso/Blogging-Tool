
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS Articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_title VARCHAR(255) NOT NULL,
    article_subtitle VARCHAR(255) NOT NULL,
    article_text TEXT NOT NULL,
    article_likes INTEGER DEFAULT 0, 
    article_create_date DATE NOT NULL,
    article_last_modified_date DATE NOT NULL,
    article_publication_date DATE,
    article_state INTEGER CHECK(article_state=0 or article_state=1)
);

CREATE TABLE IF NOT EXISTS Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_content TEXT NOT NULL,
    comment_create_date DATE NOT NULL,
    article_id INTEGER,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);

CREATE TABLE IF NOT EXISTS Settings (
    blog_title INTEGER VARCHAR(255) NOT NULL,
    blog_subtile VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL
);

--insert default data (if necessary here)

INSERT INTO Articles ("article_title", "article_subtitle", "article_text", "article_create_date", "article_last_modified_date", "article_state") VALUES ("(Sample)  title Lorem ipsum dolor sit amet", "sub Lorem ipsum dolor sit amet", "     When mice are kept at high population densities, their behaviour changes in a number of ways. Aggressive activity within populations of mice rises as density increases. Cannibalism of young also goes up, and so does aberrant sexual activity. Communal nesting, frequent in natural mouse populations, increases abnormally. In one example, 58 mice one to three days old (from several litters) were found in one nest, most unusual communal living. None survived because most of the mothers deserted them immediately after birth.",datetime('now'), datetime('now'), 0);
INSERT INTO Articles ("article_title", "article_subtitle", "article_text","article_create_date", "article_last_modified_date", "article_state") VALUES ("(Sample)  title ipsum dolor sit amet", "sub  ipsum dolor sit amet", "   Piedmont, or mountain, glaciers are found in many parts of the world. In North America they are distributed along the mountain ranges of the Pacific Coast from central California northward. They abound in the Andes range in South America and are familiar and greatly admired spectacles in the Alps, the Pyrenees, the Caucasus Mountains and the mountains of Scandanavia. Rivers of ice flow down the valleys of various Asian mountain ranges, including the Himalayas, the Hindu Kush, and the Karakoram and Kunlun ranges. They are also a feature of the Southern Alps of New Zealand and are found in the lofty mountains of New Guinea. The largest piedmont glaciers are the Malaspina and Bering glaciers, both in Alaska",datetime('now'), datetime('now'), 0);
INSERT INTO Articles ("article_title", "article_subtitle", "article_likes", "article_text", "article_create_date", "article_last_modified_date", "article_publication_date","article_state") VALUES ("(Sample) title Lorem sit amet 123 ", "sub Lorem sit amet", 0,"Scientists' research has revealed that viruses are by far the most abundant life forms on Earth. There are a million times more viruses on the planet than stars in the universe. Viruses also harbor the majority of genetic diversity on Earth. Scientists are finding evidence of viruses as a planetary force, influencing the global climate and geochemical cycles. They have also profoundly shaped the evolution of their hosts. The human genome, for example, contains 100,000 segments of virus DNA.",datetime('now'), datetime('now'),datetime('now'), 1);
INSERT INTO Articles ("article_title", "article_subtitle", "article_likes", "article_text", "article_create_date", "article_last_modified_date", "article_publication_date","article_state") VALUES ("(Sample) title Lorem sit amet 456 ", "sub Lorem sit amet", 0,"Scientists' research has revealed that viruses are by far the most abundant life forms on Earth. There are a million times more viruses on the planet than stars in the universe. Viruses also harbor the majority of genetic diversity on Earth. Scientists are finding evidence of viruses as a planetary force, influencing the global climate and geochemical cycles. They have also profoundly shaped the evolution of their hosts. The human genome, for example, contains 100,000 segments of virus DNA.",datetime('now'), datetime('now'),datetime('now'), 1);
INSERT INTO Articles ("article_title", "article_subtitle", "article_likes", "article_text", "article_create_date", "article_last_modified_date", "article_publication_date","article_state") VALUES ("(Sample) title Lorem sit amet 789 ", "sub Lorem sit amet", 0,"Scientists' research has revealed that viruses are by far the most abundant life forms on Earth. There are a million times more viruses on the planet than stars in the universe. Viruses also harbor the majority of genetic diversity on Earth. Scientists are finding evidence of viruses as a planetary force, influencing the global climate and geochemical cycles. They have also profoundly shaped the evolution of their hosts. The human genome, for example, contains 100,000 segments of virus DNA.",datetime('now'), datetime('now'),datetime('now'), 1);

INSERT INTO Comments ("comment_content", "comment_create_date", "article_id") VALUES ("This is a great articiles ", datetime('now'), 1);
INSERT INTO Comments ("comment_content", "comment_create_date", "article_id") VALUES ("Good one, Looking foward for more", datetime('now'), 3);
INSERT INTO Comments ("comment_content", "comment_create_date", "article_id") VALUES ("I would like to share this with my friends", datetime('now'), 3);
INSERT INTO Comments ("comment_content", "comment_create_date", "article_id") VALUES ("This is wonderful, How do you come up with this ideas", datetime('now'), 3);
INSERT INTO Comments ("comment_content", "comment_create_date", "article_id") VALUES ("Hover the content to see more, I know this is a very long comments, so I hidden it and allow you to expand all the contents when you try to hover it.", datetime('now'), 1);

INSERT INTO Settings ("blog_title", "blog_subtile", "author_name") VALUES ("Curious Is My Motivation (Sample) ", "What is in your head? Do not hesitate to share with me. (Sample) ", "Kennth So");
-- INSERT INTO testUserRecords ("test_record_value", "test_user_id") VALUES( "Lorem ipsum dolor sit amet", 1); --try changing the test_user_id to a different number and you will get an error

COMMIT;

