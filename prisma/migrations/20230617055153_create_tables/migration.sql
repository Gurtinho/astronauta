-- CreateTable
CREATE TABLE "leave" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "message" TEXT,
    "description" TEXT,
    "role" TEXT,
    "image" TEXT,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "welcome" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "message" TEXT,
    "description" TEXT,
    "role" TEXT,
    "image" TEXT,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "welcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punishment" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "punishment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuration" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "bardwords" BOOLEAN NOT NULL,
    "antilinks" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("id")
);
