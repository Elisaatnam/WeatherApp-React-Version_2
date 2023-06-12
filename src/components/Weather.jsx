import { useEffect, useState } from "react";

const Weather = () => {
	const apiKey = "eabd3eef10b0545bfc55df4e5956ed72";
	const [city, setCity] = useState("Bremen");
	const [weatherData, setWeatherData] = useState();
	const [weatherDescription, setWeatherDescription] = useState();
	const [icon, setIcon] = useState();
	const [temp, setTemp] = useState();
	const [wind, setWind] = useState();

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&units=metric&appid=${apiKey}`,
		)
			.then(res => res.json())
			.then(data => {
				setWeatherData(data);
				setWeatherDescription(weatherData.weather[0].description);
				setIcon(weatherData.weather[0].icon);
				setTemp(Math.round(weatherData.main.temp));
				setWind(Math.round(weatherData.wind.speed * 3.701));
			})
			.catch(err => console.log("Fehler:", err));
		//WICHTIG Dependency muss rein!!!! wird immer dann ausfefuerht wenn sich city aendert
	}, [city]); // Das useEffect-Array enthält jetzt die Abhängigkeit 'city'

	const changeCity = () => {
		event.preventDefault();
		setCity(event.target.text);
	};

	return (
		<>
			<header>
				<nav>
					<a onClick={changeCity} href='/'>
						Bremen
					</a>
					<a onClick={changeCity} href='/'>
						Düsseldorf
					</a>
					<a onClick={changeCity} href='/'>
						Berlin
					</a>
					<a onClick={changeCity} href='/'>
						Leipzig
					</a>
				</nav>
			</header>
			<article>
				<div className='icon-div'>
					{weatherDescription} in {city}{" "}
					<img src={`http://openweathermap.org/img/w/${icon}.png`} alt='' />
				</div>
				<div className='temp-div'>Temparatur: {temp} °C</div>
				<div className='wind-div'>Wind: {wind}km/h</div>
			</article>
		</>
	);
};

export default Weather;
