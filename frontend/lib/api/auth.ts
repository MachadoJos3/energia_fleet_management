export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Erro ao fazer login:", errorMessage);
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw new Error("Erro ao fazer login");
  }
};
