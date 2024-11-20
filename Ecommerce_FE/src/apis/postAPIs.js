
export async function loginAction({ request }) {
  const formData = await request.formData()
  console.log(Object.fromEntries(formData));
  
  return 0;
}

export async function registerAction({ request }) {
  const formData = await request.formData()
  console.log(Object.fromEntries(formData));

  return 0;
}
