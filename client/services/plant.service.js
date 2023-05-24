let url = 'https://jkxmi2efvf.execute-api.af-south-1.amazonaws.com';

export const plantService = {
  getPlants: async () => {
    const plants = JSON.parse(JSON.stringify(await (await fetch(url + "/plants", { method: "GET" })).json()));
    return plants;
  },
};