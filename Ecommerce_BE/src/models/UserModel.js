import { getConnection, sql } from "~/config/connectDB";

const register = async (firstName, lastName, email, password, confirmPassword) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input("FirstName", sql.NVarChar, firstName)
      .input("LastName", sql.NVarChar, lastName)
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .input("PasswordConfirmation", sql.NVarChar, confirmPassword)
      .execute("InsertNewCustomer");
    
    return result.recordset;
  } catch (err) {
    console.error("Error:", err);
  }

  return result.recordset;
};

const login = async (email, password) => {
  const pool = getConnection();
  const result = await pool
    .request()
    .input("Email", sql.VarChar, email)
    .input("Password", sql.VarChar, password)
    .execute("loginUser");

  return result.recordset;
};

export const UserModel = {
  register,
  login
};
