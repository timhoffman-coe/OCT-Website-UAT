-- CreateTable
CREATE TABLE "ProjectRoadmapPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRoadmapPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRoadmapPermission_userId_key" ON "ProjectRoadmapPermission"("userId");

-- AddForeignKey
ALTER TABLE "ProjectRoadmapPermission" ADD CONSTRAINT "ProjectRoadmapPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
