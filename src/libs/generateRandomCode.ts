function generateRandomCode(length: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
  const charactersLength = characters.length;
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    code += characters[randomIndex];
  }

  return code;
}

export default generateRandomCode;
