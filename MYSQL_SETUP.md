# MySQL Databas## Solution: Grant CREATE Permission to User

### Step 1: Open Command Prompt as Administrator

1. Press `Win + X` on your keyboard
2. Select **Terminal (Admin)** or **Command Prompt (Admin)**
3. Click **Yes** when Windows asks for permission

### Step 2: Navigate to MySQL and Connect as Root

In the Command Prompt, run these commands one by one:

```cmd
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysql -u root -p
```

Enter your root password when prompted.

### Step 3: Grant Permissions

Once you're in the MySQL prompt (you'll see `mysql>`), run these commands:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'gamecore'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Verify Permissions

Back in Command Prompt, log in as the gamecore user to verify:

```cmd
mysql -u gamecore -p
```

Enter password: `gamecore1`

Then check permissions:

```sql
SHOW GRANTS FOR 'gamecore'@'localhost';
EXIT;
```

You should see `ALL PRIVILEGES` in the output.ns

## Problem: Permission Error for Shadow Database

You're seeing this error:
```
Error: P3014
Prisma Migrate could not create the shadow database. 
User was denied access on the database `prisma_migrate_shadow_db_...`
```

This happens because the `gamecore` user doesn't have permission to create databases.

---

## Solution: Grant CREATE Permission to User

### Step 1: Find MySQL in Windows

1. Open **Command Prompt** (not bash) as Administrator
2. Type: `cd "/c/Program Files/MySQL/MySQL Server 8.0/bin/mysql" -u root -p"`
3. Type: `mysql -u root -p`
4. Enter your root password

### Step 2: Grant Permissions

Once you're in the MySQL prompt (you'll see `mysql>`), run these commands:

```sql
GRANT CREATE ON *.* TO 'gamecore'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Test the Connection

Back in Command Prompt, test that it works:

```cmd
mysql -u gamecore -p gamecore
```

Enter password: `gamecore1`

If successful, type `EXIT;`

### Step 5: Run Prisma Migration

Now go back to your bash terminal in VS Code and run:

```bash
cd /c/Users/natha/OneDrive/Desktop/SWE/201/gamecore
npx prisma migrate dev --name init
```

If it still fails, try with the skip flag:

```bash
npx prisma migrate dev --name init --skip-shadow-database-check
```

---

## Alternative Method: Using MySQL Workbench (GUI)

If you prefer a graphical interface:

1. Open **MySQL Workbench**
2. Connect to your local MySQL server (as root)
3. Click on **Server** → **Users and Privileges**
4. Find the `gamecore` user in the list
5. Go to the **Administrative Roles** tab
6. Check the box next to **DBManager** or manually add **CREATE** privilege
7. Click **Apply**
8. Close MySQL Workbench
9. Run `npx prisma migrate dev --name init` in your terminal

---

## Alternative Solution: Skip Shadow Database (Quick Fix)

If you can't grant CREATE permissions, you can skip the shadow database check:

```bash
npx prisma migrate dev --name init --skip-shadow-database-check
```

**Note:** This is not recommended for production but works for development.

---

## After Successful Migration

Once the migration succeeds, you should see:

```
✔ Generated Prisma Client
✔ The migration has been applied successfully
```

Then you can:

```bash
# View your database in a GUI
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

---

## Troubleshooting

### Can't Find mysql Command in Command Prompt

Add MySQL to Windows PATH:

1. Press `Win + X` and select **System**
2. Click **Advanced system settings**
3. Click **Environment Variables**
4. Under **System variables**, find **Path** and click **Edit**
5. Click **New** and add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
6. Click **OK** on all windows
7. **Close and reopen** Command Prompt
8. Type: `mysql --version` to verify

### Forgot Root Password

You'll need to reset it following MySQL's password reset procedure.

### Connection Refused Error

Make sure MySQL service is running:

1. Press `Win + R`
2. Type: `services.msc`
3. Find **MySQL80** in the list
4. Right-click and select **Start** if it's not running

---

## Next Steps After Migration

1. Create Prisma client utility (`lib/prisma.ts`)
2. Create API routes for users and games
3. Test the database connection
4. Add seed data (optional)

See `README.md` for full project setup instructions.
