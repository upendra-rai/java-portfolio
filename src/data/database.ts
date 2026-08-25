export interface ApiEndpoint {
  id: string
  method: 'GET' | 'POST'
  path: string
  description: string
  request?: object
  response: object
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'get-order',
    method: 'GET',
    path: '/api/v1/orders/{id}',
    description: 'Fetch a single order with status and totals.',
    response: {
      success: true,
      data: {
        orderId: 'ORD-10291',
        status: 'SUCCESS',
      },
    },
  },
  {
    id: 'create-payment',
    method: 'POST',
    path: '/api/v1/payments',
    description: 'Initiate a payment. Idempotent via the key header.',
    request: {
      merchantId: 'MRC-8841',
      amount: 2499.0,
      currency: 'INR',
      idempotencyKey: 'b7f9c2e1-4a8d-4f6e',
      gateway: 'AUTO',
    },
    response: {
      success: true,
      data: {
        paymentId: 'PAY-55210',
        status: 'PENDING',
        redirectUrl: 'https://pg.example.com/checkout/PAY-55210',
      },
    },
  },
  {
    id: 'get-transaction',
    method: 'GET',
    path: '/api/v1/transactions/{id}',
    description: 'Full transaction lifecycle view.',
    response: {
      success: true,
      data: {
        txnId: 'TXN-90311',
        orderId: 'ORD-10291',
        state: 'CONFIRMED',
        gatewayRef: 'BNK-77219',
        timeline: ['CREATED', 'SUBMITTED', 'CONFIRMED'],
      },
    },
  },
  {
    id: 'login',
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'Credential exchange for a short-lived JWT pair.',
    request: {
      email: 'user@example.com',
      password: '********',
    },
    response: {
      success: true,
      data: {
        accessToken: '<jwt>',
        tokenType: 'Bearer',
        expiresIn: 900,
      },
    },
  },
  {
    id: 'profile',
    method: 'GET',
    path: '/api/v1/users/profile',
    description: 'Authenticated user profile projection.',
    response: {
      success: true,
      data: {
        userId: 'USR-2043',
        name: 'Upendra Rai',
        roles: ['ADMIN'],
      },
    },
  },
]

export interface DbEntity {
  id: string
  table: string
  position: [number, number, number]
  primaryKey: string
  fields: string[]
  relationships: string[]
  indexes: string[]
}

export const DB_ENTITIES: DbEntity[] = [
  {
    id: 'user',
    table: 'USER',
    position: [-6, 0, -2],
    primaryKey: 'id BIGINT PK',
    fields: ['email VARCHAR UNIQUE', 'password_hash VARCHAR', 'status ENUM', 'created_at TIMESTAMP'],
    relationships: ['places ORDER', 'holds WALLET'],
    indexes: ['idx_users_email'],
  },
  {
    id: 'merchant',
    table: 'MERCHANT',
    position: [-6, 0, 2.5],
    primaryKey: 'id BIGINT PK',
    fields: ['name VARCHAR', 'api_key_hash VARCHAR', 'settlement_account VARCHAR'],
    relationships: ['owns PRODUCT', 'initiates PAYMENT'],
    indexes: ['idx_merchants_api_key'],
  },
  {
    id: 'product',
    table: 'PRODUCT',
    position: [-2, 0, 3.5],
    primaryKey: 'id BIGINT PK',
    fields: ['merchant_id FK', 'sku VARCHAR', 'price DECIMAL(12,2)', 'inventory INT'],
    relationships: ['referenced by ORDER_ITEM'],
    indexes: ['idx_products_merchant_sku'],
  },
  {
    id: 'order',
    table: 'ORDER',
    position: [0, 0, -3],
    primaryKey: 'id BIGINT PK',
    fields: ['user_id FK', 'total_amount DECIMAL(12,2)', 'status ENUM', 'created_at TIMESTAMP'],
    relationships: ['contains ORDER_ITEM', 'settled by TRANSACTION'],
    indexes: ['idx_orders_user_status_created'],
  },
  {
    id: 'transaction',
    table: 'TRANSACTION',
    position: [4, 0, -1],
    primaryKey: 'id BIGINT PK',
    fields: ['order_id FK', 'gateway_ref VARCHAR', 'state ENUM', 'idempotency_key UUID UNIQUE'],
    relationships: ['produces PAYMENT', 'audited in LEDGER'],
    indexes: ['uk_txns_idempotency_key', 'idx_txns_state'],
  },
  {
    id: 'payment',
    table: 'PAYMENT',
    position: [7, 0, 2],
    primaryKey: 'id BIGINT PK',
    fields: ['txn_id FK', 'gateway ENUM', 'amount DECIMAL(12,2)', 'callback_verified BOOLEAN'],
    relationships: ['belongs to TRANSACTION'],
    indexes: ['idx_payments_txn_gateway'],
  },
  {
    id: 'wallet',
    table: 'WALLET',
    position: [-1.5, 0, 0],
    primaryKey: 'id BIGINT PK',
    fields: ['user_id FK', 'balance DECIMAL(12,2)', 'version BIGINT (optimistic lock)'],
    relationships: ['credited by REFERRAL'],
    indexes: ['uk_wallets_user_id'],
  },
  {
    id: 'referral',
    table: 'REFERRAL',
    position: [3, 0, 3.5],
    primaryKey: 'id BIGINT PK',
    fields: ['referrer_id FK', 'referred_id FK', 'reward_status ENUM', 'credited_at TIMESTAMP'],
    relationships: ['credits WALLET'],
    indexes: ['idx_referrals_referrer_status'],
  },
]

export const DB_RELATIONS: Array<[string, string]> = [
  ['user', 'order'],
  ['order', 'transaction'],
  ['transaction', 'payment'],
  ['merchant', 'product'],
  ['merchant', 'payment'],
  ['user', 'wallet'],
  ['wallet', 'referral'],
  ['product', 'order'],
]
