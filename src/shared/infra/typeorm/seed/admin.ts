import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXXX')
    `
  );

  await connection.close();
}

create()
  .then(() => console.log("User admin created!"))
  .catch((error) => console.log("Error while creating user admin! \n", error));
