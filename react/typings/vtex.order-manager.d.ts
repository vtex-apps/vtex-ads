declare module 'vtex.order-manager/OrderForm' {
  interface OrderFormItem {
    id: string
    seller: string
    quantity: number
  }

  export const useOrderForm: () => {
    loading: boolean
    orderForm: { items: OrderFormItem[] }
  }
}
