import { Database } from 'bun:sqlite';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { users } from './schema';

// Initialize the SQLite database
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

// Create the users table if it doesn't exist
async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `;
  // Use sqlite.run instead of db.session.run
  sqlite.run(createTableQuery);
}

// Function to seed the database
async function seedDatabase() {
  await createUsersTable();

  const existingUsers = await db.select().from(users).where(eq(users.id, 1)).all();
  
  if (existingUsers.length === 0) {
    await db.insert(users).values([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'Larry Doe' },
      { id: 4, name: 'Mike Key' },
    ]);
    console.log('Database seeded');
  } else {
    console.log('Database already seeded');
  }
}

// Seed the database
seedDatabase().catch(console.error);

export { users };
