-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_occurrences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registered_at" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "occurrence_type" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "user_id" INTEGER,
    CONSTRAINT "occurrences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_occurrences" ("id", "km", "local", "occurrence_type", "registered_at", "user_id") SELECT "id", "km", "local", "occurrence_type", "registered_at", "user_id" FROM "occurrences";
DROP TABLE "occurrences";
ALTER TABLE "new_occurrences" RENAME TO "occurrences";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
