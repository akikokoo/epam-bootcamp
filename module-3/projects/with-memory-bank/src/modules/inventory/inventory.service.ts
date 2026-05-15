import { prisma } from '@/lib/prisma';

// PurchaseOrderStatus enum matches Prisma schema and domain glossary lifecycle:
// DRAFT → SENT → CONFIRMED → RECEIVED → CLOSED
enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  CLOSED = 'CLOSED',
}

interface CreatePurchaseOrderInput {
  tenantId: string;
  supplierId: string;
  items: Array<{ productId: string; quantity: number; unitPrice: number }>;
  notes?: string;
}

interface ListPurchaseOrdersInput {
  tenantId: string;
}

export const inventoryService = {
  async createPurchaseOrder(input: CreatePurchaseOrderInput) {
    const { tenantId, supplierId, items, notes } = input;

    // All new POs start as DRAFT — cannot skip lifecycle states
    return prisma.purchaseOrder.create({
      data: {
        tenantId,
        supplierId,
        status: PurchaseOrderStatus.DRAFT,
        notes,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: { items: true },
    });
  },

  async listPurchaseOrders({ tenantId }: ListPurchaseOrdersInput) {
    // tenantId WHERE clause enforced on every query — no cross-tenant leaks
    return prisma.purchaseOrder.findMany({
      where: { tenantId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  },
};
