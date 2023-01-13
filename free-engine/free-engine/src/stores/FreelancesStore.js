//import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:3001/api"
// import.meta.env.VITE_API_URL;

export function createFreelancesStore() {
  return {
    // loading: null,
    // hasErrors: null,
    freelances: [],

    // async getFreelances() {
    //   runInAction(() => {
    //     this.loading = true
    //     this.hasErrors = false
    //   })
    //   try {
    //     let response = await axios.get(`${BASE_URL}/crawler`)
    //     if (response.data) {
    //       runInAction(() => {
    //         this.loading = false
    //         this.freelances = response.data
    //       })
    //     }    
    //   } catch(error) {
    //     console.error(error)
    //   }
    // },
    getFreelances() {
      console.log("test")
      axios.get(`${BASE_URL}/crawler`)
      .then((response) => {
        console.log("progressing")
        console.log(response.data)
        let infos = response.data
        //this.freelances = response.data.result
      })
      .catch((error) => {
        console.error(error)
      })
    },
  }
}