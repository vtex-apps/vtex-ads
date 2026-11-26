type DataUpdate = {
  id?: string
  uniqueId?: string
  seller?: string
  quantity: number
}

type ItemToAdd = {
  id: string
  seller: string
  quantity: number
}

declare module 'vtex.order-items/OrderItems' {
  import type { FC } from 'react'

  export const OrderItemsProvider: FC

  export const useOrderItems: () => {
    addItems(
      items: ItemToAdd[],
      options?: { marketingData?: Record<string, string> }
    ): PromiseLike<void>
    updateQuantity(data: DataUpdate): PromiseLike<void> | void
  }
}
