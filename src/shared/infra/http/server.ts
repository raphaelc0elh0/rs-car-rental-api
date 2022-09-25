import { app } from "./app";

export const appPort = 3333;
app.listen(appPort, () =>
  console.log(`Server is running on port: ${appPort} 🚀🚀🚀`)
);
