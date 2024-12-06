
export function splitName(fullName) {
  const nameParts = fullName.trim().split(" ");
  let lastName = "";
  let firstName = "";
  
  if (nameParts.length === 1) {
    lastName = nameParts[0]; 
    firstName = "";
  } else {
    lastName = nameParts[0];
    firstName = nameParts.slice(1).join(" ");
  }
  return { lastName, firstName };
}
