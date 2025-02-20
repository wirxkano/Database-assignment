import { getConnection, sql } from '~/config/connectDB';
import { formatUserData } from '~/services/UserServices';

const createNewCartAndWishlist = async(customerId) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, customerId)
      .query(`
        INSERT INTO Cart (CustomerID)
        VALUES (@CustomerID)
        INSERT INTO WishList (CustomerID)
        VALUES (@CustomerID)
      `);
    
    if (result.rowsAffected.length >= 0) {
      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    
    throw new Error(err.message)
  }
};

const register = async (firstName, lastName, email, password, confirmPassword) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('FirstName', sql.NVarChar, firstName)
      .input('LastName', sql.NVarChar, lastName)
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarChar, password)
      .input('PasswordConfirmation', sql.VarChar, confirmPassword)
      .output('PersonID', sql.Int)
      .execute('InsertNewPerson');

    const customerId = result.output.PersonID;
    
    if (customerId) {
      const cartCreated = await createNewCartAndWishlist(customerId)
      return cartCreated;
    }

    return false;
  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
};

const login = async (email, password) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarChar, password)
      .execute('AuthenticateUser');
    
    if (result.recordset.length > 0) {
      return result.recordset[0];
    }
    return null;

  } catch (error) {
    throw new Error(err.message)
  }
};

const getInfo = async (id) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('PersonID', sql.Int, id)
      .query(`
        SELECT FirstName, LastName, Gender, DOB, Email, PhoneNumber, Street, Commune, District, City, Rank
        FROM Person P
        LEFT JOIN PersonAddress PA ON P.PersonID = PA.PersonID
        LEFT JOIN Customer C ON P.PersonID = C.CustomerID
        WHERE P.PersonID = @PersonID
      `);
    if (result.recordset.length > 0) {
      return formatUserData(result.recordset);
    }
    return null;

  } catch (error) {
    console.log(error);

    throw new Error(err.message)
  }
};

const updateInfo = async (id, data) => {
  const pool = getConnection();
  try {
    const addressChanges = new sql.Table();
    addressChanges.columns.add('Action', sql.NVarChar(10));
    addressChanges.columns.add('Street', sql.NVarChar(255));
    addressChanges.columns.add('Commune', sql.NVarChar(255));
    addressChanges.columns.add('District', sql.NVarChar(255));
    addressChanges.columns.add('City', sql.NVarChar(255));

    data.addressChanges.forEach((change) => {
      addressChanges.rows.add(
        change.action,
        change.data?.street || null,
        change.data?.commune || null,
        change.data?.district || null,
        change.data?.city || null
      );
    });

    const result = await pool
      .request()
      .input('PersonId', sql.Int, id)
      .input('LastName', sql.NVarChar, data.lastName)
      .input('FirstName', sql.NVarChar, data.firstName)
      .input('Gender', sql.Bit, data.gender === 'N/A' ? null : data.gender)
      .input('DOB', sql.Date, data.dob === 'N/A' ? null : data.dob)
      .input('Password', sql.NVarChar, data?.password ?? null)
      .input('PhoneNumber', sql.NVarChar, data.phone === 'N/A' ? null : data.phone)
      .input('AddressChanges', addressChanges)
      .execute('UpdatePerson');

    if (result.returnValue >= 0) {
      return 1;
    }

    return 0;
  } catch (error) {
    console.log(error);

    throw new Error(err.message)
  }
};

const deleteAccount = async (id) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('PersonID', sql.Int, id)
      .execute('DeletePerson');

    if (result.returnValue >= 0) {
      return 1;
    }
    return 0;

  } catch (error) {
    console.log(error);

    throw new Error(err.message)
  }
};

export const UserModel = {
  register,
  login,
  getInfo,
  updateInfo,
  deleteAccount
};
