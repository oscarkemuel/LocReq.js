/*
  Warnings:

  - You are about to drop the column `cpf` on the `DeliveryPerson` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Customer` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_person_id` on table `DeliveryRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "DeliveryPerson_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeliveryPerson" ("balance", "id", "phone", "user_id") SELECT "balance", "id", "phone", "user_id" FROM "DeliveryPerson";
DROP TABLE "DeliveryPerson";
ALTER TABLE "new_DeliveryPerson" RENAME TO "DeliveryPerson";
CREATE UNIQUE INDEX "DeliveryPerson_phone_key" ON "DeliveryPerson"("phone");
CREATE UNIQUE INDEX "DeliveryPerson_user_id_key" ON "DeliveryPerson"("user_id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("created_at", "email", "id", "is_admin", "name", "password") SELECT "created_at", "email", "id", "is_admin", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "customer_id" TEXT,
    "delivery_person_id" TEXT,
    CONSTRAINT "Address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Address_delivery_person_id_fkey" FOREIGN KEY ("delivery_person_id") REFERENCES "DeliveryPerson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "complement", "customer_id", "id", "neighborhood", "number", "state", "street", "zip_code") SELECT "city", "complement", "customer_id", "id", "neighborhood", "number", "state", "street", "zip_code" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("id", "phone", "user_id") SELECT "id", "phone", "user_id" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_user_id_key" ON "Customer"("user_id");
CREATE TABLE "new_DeliveryRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_time" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "delivery_person_id" TEXT NOT NULL,
    CONSTRAINT "DeliveryRequest_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_delivery_person_id_fkey" FOREIGN KEY ("delivery_person_id") REFERENCES "DeliveryPerson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeliveryRequest" ("address_id", "customer_id", "delivery_person_id", "delivery_time", "id", "quantity", "status", "type") SELECT "address_id", "customer_id", "delivery_person_id", "delivery_time", "id", "quantity", "status", "type" FROM "DeliveryRequest";
DROP TABLE "DeliveryRequest";
ALTER TABLE "new_DeliveryRequest" RENAME TO "DeliveryRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
