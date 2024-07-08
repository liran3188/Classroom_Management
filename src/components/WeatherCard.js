//React
import React from 'react'
import { useQuery } from 'react-query'
//MUI
import Card from '@mui/material/Card';
import BoltIcon from '@mui/icons-material/Bolt';
import CloudIcon from '@mui/icons-material/Cloud';
import LightModeIcon from '@mui/icons-material/LightMode';
import { blue, lightBlue, yellow } from '@mui/material/colors';


const API_KEY = '2b8f9125f5d80c073814fd9c22a7625b';
const LANG = 'he'
const UNITS = 'metric'

export default function WeatherCard({ location }) {


    const fetchLocationInfo = async (location) => {
        const lat = location.coord.lat;
        const lon = location.coord.lon;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`);
        return await res.json();
    };

    const { data, status } = useQuery(['location', location.name], () => fetchLocationInfo(location));

    const icon =() => {
        const temp = data?.main.feels_like;

        if (temp< 20){
            return (
                <BoltIcon className="icon" fontSize="large" sx={{ color: blue[900] }} />
            )
        }
        else if (temp< 30) {
            return (
                <CloudIcon className="icon" fontSize="large" sx={{ color: lightBlue[400] }} />
            )
        }
        else {
            return (
                <LightModeIcon className="icon" fontSize="large" sx={{ color: yellow[400] }} />
            )
        }
    }

    return (
        <Card className="card">
            <div className='top'>
                {icon()}
                <div className='right'>
                    <h1 className="Name">
                        {data?.name}
                    </h1>
                    <h4 className='desc'>
                        {data?.weather[0].description}
                    </h4>
                </div>
            </div>
            <div className='bottom'>
                <div className='titles'>
                    <h4>טמפ' נמדדת</h4>
                    <h4>טמפ' מורגשת</h4>
                    <h4>לחות</h4>
                </div>
                <div className='values'>
                <h1>{Math.round(data?.main.temp)}°C</h1>
                <h1>{Math.round(data?.main.feels_like)}°C</h1>
                <h1>{data?.main.humidity}%</h1>
                </div>
            </div>
        </Card>
    )
}
