import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNewsArticles } from './api'

function LikeCounter() {
	const [count, setCount] = useState(0);
	const [superCount, setSuperCount] = useState(0);

	const superIncrement = () => {
		if (superCount < 2) {
			setCount((oldCount) => oldCount + 10);
			setSuperCount((oldSuperCount) => oldSuperCount + 1);
		}
	}

	const increment = () => {
		setCount((oldCount) => oldCount + 1);
	}

	const decrement = () => {
		setCount((oldCount) => oldCount - 1);
	}

	return (
		<div>
			<p>Like Count: {count}</p>
			<button onClick={superIncrement}>Super Like</button>
			<button onClick={increment}>Like</button>
			<button onClick={decrement}>Dislike</button>
		</div>
	);
}

function HeadLine(props) {
	return (
		<div>
			<h1>{props.title}</h1>
			<LikeCounter />
		</div>
	);
}

function App() {
	const { loading, headlines, error } = useNewsArticles();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Something went wrong: {error.message}</p>;
	}

	return (
		<div className="App">	
			{headlines.map((headline) => (
				<HeadLine key={headline.url} title={headline.title} />
			))}
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
