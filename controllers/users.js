import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
	//console.log('req.body', req.body);
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });

		//console.log('existingUser', existingUser);
		if (!existingUser) res.status(404).json({ message: 'user no existe' });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials' });
		//cuando recien pasan estas dos validaciones de ususario y password correcto seteo el token
		//que luego voy a mandar al front-end. con el metodo .sign()
		const token = jwt.sign({ email: existingUser, id: existingUser._id }, 'test', { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: 'something went wrong!!' });
	}
};

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		console.log('existingUser', existingUser);

		if (existingUser) res.status(404).json({ message: `user email ${existingUser.email} already exists` });
		if (password !== confirmPassword) res.status(404).json({ message: 'password and confirmpassword are not equal!!' });

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
		//una vez que me creo el ususario tengo que crear el token;

		const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'something went wrong' });
	}
};
