-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "bookListingId" TEXT,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_bookListingId_fkey" FOREIGN KEY ("bookListingId") REFERENCES "BookListing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
