-- CreateTable
CREATE TABLE "reactionroles" (
    "id" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "roles" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reactionroles_pkey" PRIMARY KEY ("id")
);
