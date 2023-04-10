/*
  Warnings:

  - You are about to drop the column `balance` on the `Seller` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seller" ("id", "phone", "user_id") SELECT "id", "phone", "user_id" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_phone_key" ON "Seller"("phone");
CREATE UNIQUE INDEX "Seller_user_id_key" ON "Seller"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
