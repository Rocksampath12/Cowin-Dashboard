// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

class CowinDashboard extends Component {
  state = {
    status: 'Loading',
    lastSevenDaysVaccinationData: [],
    VaccinationByAgeData: [],
    VaccinationByGenderData: [],
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    let url = 'https://apis.ccbp.in/covid-vacination-data'
    let response = await fetch(url)

    // console.log(response.ok)

    // working on response.ok

    if (response.ok === true) {
      //successful fetch
      /************ */
      let data = await response.json()
      let lastSevenDaysVaccination = data.last_7_days_vaccination.map(obj => {
        let obj1 = {
          vaccineDate: obj.vaccine_date,
          dose1: obj.dose_1,
          dose2: obj.dose_2,
        }
        return obj1
      })
      let VaccinationByAge = data.vaccination_by_age.map(obj => {
        let obj1 = {
          age: obj.age,
          count: obj.count,
        }
        return obj1
      })
      let VaccinationByGender = data.vaccination_by_gender.map(obj => {
        let obj1 = {
          count: obj.count,
          gender: obj.gender,
        }
        return obj1
      })
      this.setState({
        status: 'Fulfilled',
        lastSevenDaysVaccinationData: lastSevenDaysVaccination,
        VaccinationByAgeData: VaccinationByAge,
        VaccinationByGenderData: VaccinationByGender,
      })
      console.log(lastSevenDaysVaccination)
      console.log(VaccinationByAge)
      console.log(VaccinationByGender)
    } else {
      //unsuccessful fetch
      /************ */
      this.setState({status: 'Rejected'})
    }
  }

  renderData = () => {
    let {
      status,
      lastSevenDaysVaccinationData,
      VaccinationByAgeData,
      VaccinationByGenderData,
    } = this.state
    if (status === 'Loading') {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
      )
    } else if (status === 'Rejected') {
      console.log('Rejected')
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="error-img"
          />
        </div>
      )
    } else {
      // return data
      console.log('Printing Data..')
      console.log(lastSevenDaysVaccinationData)
      console.log(VaccinationByAgeData)
      console.log(VaccinationByGenderData)
      return <h1>Printing Data, it is still in process</h1>
    }
  }

  render() {
    //it re render while state is Rejected / Fulfilled
    //lets do while Rejected
    let {status} = this.state
    console.log(status)
    return (
      <div className="cowin-dashboard-container">
        <div className="cowin-dashboard-box">
          <div className="website-logo-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="website-logo-para">Co-WIN</p>
          </div>
          <h1 className="cowin-dashboard-heading">
            CoWIN Vaccination in India
          </h1>
        </div>
        {this.renderData()}
        // status = Loading or Fulfilled or Rejected
      </div>
    )
  }
}

export default CowinDashboard
