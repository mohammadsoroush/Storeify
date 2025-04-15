import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// تنظیم WebSocket برای Neon
neonConfig.webSocketConstructor = ws;

// اتصال به دیتابیس
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// ایجاد آداپتور Prisma برای Neon
const adapter = new PrismaNeon(pool);

// ایجاد PrismaClient استاندارد برای NextAuth
export const prismadb = new PrismaClient({ adapter });

// توجه: اگر نیاز به `$extends` داری، جداگانه استفاده کن
export const extendedPrisma = prismadb.$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
