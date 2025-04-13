-- CreateTable
CREATE TABLE "Additive" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "synonyms" TEXT[],
    "danger" INTEGER NOT NULL,
    "origins" TEXT[],
    "categories" TEXT[],
    "description" TEXT NOT NULL,
    "health_harm" TEXT NOT NULL,
    "health_benefit" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "legislation" TEXT,
    "reference_url" TEXT NOT NULL,

    CONSTRAINT "Additive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Additive_code_key" ON "Additive"("code");
