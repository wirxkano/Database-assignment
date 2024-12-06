import { UserModel } from '~/models/UserModel';

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        await UserModel.register(firstName, lastName, email, password, confirmPassword);

        return res.status(200).json({ status: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await UserModel.login(email, password);

        return res.status(200).json({ status: true, message: "User logged in successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const UserController = {
    register,
    login
};
