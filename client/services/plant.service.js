export const plantService = {
  getPlants: async () => {
    const plants = JSON.parse(JSON.stringify(await (await fetch("http://localhost:8000/plants", { method: "GET" })).json()));
    console.log(plants);
    return plants;
  },
};