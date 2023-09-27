const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Credenciais
const dbUser = "Paulo" || process.env.DB_USER;
const dbPass = "paulo1234" || process.env.DB_PASS;
const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Está rodando" });
});

async function main() {
  const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.bejkqja.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose
    .connect(uri)
    .then(() => {
        app.listen(port, () => {
            console.log("######################################################");
            console.log(`[*] API em execução em >> http://localhost:${port}`);
            console.log("######################################################");
          });
      console.log("conectou ao banco!");
    })
    .catch((error) => console.log(error));
}

main();
