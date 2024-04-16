export async function getUserInfo(token: any) {
  try {
    const userApi = await fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token?.access_token!}`,
        },
      }
    );

    if (userApi.status === 200) {
      const userInfo = await userApi.json();
      const { password, ...user } = userInfo;
      return user;
    }
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}
