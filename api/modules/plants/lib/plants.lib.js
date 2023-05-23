plants = [{}];

module.exports.plantsLibrary = {
  getPlants: () => {
    return this.plants;
  },
  saveAllPlants: (plants) => {
    this.plants = plants;
  },
  getPlantsById: (plantIds) => {
    const plant = this.plants.find((plant) => plantIds.includes(plant.plantId));
    return plant;
  },
  addPlants: (plant) => {
    this.plants.push(plant);
  },
};
