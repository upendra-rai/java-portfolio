export interface Incident {
  problem: string
  diagnosis: string
  solution: string
}

export const INCIDENTS: Incident[] = [
  {
    problem: 'BANK DOWNTIME — payments stuck in PENDING during a gateway outage.',
    diagnosis:
      'Correlated logs showed connection timeouts at one gateway; transaction states confirmed no submissions were lost, only unacknowledged.',
    solution:
      'Added status re-query jobs with exponential backoff and a circuit-breaker around the failing adapter; traffic rerouted to healthy gateways.',
  },
  {
    problem: 'DUPLICATE CALLBACKS — customers credited twice on retry storms.',
    diagnosis:
      'Gateway retried webhooks after transient 500s; handler updated state without an idempotency guard.',
    solution:
      'Made callback processing idempotent — signature check plus unique constraint on gateway reference before any ledger write.',
  },
  {
    problem: 'CONNECTION POOL EXHAUSTION — API froze under evening peak load.',
    diagnosis:
      'Thread dump showed all pool connections held by a slow report query sharing the same datasource as OLTP traffic.',
    solution:
      'Isolated reporting onto a read replica datasource and bounded pool sizing per workload class.',
  },
  {
    problem: 'SLOW QUERIES — dashboard p99 latency creeping past seconds.',
    diagnosis:
      'EXPLAIN revealed sequential scans from a missing composite index after a schema change.',
    solution:
      'Added covering index, rewrote the query to use projections instead of entity hydration.',
  },
  {
    problem: 'MEMORY PRESSURE — pod restarts every few days without traffic spikes.',
    diagnosis:
      'Heap analysis found unbounded in-memory caching of reference data loaded per tenant.',
    solution:
      'Replaced local maps with size-bounded Caffeine caches backed by Redis for shared state.',
  },
  {
    problem: 'DEPLOYMENT FAILURE — release rolled back mid-deploy, service flapped.',
    diagnosis:
      'Migration added a NOT NULL column without default; new code wrote rows the old code could not read during the overlap window.',
    solution:
      'Adopted expand/contract migrations — deploy-compatible steps first, backfill, then enforce constraints in a later release.',
  },
]
