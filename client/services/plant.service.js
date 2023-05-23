module.exports.plantService = {
  getPlants: async () => {
    const plants = await fetch("http://localhost:8000/plants", {
      method: "GET",
    });
    return plants;
  },
};
