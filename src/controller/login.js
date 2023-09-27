const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  // cadastro
  async registerUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    // confere se tem nome
    if (!name)
      return res.status(422).json({ message: "por favor forneça um nome" });

    // confere se tem email
    if (!email)
      return res.status(422).json({ message: "por favor forneça um email" });

    // confere se tem senha
    if (!password)
      return res.status(422).json({ message: "por favor entre com a senha" });

    // confere se a senha e a confirmação são iguais
    if (password !== confirmPassword)
      return res.status(422).json({ message: "senhas não compatíveis" });

    // confere se o usuário existe
    const userExists = await User.findOne({ email: email });

    if (userExists) return res.status(422).json({ message: "email já em uso" });

    //cria senha
    const salt = await bycript.genSalt(12);
    const passwordHash = await bycript.hash(password, salt);

    // cria usuario
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();

      res.status(201).json({ message: "usuario criado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // login
  async createSession(req, res) {
    const { email, password } = req.body;

    if (!email)
      return res.status(422).json({ message: "por favor forneça um email" });

    if (!password)
      return res.status(422).json({ message: "por favor forneça uma senha" });

    // confere se o usuário existe
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({ message: "usuario não encontrado" });

    // compara a senha que o usuário digitou com a senha que está no banco de dados
    const checkPassword = await bycript.compare(password, user.password);

    if (!checkPassword)
      return res.status(422).json({ message: "senha inválida" });

    //criação do token para o usuário logar
    try {
      const secret =
        "FA8SH8FAH8FA8H8R213FG40G480FQH80FG80HWT435AWE" || process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      return res
        .status(200)
        .json({ message: "autenticado com sucesso!", token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // confere se token é válido
  async checkToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "acesso negado" });

    try {
      const secret =
        "FA8SH8FAH8FA8H8R213FG40G480FQH80FG80HWT435AWE" || process.env.SECRET;

      jwt.verify(token, secret);

      next();
    } catch (error) {
      res.status(400).json({ message: "token inválido" });
    }
  },
};
