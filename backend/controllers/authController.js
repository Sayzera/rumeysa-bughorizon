import { loginUser, registerUser } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginData = await loginUser(username, password);
    res.status(201).json(loginData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await registerUser(username, password, email);
    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
