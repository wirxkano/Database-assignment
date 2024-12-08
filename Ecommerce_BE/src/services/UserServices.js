export const formatUserData = (rows) => {
  if (rows.length === 0) {
    throw new Error('User not found');
  }

  const user = {
    fullName: `${rows[0].LastName} ${rows[0].FirstName}`,
    gender: rows[0].Gender || 'N/A',
    dob: rows[0]?.DOB?.toISOString()?.split('T')[0] || 'N/A',
    phone: rows[0].PhoneNumber || 'N/A',
    email: rows[0].Email,
    addresses: rows
      .filter(row => row.Street !== null)
      .map(row => ({
        street: row.Street,
        commune: row.Commune,
        district: row.District,
        city: row.City,
      }))
  }

  if (!user.addresses.length) {
    user.addresses = [];
  }


  return user;
};
