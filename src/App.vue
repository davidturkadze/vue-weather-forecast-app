<template>
  <div id="app" class="dashboard">
    <aside class="sidebar">
      <section class="search">
        <!--<input
          type="text"
          ref="search__input"
          class="search__input"
          placeholder="Enter your location..."
          @keyup.enter="getWeatherData"
        />-->
        <places
          class="search__input"
          ref="search__input"
          v-model="location"
          @keyup.enter="organizeAllDetails"
          placeholder="Enter your location..."
          @change="val => { location = val }"
          :options="options"
        ></places>
        <button class="search__btn" type="submit" @click="organizeAllDetails">
          <i class="fas fa-search"></i>
        </button>
      </section>

      <section class="location">
        <div class="location__city">{{currentWeather.full_location}}</div>
        <div class="location__latLng">
          Lat: {{lat}}
          <br />
          Long: {{long}}
        </div>
        <div class="location__datetime">
          <i class="fas fa-calendar-alt"></i>
          {{currentWeather.time | moment("DD.MM.YYYY, H:mm")}}
        </div>
      </section>

      <section class="current">
        <div class="current__conditions">{{currentWeather.conditions}}
          <img class="current__icon" :src="currentWeather.iconURL" alt=""/>
        </div>
        <div class="current__temp">
          {{currentWeather.temp}}
          <span>°C</span>
        </div>
        <div class="high-low"> dummy 13 °C / 5 °C</div>
      </section>
    </aside>
    <main class="content">
      <Dashboard :hourlyTemp="hourlyTemp" :highlights="highlights" />
    </main>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard";
//import gmapsInit from "./utils/gmaps";
import Places from "vue-places";

export default {
  name: "App",
  components: {
    Dashboard,
    Places
  },
  data() {
    return {
      options: {
        appId: process.env.VUE_APP_ALGOLIA_APP_ID,
        apiKey: process.env.VUE_APP_ALGOLIA_API_KEY,
        type: "city",
        aroundLatLngViaIP: false
      },

      location: "",
      lat: "",
      long: "",
      fetchedWeatherData: "",
      currentWeather: {
        full_location: "",
        time: "",
        conditions: "",
        iconURL: "",
        temp: "",
        currentHighLow: {
          currentHigh: "",
          currentLow: ""
        }
      },

      hourlyTemp: {
        hourly: []
      },

      highlights: {
        uvindex: "3",
        windstatus: {
          speed: "20 km/h",
          direction: "N-E"
        },
        visibility: "12 km"
      }
    };
  },
  methods: {
    async organizeAllDetails() {
      await this.fetchGeoCoordinates();
      await this.fetchWeatherData();
      this.getCurrentWeatherInfo();
      this.clearInput();
    },
    async fetchGeoCoordinates() {
      this.enteredLocation();
      this.currentWeather.full_location = this.location;
      //let loc = this.location;
      const mapquest_key = process.env.VUE_APP_MAPQUEST_API_KEY;
      const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=${this.currentWeather.full_location}`);
      const location_data = await res.json();
      if (location_data.info.statuscode == 0) {
        this.currentWeather.full_location = location_data.results[0].providedLocation.location;
        this.lat = location_data.results[0].locations[0].latLng.lat;
        this.long = location_data.results[0].locations[0].latLng.lng;
      } else {
        console.error("error fetching geo coordinates");
      }
    },
    async fetchWeatherData() {
      const openweathermap_key = process.env.VUE_APP_OPENWEATHERMAP_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=minutely,daily&appid=${openweathermap_key}`
      );
      return (this.fetchedWeatherData = await res.json());
    },
    getCurrentWeatherInfo() {
      this.currentWeather.time = this.fetchedWeatherData.current.dt;
      this.currentWeather.temp = this.KelvinToCel(this.fetchedWeatherData.current.temp);
      this.currentWeather.conditions = this.fetchedWeatherData.current.weather[0].main;
      this.currentWeather.iconURL = this.convertIconCodeToImageURL(this.fetchedWeatherData.current.weather[0].icon);
    },
    //helper methods
    enteredLocation() {
      var input = this.$refs.search__input;
      if (input.value === "") {
        this.location = "New York, USA";
      } else {
        this.location = this.capitalizeFirstLetter(input.value);
      }
      //this.clearInput();
    },
    clearInput() {
      
      this.location = "";
    },
    locationInput() {
      let input = this.$refs.search__input.value;
    },
    capitalizeFirstLetter(str) {
      str = str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return str;
    },
    KelvinToCel: function(tempInKelvin) {
      let tempInCelcius = (tempInKelvin - 273.15).toFixed(0);
      return tempInCelcius;
    },
    convertIconCodeToImageURL(iconcode) {
       let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       return iconurl;
    }
  },
  computed: {},
  async mounted() {
    await this.organizeAllDetails();
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>
