import jwt from 'jsonwebtoken';

const secret = 'test';

export const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || null;
		let decodedData;

		if (token) {
			decodedData = jwt.verify(token, secret);
			req.userId = decodedData?.id;
		} 
		//else {
		//	decodedData = jwt.decode(token);
		//	req.userId = decodedData?.sub;
		//}
		next();
	} catch (error) {
		console.log(error);
	}
};
