-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);
