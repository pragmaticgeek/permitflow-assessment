-- CreateEnum
CREATE TYPE "WorkOrderType" AS ENUM ('EXTERIOR', 'INTERIOR');

-- CreateEnum
CREATE TYPE "PermitType" AS ENUM ('INHOUSE', 'OTC_NO_PLAN', 'OTC_WITH_PLAN', 'NONE');

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "workType" "WorkOrderType" NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "permitRequired" "PermitType" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "workTypeId" TEXT NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrders" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "WorkOrderType" NOT NULL,
    "permitType" "PermitType" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkType_code_key" ON "WorkType"("code");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
