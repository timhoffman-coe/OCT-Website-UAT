-- AlterTable
ALTER TABLE "ServiceArea" ADD COLUMN "linkedTeamId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceArea_linkedTeamId_key" ON "ServiceArea"("linkedTeamId");

-- AddForeignKey
ALTER TABLE "ServiceArea" ADD CONSTRAINT "ServiceArea_linkedTeamId_fkey" FOREIGN KEY ("linkedTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
