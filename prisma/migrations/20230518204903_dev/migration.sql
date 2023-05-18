-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeedbackSeller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT,
    "rating" REAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    CONSTRAINT "FeedbackSeller_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FeedbackSeller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FeedbackSeller" ("comment", "customer_id", "id", "rating", "seller_id") SELECT "comment", "customer_id", "id", "rating", "seller_id" FROM "FeedbackSeller";
DROP TABLE "FeedbackSeller";
ALTER TABLE "new_FeedbackSeller" RENAME TO "FeedbackSeller";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
