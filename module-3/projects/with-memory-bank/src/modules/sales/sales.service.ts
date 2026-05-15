import { prisma } from '@/lib/prisma';

interface CreateCustomerInput {
  tenantId: string;
  name: string;
  taxId?: string;
  email?: string;
  phone?: string;
}

interface ListCustomersInput {
  tenantId: string;
}

export const salesService = {
  async createCustomer(input: CreateCustomerInput) {
    return prisma.customer.create({
      data: input,
    });
  },

  async listCustomers({ tenantId }: ListCustomersInput) {
    return prisma.customer.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  },
};
