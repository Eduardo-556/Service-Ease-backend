-- CreateTable
CREATE TABLE "SCHEMA"."User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."ServiceOrder" (
    "id" TEXT NOT NULL,
    "deviceModel" TEXT NOT NULL,
    "deviceSerial" TEXT,
    "deviceImei" TEXT,
    "serviceDescription" TEXT NOT NULL,
    "technicalDescription" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "serviceStatus" TEXT NOT NULL DEFAULT 'pending',
    "startService" TIMESTAMP(3),
    "pauseService" TIMESTAMP(3),
    "endService" TIMESTAMP(3),
    "totalCost" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "ServiceOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "SCHEMA"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "SCHEMA"."Customer"("email");

-- AddForeignKey
ALTER TABLE "SCHEMA"."Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCHEMA"."ServiceOrder" ADD CONSTRAINT "ServiceOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "SCHEMA"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
