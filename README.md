# soroban-stream

> Continuous, per-second token streaming on Soroban — power salaries,
> subscriptions, grants, and vesting flows fully on-chain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Drips Wave Program](https://img.shields.io/badge/Drips-Wave%20Program-blue)](https://drips.network)
[![Built with Soroban](https://img.shields.io/badge/Built%20with-Soroban-blueviolet)](https://soroban.stellar.org)

---

## 🧭 Overview

`soroban-stream` brings real-time finance to the Stellar ecosystem. Instead of
sending a lump-sum payment, a sender locks tokens into a stream — and the
recipient can withdraw their accrued share at any moment, down to the ledger.

Think of it as a payroll protocol: an employer opens a stream of 3,000 USDC/month
to an employee. Every second, a fraction unlocks. The employee can withdraw daily,
weekly, or all at once at month-end — entirely on their own schedule.

### Use Cases
- 💼 On-chain salaries and contractor payments
- 📦 Subscription billing with instant cancellation
- 🏦 Token vesting with real-time accrual
- 🎓 Grant disbursement over a fixed period

---

## 🏗️ Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Contract | Rust, Soroban SDK |
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Wallet | @stellar/freighter-api |
| Stellar SDK | @stellar/stellar-sdk |
| Deployment | Soroban CLI |
| CI/CD | GitHub Actions |

### Stream State Machine

```
  create_stream()
       │
       ▼
   ┌────────┐
   │ ACTIVE │◄──── withdraw() callable anytime
   └────┬───┘
        │ cancel() or end_ledger reached
        ▼
   ┌──────────┐
   │ FINISHED │
   └──────────┘
```

### Contract Modules

| Module | Responsibility |
|---|---|
| `lib.rs` | Entrypoint, initialization |
| `stream.rs` | Stream struct, create/read logic |
| `withdraw.rs` | Accrual calculation, token transfer |
| `cancel.rs` | Early termination, refund logic |
| `events.rs` | StreamCreated, Withdrawn, Cancelled |
| `errors.rs` | Typed error codes |

---

## 🌊 Drips Wave Program

This repository is an **active participant in the [Drips Wave Program](https://drips.network)**
— contributors earn real rewards for solving scoped GitHub issues.

### How to Participate

**Step 1: Register**
- Visit [drips.network](https://drips.network) and connect your Ethereum wallet.
- Complete your contributor profile to receive reward streams.

**Step 2: Find an Issue**

| Label | Complexity | Example |
|---|---|---|
| `drips:trivial` | Trivial | Add JSDoc, fix error message, write doc comment |
| `drips:medium` | Medium | Add stream pause/resume logic, write contract tests |
| `drips:high` | High | Multi-token stream support, cliff + stream combo |

**Step 3: Claim**
- Comment `/claim` on the issue. Maintainer assigns + registers reward on Drips.

**Step 4: PR**
- Fork → branch → implement with tests → open PR referencing `Closes #N`.

**Step 5: Get Paid**
- Merged PR → Drips bounty resolved → reward streams to your wallet.

---

## 📁 Project Structure

```
soroban-stream/
├── .github/workflows/
│   ├── contract-ci.yml
│   └── frontend-ci.yml
├── contracts/stream/
│   ├── Cargo.toml
│   ├── src/
│   │   ├── lib.rs
│   │   ├── stream.rs
│   │   ├── withdraw.rs
│   │   ├── cancel.rs
│   │   ├── events.rs
│   │   └── errors.rs
│   └── tests/
│       ├── test_create.rs
│       ├── test_withdraw.rs
│       └── test_cancel.rs
├── docs/
│   ├── architecture.md
│   └── protocol.md
├── frontend/src/
│   ├── components/
│   │   ├── create/
│   │   │   ├── StreamForm.tsx
│   │   │   └── RateCalculator.tsx
│   │   ├── manage/
│   │   │   ├── StreamCard.tsx
│   │   │   ├── WithdrawPanel.tsx
│   │   │   └── CancelButton.tsx
│   │   └── dashboard/
│   │       ├── ActiveStreams.tsx
│   │       └── StreamTimeline.tsx
│   ├── hooks/
│   │   ├── useStream.ts
│   │   ├── useWithdraw.ts
│   │   └── useWallet.ts
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── manage.tsx
│   └── utils/
│       ├── time.ts
│       ├── rate.ts
│       └── contract.ts
├── scripts/
│   ├── deploy.sh
│   └── invoke.sh
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

```bash
# Build contract
cd contracts/stream
cargo build --target wasm32-unknown-unknown --release

# Deploy to Testnet
cp .env.example .env
./scripts/deploy.sh testnet

# Run tests
cargo test

# Start frontend
cd frontend && pnpm install && pnpm dev
```

---

## 📄 License
MIT © dripslabs contributors
