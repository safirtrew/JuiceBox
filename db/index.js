const { Client } = require("pg"); // imports the pg module
const { rows } = require("pg/lib/defaults");

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

module.exports = {
  client,
};

client.query(
  `
  INSERT INTO users (username, password) VALUES ($1, $2);
`,
  ["some_name", "some_password"]
);

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
      FROM users;
    `
  );

  return rows;
}

// and export them
module.exports = {
  client,
  getAllUsers,
};

// async function createUser({ username, password }) {
//   try {
//     const result = await client.query(`

//       `);

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

async function createUser({ username, password }) {
  try {
    const result = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2);
        ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// later
module.exports = {
  // add createUser here!
};
