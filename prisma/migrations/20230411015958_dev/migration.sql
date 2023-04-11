-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    CONSTRAINT "Seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seller_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CustomerPlace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CustomerPlace_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomerPlace_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeliveryRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "delivery_time" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    CONSTRAINT "DeliveryRequest_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "CustomerPlace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_phone_key" ON "Seller"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_user_id_key" ON "Seller"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_user_id_key" ON "Customer"("user_id");
