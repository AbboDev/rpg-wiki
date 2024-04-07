-- DropForeignKey
ALTER TABLE "MapMarker" DROP CONSTRAINT "MapMarker_mapChildId_fkey";

-- AlterTable
ALTER TABLE "MapMarker" ALTER COLUMN "mapChildId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MapMarker" ADD CONSTRAINT "MapMarker_mapChildId_fkey" FOREIGN KEY ("mapChildId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;
