# GameCore - Game Store Platform

A full-stack game store application built with Next.js, TypeScript, MySQL, and Prisma.

---

## 🚀 Quick Start for Team Members

### After Pulling from Git:

**⚠️ Packages are NOT automatically installed when you pull!** Follow these steps:

```bash
# 1. Pull latest changes
git pull origin master

# 2. Install/update packages
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Apply any new database migrations
npx prisma migrate deploy

# 5. Start development server
npm run dev
```

---

## 📦 First-Time Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)

### Step 1: Clone & Install
```bash
git clone https://github.com/StealthCrypt/GameCore.git
cd GameCore
npm install
```

### Step 2: Set Up MySQL Database
```sql
-- In MySQL Command Line or Workbench
CREATE DATABASE gamecore;
CREATE USER 'gamecore'@'localhost' IDENTIFIED BY 'gamecore1';
GRANT ALL PRIVILEGES ON gamecore.* TO 'gamecore'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Configure Environment
Create `.env` file in root:
```env
DATABASE_URL="mysql://gamecore:gamecore1@localhost:3306/gamecore"
```

### Step 4: Run Migrations
```bash
npx prisma generate
npx prisma migrate deploy
```

### Step 5: Start Development
```bash
npm run dev
```

Visit `http://localhost:3000`

---

---

## Available Commands

### Development

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open database GUI at localhost:5555
npx prisma generate      # Regenerate Prisma Client (after pulling)
npx prisma migrate deploy  # Apply migrations (after pulling)
```

---

## 📁 Project Structure

```
gamecore/
├── app/
│   ├── api/
│   │   ├── auth/        # Login & signup endpoints
│   │   ├── games/       # Games CRUD
│   │   ├── users/       # Users CRUD
│   │   └── purchases/   # Purchase records
│   ├── admin/           # Admin dashboard
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── page.tsx         # Home page
├── lib/
│   ├── api.ts           # Frontend API utilities
│   └── prisma.ts        # Prisma client
├── hooks/
│   ├── useGames.ts      # Games data hook
│   └── useUsers.ts      # Users data hook
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration history
└── .env                 # Environment variables (create this!)
```

---

## 🔄 Development Workflow

### Pulling Latest Changes (Important!)
```bash
# 1. Pull code
git pull origin master

# 2. Install any new dependencies
npm install

# 3. Regenerate Prisma Client (if schema changed)
npx prisma generate

# 4. Apply new migrations (if any)
npx prisma migrate deploy
```

### Making Database Changes
```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name your_change_description
# 3. Commit both schema and migration files
git add prisma/
git commit -m "Update database schema: your_change_description"
```

---

## 🌐 Key URLs

- **Home:** `http://localhost:3000`
- **Admin:** `http://localhost:3000/admin`
- **Login:** `http://localhost:3000/login`
- **Signup:** `http://localhost:3000/signup`
- **Prisma Studio:** `http://localhost:5555`

---

## 🐛 Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### MySQL Connection Failed
- Ensure MySQL is running
- Check `.env` credentials match your MySQL user
- Test: `mysql -u gamecore -p gamecore`

### Port 3000 Already in Use
```powershell
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Migration Errors
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

---

## 🔐 Database Schema

- **Users:** email, password (bcrypt), name, isAdmin
- **Games:** title, description, price, imageUrl, category
- **Purchases:** userId + gameId (user's game library)

---

## 📚 Tech Stack

- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript
- **Database:** MySQL 8.0
- **ORM:** Prisma
- **Authentication:** bcrypt
- **Styling:** Tailwind CSS 4

---

## 🤝 Contributing

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Commit: `git commit -m "Add: feature description"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

---

**Built by Vision Labs**
