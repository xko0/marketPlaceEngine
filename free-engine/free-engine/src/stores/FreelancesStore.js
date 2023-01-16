import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:3001/api"
// import.meta.env.VITE_API_URL;

export function createFreelancesStore() {
  return {
    loading: null,
    hasErrors: null,
    freelancesMalt: [],

    async getFreelances(infos) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/crawler`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loading = false
            console.log("in progress...")
            console.log(response.data)
            this.freelancesMalt = response.data
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
    // getFreelances() {
    //   console.log("test")
    //   axios.get(`${BASE_URL}/crawler`)
    //   .then((response) => {
    //     console.log("progressing")
    //     console.log(response.data)
    //     this.freelancesMalt = response.data
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    // },
  }
}