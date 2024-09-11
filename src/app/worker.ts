self.onmessage = async (e: MessageEvent<string>) => {
	const url = `https://dog.ceo/api/breeds/image/random/${e.data}`;
	const response = await fetch(url).then((res) => res.json());
	// {
	// 	"message": [
	// 		"https://images.dog.ceo/breeds/terrier-kerryblue/n02093859_2699.jpg",
	// 		"https://images.dog.ceo/breeds/mastiff-indian/Indian_Mastiff.jpg",
	// 		"https://images.dog.ceo/breeds/retriever-golden/Z6A_4928_200816.jpg"
	// 	],
	// 	"status": "success"
	// }
	self.postMessage(response.message);
};
