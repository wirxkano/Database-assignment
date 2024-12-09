
export function splitName(fullName) {
  const nameParts = fullName.trim().split(" ");
  let lastName = "";
  let firstName = "";
  
  if (nameParts.length === 1) {
    firstName = nameParts[0]; 
    lastName = "";
  } else {
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(" ");
  }
  return { firstName, lastName };
}
