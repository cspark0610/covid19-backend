import CovidPosts from '../models/covidPost.js';
//import mongoose from 'mongoose';
import seedWithoutDisconnect from '../seed.js';

export const getSync = async (req, res) => {
	try {
		seedWithoutDisconnect();
		const posts = await CovidPosts.find();
		res.status(200).json({ message: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getAll = async (req, res) => {
	try {
		const posts = await CovidPosts.find();
		res.status(200).json({ message: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getBySearchQuery = async (req, res) => {
	const { country } = req.query;
	//console.log(country);

	try {
		const queryRegex = new RegExp(country, 'i');
		const posts = await CovidPosts.find({
			country: { $regex: queryRegex },
		});
		res.status(200).json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getByContinentQuery = async (req, res) => {
	const { continent } = req.query;
	//console.log(continent);

	try {
		const queryRegex = new RegExp(continent, 'i');
		const posts = await CovidPosts.find({
			continent: { $regex: queryRegex },
		});
		res.status(200).json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//getBySearchQeury will be reused in update controller
export const updateCountry = async (req, res) => {
  //will sent as an object new values of to add

 /*
	objectSended = {
		cases: { new: 15, active: 55 ....},
		deaths: { new : 155, total:  .....},
	}
*/
  const { country } = req.query;
  const { cases, deaths } = req.body;

  if (!country)
    res.status(404).json({ message: "the country does not exists" });

  try {
    const foundCountry = getBySearchQuery(country);

    console.log(foundCountry);
    console.log(cases);
    console.log(deaths);

    const id = foundCountry._id;
    const updatedCountry = {
      _id: id,
      continent: foundCountry.continent,
      country: foundCountry.continent,
      population: foundCountry.population,
      cases: JSON.stringify(cases),
      deaths: JSON.stringify(deaths),
      tests: foundCountry.tests,
      day: new Date().toISOString().split("T")[0],
      time: new Date().toISOString()
    };
    await CovidPosts.findByIdAndUpdate(id, updatedCountry, { new: true });
    res.status(204).json({ message: updatedCountry });
  } catch (error) {
    console.log(error);
  }
};
