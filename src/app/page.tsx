"use client";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
	const [userInput, setUserInput] = useState<string>("");
	const workerRef = useRef<Worker>();
	const [dogPics, setDogPics] = useState<string[]>();

	useEffect(() => {
		workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
		workerRef.current.onmessage = (event: MessageEvent<string[]>) => setDogPics(event.data);
		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	const handleUserInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setUserInput(e.target.value);
		},
		[setUserInput]
	);

	const handleFetch = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			userInput && workerRef.current?.postMessage(userInput);
		},
		[userInput]
	);

	return (
		<div>
			<input
				placeholder="number of dogs"
				value={userInput}
				onChange={handleUserInputChange}
				className="mr-4 text-black"
			></input>
			<button className="bg-green-500 text-black rounded" onClick={handleFetch}>
				fetch
			</button>
			{dogPics && dogPics.map((pic) => <img key={pic} src={pic} alt="dog pic"></img>)}
		</div>
	);
}
