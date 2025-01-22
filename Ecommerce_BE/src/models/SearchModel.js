import { getConnection, sql } from '~/config/connectDB';

const getSearchProductHistory = async (id) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, id)
      .query(`
        SELECT SearchKeywords
        FROM CustomerSearchKeywords C
        WHERE C.CustomerID = @CustomerID
      `);

    if (result.recordset.length > 0) {
      return result.recordset;
    }

    return null;
  } catch (err) {
    console.log(err);
    
    throw new Error(err);
  }
};

const storeSearchProductHistory = async (id, data) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, id)
      .input('Keyword', sql.NVarChar, `${data.keyword}`)
      .execute('AddKeywordIfNotExists');
        
    if (result.rowsAffected.length >= 0) {
      return true;
    }
    return null;
  } catch (err) {
    console.log(err);

    throw new Error(err)
  }
};

export const SearchModel = {
  getSearchProductHistory,
  storeSearchProductHistory
};
