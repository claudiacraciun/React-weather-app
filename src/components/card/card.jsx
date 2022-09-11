import './card.css';

const Card = ({hour, iconSrc, temperature, feelsLike, windSpeed}) => {
    return (
        <div className="card-container">
            <h5>{hour}</h5>
            <img src={iconSrc} alt="weather-icon" />
            <p>Temperature: {temperature} &#8451;</p>
            <p>Feels like: {feelsLike} &#8451;</p>
            <p>Wind speed: {windSpeed} km/h </p>
        </div>
    )
}

export default Card;