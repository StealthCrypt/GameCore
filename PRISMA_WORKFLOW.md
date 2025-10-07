# Prisma Workflow Guide

## Do I Need to Generate Client Every Schema Change?

**Short Answer:** The `npx prisma migrate dev` command **automatically generates the client** for you!

**Long Answer:**

### When Client is Auto-Generated ✅
```bash
npx prisma migrate dev --name your_change
# This does BOTH:
# 1. Creates migration + updates database
# 2. Generates Prisma Client automatically
```

### When You Need to Manually Generate 🔄

Only run `npx prisma generate` manually when:

1. **After pulling changes** from git that include schema changes
2. **After running** `npx prisma db push` (pushes schema without migrations)
3. **When client gets out of sync** with schema (rare)

```bash
npx prisma generate
```

---

## Complete Workflow for Schema Changes

### 1️⃣ Edit Schema
Edit `prisma/schema.prisma`:
```prisma
model User {
  id       String @id @default(cuid())
  email    String @unique
  password String  // <- Added this
  name     String?
}
```

### 2️⃣ Create Migration (Auto-generates client)
```bash
npx prisma migrate dev --name add_user_password
```

This command:
- ✅ Creates SQL migration file
- ✅ Applies migration to database
- ✅ Generates Prisma Client
- ✅ Updates TypeScript types

### 3️⃣ Use in Your Code
```typescript
import { prisma } from '@/lib/prisma'

// TypeScript now knows about the password field!
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashed_password',
    name: 'John Doe'
  }
})
```

---

## Common Prisma Commands

### Development Workflow
```bash
# Edit schema -> Run this (does everything)
npx prisma migrate dev --name description_of_change

# View your data in GUI
npx prisma studio

# Check if schema matches database
npx prisma validate
```

### Quick Database Updates (No Migration)
```bash
# Push schema changes without creating migration files
npx prisma db push

# Pull database schema into your Prisma schema
npx prisma db pull

# Note: After these, you MUST run:
npx prisma generate
```

### Migration Management
```bash
# Create migration without applying it
npx prisma migrate dev --create-only

# Apply pending migrations
npx prisma migrate deploy

# Reset database (deletes all data!)
npx prisma migrate reset
```

### Client Generation
```bash
# Generate Prisma Client manually
npx prisma generate

# Generate and watch for changes
npx prisma generate --watch
```

---

## File Structure After Setup

```
gamecore/
├── prisma/
│   ├── schema.prisma          # Your schema definition
│   └── migrations/            # Auto-generated SQL migrations
│       └── 20250101_init/
│           └── migration.sql
├── lib/
│   └── prisma.ts             # Prisma client instance (import this!)
├── node_modules/
│   └── .prisma/
│       └── client/           # Auto-generated client code
├── .env                      # Database connection string
└── package.json
```

---

## Best Practices

### ✅ DO:
- Use `npx prisma migrate dev` for all schema changes in development
- Commit migration files to git
- Use `lib/prisma.ts` as single source of truth for prisma client
- Run migrations before deploying to production

### ❌ DON'T:
- Manually edit migration files after they're created
- Delete migration files (breaks migration history)
- Edit the database schema directly in MySQL Workbench
- Forget to commit `.env.example` (without passwords!)

---

## Troubleshooting

### "Type X doesn't exist" Error in TypeScript
```bash
# Regenerate client
npx prisma generate
```

### Database and Schema Out of Sync
```bash
# Reset and reapply all migrations
npx prisma migrate reset
```

### Migration Failed Halfway
```bash
# Mark migration as rolled back
npx prisma migrate resolve --rolled-back "migration_name"

# Then try again
npx prisma migrate dev
```

### Can't Connect to Database
```bash
# Test connection
npx prisma db pull
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Edit schema + migrate | `npx prisma migrate dev --name change_name` |
| View data GUI | `npx prisma studio` |
| Generate client only | `npx prisma generate` |
| Reset database | `npx prisma migrate reset` |
| Push without migration | `npx prisma db push` |
| Pull from database | `npx prisma db pull` |
| Validate schema | `npx prisma validate` |

---

## Remember:

**`npx prisma migrate dev` is your friend!** 

It handles:
- Creating migrations
- Applying to database  
- Generating client
- Updating TypeScript types

All in one command! 🚀
