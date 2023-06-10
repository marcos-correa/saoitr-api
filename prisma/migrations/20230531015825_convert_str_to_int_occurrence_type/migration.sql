/*
  Warnings:

  - You are about to alter the column `occurrence_type` on the `occurrences` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_occurrences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registered_at" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "occurrence_type" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "occurrences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_occurrences" ("id", "km", "local", "occurrence_type", "registered_at", "user_id") SELECT "id", "km", "local", "occurrence_type", "registered_at", "user_id" FROM "occurrences";
DROP TABLE "occurrences";
ALTER TABLE "new_occurrences" RENAME TO "occurrences";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
