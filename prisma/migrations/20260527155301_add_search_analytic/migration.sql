-- CreateTable
CREATE TABLE "SearchAnalytic" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SearchAnalytic_count_idx" ON "SearchAnalytic"("count" DESC);

-- CreateIndex
CREATE INDEX "SearchAnalytic_query_idx" ON "SearchAnalytic"("query");

-- CreateIndex
CREATE UNIQUE INDEX "SearchAnalytic_query_key" ON "SearchAnalytic"("query");
