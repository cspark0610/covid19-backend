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
