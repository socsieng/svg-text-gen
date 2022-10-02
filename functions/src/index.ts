import * as functions from 'firebase-functions';
import express from 'express';

const app = express();

app.get('/chip/:text', (req, res) => {
	const { text, width, height, radius, color, bgColor, fontSize } = {
		width: '80',
		height: '24',
		radius: '5',
		color: '#ffffff',
		bgColor: '#000000',
		fontSize: '12',
		text: req.params.text,
		...req.query,
	};

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
	<rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="${bgColor}" />
	<g width="${width}" height="${height}" text-anchor="middle" dominant-baseline="middle" fill="${color}">
		<text width="${width}" height="${height}" x="50%" y="52%" font-family="Helvetica,Arial,sans-serif" font-size="${fontSize}">${text}</text>
	</g>
</svg>`;

	res.status(200).header('content-type', 'image/svg+xml').send(svg);
});

const firebaseApp = functions.https.onRequest(app);

export { firebaseApp };
