-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "money_id" TEXT,
    "bag_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money" (
    "id" TEXT NOT NULL,
    "fragments" INTEGER,
    "gems" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "money_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bag" (
    "id" TEXT NOT NULL,
    "achivments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bag_pkey" PRIMARY KEY ("id")
);
