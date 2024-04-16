export async function getToken(bodyValues: any) {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(bodyValues),
    });
    if (res.status === 201) {
      return await res.json();
    }
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}
