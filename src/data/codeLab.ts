export interface CodeSample {
  id: string
  tab: string
  file: string
  description: string
  code: string
}

export const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'rest',
    tab: 'REST API',
    file: 'OrderController.java',
    description: 'Thin controller — HTTP concerns only, no business logic.',
    code: `@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> create(
            @Valid @RequestBody CreateOrderRequest request) {
        OrderResponse created = orderService.create(request);
        return ResponseEntity
                .created(URI.create("/api/v1/orders/" + created.id()))
                .body(created);
    }
}`,
  },
  {
    id: 'service',
    tab: 'SERVICE LAYER',
    file: 'OrderService.java',
    description: 'Domain logic and transaction boundaries live here.',
    code: `@Service
public class OrderService {

    private final OrderRepository orders;
    private final InventoryClient inventory;

    @Transactional
    public OrderResponse create(CreateOrderRequest request) {
        inventory.reserve(request.items());

        Order order = Order.of(request.customerId(), request.items());
        orders.save(order);

        eventPublisher.publish(new OrderCreatedEvent(order.getId()));
        return OrderResponse.from(order);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long id) {
        return orders.findById(id)
                .map(OrderResponse::from)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }
}`,
  },
  {
    id: 'repository',
    tab: 'REPOSITORY',
    file: 'OrderRepository.java',
    description: 'Projection queries — fetch only what the response needs.',
    code: `public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
        select new com.acme.dto.OrderSummary(
            o.id, o.status, o.createdAt, o.totalAmount)
        from Order o
        where o.customer.id = :customerId
          and o.status <> com.acme.model.OrderStatus.DELETED
        order by o.createdAt desc
        """)
    Page<OrderSummary> findSummariesByCustomer(
            @Param("customerId") Long customerId, Pageable pageable);
}`,
  },
  {
    id: 'redis',
    tab: 'REDIS CACHE',
    file: 'CacheConfig.java',
    description: 'Cache-aside on hot reads; explicit eviction on writes.',
    code: `@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues()
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }
}

@Service
public class CatalogService {

    @Cacheable(value = "products", key = "#id")
    public ProductDto getProduct(Long id) {
        return productRepository.findDtoById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @CacheEvict(value = "products", key = "#id")
    public void updateProduct(Long id, UpdateProductRequest req) {
        // write path invalidates the read cache
    }
}`,
  },
  {
    id: 'exceptions',
    tab: 'EXCEPTION HANDLING',
    file: 'GlobalExceptionHandler.java',
    description: 'One place maps failures to consistent API error contracts.',
    code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(OrderNotFoundException ex) {
        ApiError error = new ApiError("ORDER_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
            MethodArgumentNotValidException ex) {
        String detail = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest()
                .body(new ApiError("VALIDATION_FAILED", detail));
    }
}`,
  },
  {
    id: 'transaction',
    tab: 'TRANSACTIONS',
    file: 'TransferService.java',
    description: 'Atomic multi-write operations with rollback on failure.',
    code: `@Service
public class TransferService {

    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId,
                         BigDecimal amount) {
        Account from = accounts.findById(fromAccountId)
                .orElseThrow(AccountNotFoundException::new);
        Account to = accounts.findById(toAccountId)
                .orElseThrow(AccountNotFoundException::new);

        from.debit(amount);
        to.credit(amount);

        ledger.record(fromAccountId, toAccountId, amount);
    }
}`,
  },
]
