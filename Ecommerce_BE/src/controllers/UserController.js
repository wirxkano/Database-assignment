import { UserModel } from '~/models/UserModel';
import { generateAccessJWT } from '~/services/AuthServices';

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const result = await UserModel.register(firstName, lastName, email, password, confirmPassword);
    if (result) {
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid data' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);

    if (user) {
      let options = {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      };

      const token = generateAccessJWT(user.PersonID);
      res.cookie('SessionID', token, options);

      return res.status(200).json({ message: 'User logged in successfully', token: token });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('SessionID', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });

  return res.status(200).json({ message: 'You have been logged out' });
};

const getInfo = async (req, res) => {
  try {
    const user = await UserModel.getInfo(req.userId);

    if (user) {
      return res.status(200).json({ message: 'User information retrieved successfully', user: user });
    } else {
      return res.status(400).json({ message: 'Failed to get user information' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateInfo = async (req, res) => {
  try {
    const result = await UserModel.updateInfo(req.userId, req.body);

    if (result) {
      return res.status(200).json({ message: 'User information updated successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to update user information' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const result = await UserModel.deleteAccount(req.userId);

    if (result) {
      return res.status(200).json({ message: 'Account deleted' });
    } else {
      return res.status(400).json({ message: 'Failed to delete account' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UserController = {
  register,
  login,
  logout,
  getInfo,
  updateInfo,
  deleteAccount
};
