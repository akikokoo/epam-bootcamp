# QA Context — NexusERP

Context for QA engineers validating Stories in NexusERP.

---

## Your Primary References

1. **The Story file** — the acceptance criteria ARE the test cases
2. **`memory-banks/domain/glossary.md`** — lifecycle state machines and business rules
3. **`memory-banks/architecture/overview.md`** — understanding the system to spot integration issues

---

## Validation Approach

Each Story has explicit acceptance criteria. QA validates:

1. **Happy path:** does the feature work as described?
2. **Validation errors:** does the system reject invalid inputs correctly (correct HTTP status + error shape)?
3. **Authorization:** can a `Staff` role not access a `Manager`-only action?
4. **Multi-tenant isolation:** can Tenant A's data never be accessed from Tenant B's session?
5. **State machine transitions:** can a PO go directly from DRAFT to RECEIVED? (It must not.)

---

## State Machine Test Cases (Required)

### Purchase Order

| From | To | Expected |
|------|----|---------|
| DRAFT | SENT | ✅ Allowed |
| SENT | CONFIRMED | ✅ Allowed |
| CONFIRMED | RECEIVED | ✅ Allowed (triggers stock update) |
| RECEIVED | CLOSED | ✅ Allowed |
| DRAFT | RECEIVED | ❌ Must reject with 400 |
| CLOSED | any | ❌ Must reject with 400 |

### Sales Order

| From | To | Expected |
|------|----|---------|
| DRAFT | CONFIRMED | ✅ Allowed |
| CONFIRMED | SHIPPED | ✅ Allowed |
| SHIPPED | INVOICED | ✅ Allowed (auto-generates invoice) |
| INVOICED | PAID | ✅ Allowed |
| DRAFT | INVOICED | ❌ Must reject |

### Leave Request

Both manager AND HR approval required — test that one approval alone is insufficient.

---

## API Testing Notes

All error responses must match this exact shape (test with JSON schema):

```json
{ "error": "string", "code": "string" }
```

Authentication:
- `401` when no token provided
- `401` when expired token provided
- `403` when valid token but insufficient role

---

## Staging Smoke Test (After Each Deploy)

1. Log in as Owner → create a product with reorder level
2. Create a purchase order → transition through full PO lifecycle
3. Verify stock level updated after Goods Receipt
4. Check low-stock alert fires when stock < reorder level
5. Log in as Staff → verify cannot access Manager actions
