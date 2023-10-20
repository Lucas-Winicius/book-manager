/*
const searchBooksCaseInsensitive = async (searchTerm) => {
  const results = await prisma.$queryRaw`
      db.books.find({
        $or: [
          { name: { $regex: ${new RegExp(searchTerm, "i")} } },
          { author: { $regex: ${new RegExp(searchTerm, "i")} } },
          { category: { $regex: ${new RegExp(searchTerm, "i")} } }
        ]
      })
    `;
  return results;
};

// Exemplo de uso:
const searchTerm = "Termo_de_pesquisa"; // Você pode obter o termo do usuário
const results = await searchBooksCaseInsensitive(searchTerm);
console.log(results);
*/
