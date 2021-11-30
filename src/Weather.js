import React, { Component } from 'react'
import axios from 'axios';

var styles = {
    container:{
        
            width: 700,
            height: 'auto', 
            margin: 'auto', 
            position:'relative', 
            border: 'solid', 
            overflow: 'hidden',
            fontSize: 14,

        },
        leftSide:{
            clear:'both', 
            float:'right', 
            textAlign: 'right', 
            margin: 0, 
            paddingRight: 10, 
    
        },
        rightSide:{
            clear:'both', 
            float:'left', 
            textAlign: 'right', 
            margin: 0, 
            paddingRight: 10, 
        },

        container1:{
            clear:'both', 
            float:'left', 
            margin:0, 
            paddingLeft: 10, 
            fontSize: 10, 
            paddingBottom: 20, 
            textAlign:'center',
            
      
        },
        container2:{
            clear:'both', 
            float:'left',
            marginLeft: 40,
            left: 0, 
            right: '65%', 
            bottom: '33%',
            fontSize: 14,
        
        },
        container3:{
            float:'left',
            marginLeft: 90,
            left: 0, 
            right: '65%', 
            bottom: '33%',
            fontSize: 14,
        
        },
        container4:{
            float:'left',
            marginLeft: 90,
            left: 0, 
            right: '65%', 
            bottom: '33%',
            fontSize: 14,
        
        
        },
        temp:{
            clear:'both', 
            width: 200, 
            height: 250, 
            margin: 'auto', 
            backgroundColor: 'white', 
            overflow: 'hidden', 
            position: 'relative'
          
        }

}
const API_KEY = '7499091251c4432952ada7e5c207059e';

export default class Weather extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             weather: [],
        }
    }

    getDay = () => {
        let d = new Date()
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
    
        let date = d.getDate();
    
        let month = months[d.getMonth()];
    
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    getTime = () => {
        let currentTime = this.state.data.dt

        let date = new Date(currentTime * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    getSunrise = () => {
        let sunriseTime = this.state.data.sys.sunrise
        var date = new Date(sunriseTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    getSunset = () => {
        let sunsetTime = this.state.data.sys.sunset
        var date = new Date(sunsetTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data: res.data,
                weather: res.data.weather
            })
        })
        .catch(error => console.log(error))
    }

    getColor = (id) => {
            if (id >= 200 && id <= 500){
                return 'red'
            }
            if (id >= 500 && id <= 599){
                return 'green'
            }
            if (id >= 600 && id <= 699){
                return 'purple'
            }

            if (id >= 700 && id <= 900){
                return 'blue'
            }
        
        }


    render() {
        return (
            <div style={styles.container}>
                
                <h1>{this.getColor()}</h1>
                {
                    this.state.weather.map(w => (
    <>
                        <p style={styles.leftSide}>{this.getDay()}</p>
                       {/* location and sys country*/}
                        <p style={styles.rightSide}>{this.state.data.name}, {this.state.data.sys.country}</p>
                        {/* coordinate */}
                        <p style={styles.leftSide}>Lon: {(this.state.data.coord.lon).toFixed(1)} Lat: {(this.state.data.coord.lat).toFixed(1)}</p>
                        {/* base */}
                        <p style={styles.rightSide}>Base: {this.state.data.base}</p>
                        {/* visibility */}
                        <p style={styles.leftSide}>Visbility: {this.state.data.visibility}</p>
                        {/* sys type and id */}
                        <p style={styles.rightSide}>Sys Type: {this.state.data.sys.type}- Sys ID: {this.state.data.sys.id} -DT: {this.state.data.dt}</p>
                         {/* sys type and id */}
                        <p style={styles.leftSide}>ID {this.state.data.id} - COD {this.state.data.cod}</p>
                         {/* sys type and id */}
                        <p style={styles.rightSide}>Timezone: {this.state.data.timezone}</p>

                        <div style={styles.temp}>
                             {/* main temp, min, max, feel like and weather id main,icon, discription */}
                            <img style={{float: 'left', margin: 0, padding: 0}} src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt={'icon'}></img>
                            <p style={{color: `${this.getColor(w.id)}`}}>{(this.state.data.main.temp-273.15).toFixed(2)} °C</p>
                            <p>Weather id:{w.id}</p>
                            <p>{w.main}</p>
                            <p>{w.description}</p>
                            <p>&#8595; {(this.state.data.main.temp_min-273.15).toFixed(2)}&#176;C</p>
                            <p>&#8593; {(this.state.data.main.temp_max-273.15).toFixed(2)}&#176;C</p>
                            <p>Feels Like: {(this.state.data.main.feels_like-273.15).toFixed(2)}&#176;C</p>
                        </div>

                        <div style={styles.container2} >
                            {/* sys sunrise and sunset*/}
                            <p style={{color: `${this.getColor(w.id)}`}}>Sunrise : {this.getSunrise()}</p>
                            <p style={{color: `${this.getColor(w.id)}`}}>Sunset :{this.getSunset()}</p>
                    
                        </div>
                        
                        <div style={styles.container3}>
                            {/* sys sunrise and sunset*/}
                            <p style={{color: `${this.getColor(w.id)}`}}>Gust Speed: {this.state.data.wind.gust}m/s</p>
                            <p style={{color: `${this.getColor(w.id)}`}}>Wind Degree: {this.state.data.wind.deg}&#176; </p>
                            <p style={{color: `${this.getColor(w.id)}`}}>Wind Speed: {this.state.data.wind.speed}m/s</p>
                        </div>

                        <div style={styles.container4} >
                            {/* main pressure and humidity*/}
                            <p style={{color: `${this.getColor(w.id)}`}}>Humidity: {this.state.data.main.humidity}%</p>
                            <p style={{color: `${this.getColor(w.id)}`}}>Pressure:{this.state.data.main.pressure}hpa</p>
                            {/* clouds and snow*/}
                            <p style={{color: `${this.getColor(w.id)}`}}>Clouds : {this.state.data.clouds.all}%</p>
                            <p style={{color: `${this.getColor(w.id)}`}}>Snow : {this.state.data.snow}1</p>
                        </div>
                        </>
                    ))
                }
            </div>
        )
    }
}
   
