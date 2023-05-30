-- CreateTable
CREATE TABLE "occurrences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registered_at" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "occurrence_type" TEXT NOT NULL,
    "km" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
