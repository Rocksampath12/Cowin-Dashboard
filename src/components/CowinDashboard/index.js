// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

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
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    // console.log(response.ok)

    // working on response.ok

    if (response.ok === true) {
      // successful fetch
      /** ********** */
      const data = await response.json()
      const lastSevenDaysVaccination = data.last_7_days_vaccination.map(obj => {
        const obj1 = {
          vaccineDate: obj.vaccine_date,
          dose1: obj.dose_1,
          dose2: obj.dose_2,
        }
        return obj1
      })
      const VaccinationByAgeArray = data.vaccination_by_age.map(obj => {
        const obj1 = {
          age: obj.age,
          count: obj.count,
        }
        return obj1
      })
      const VaccinationByGenderArray = data.vaccination_by_gender.map(obj => {
        const obj1 = {
          count: obj.count,
          gender: obj.gender,
        }
        return obj1
      })
      this.setState({
        status: 'Fulfilled',
        lastSevenDaysVaccinationData: lastSevenDaysVaccination,
        VaccinationByAgeData: VaccinationByAgeArray,
        VaccinationByGenderData: VaccinationByGenderArray,
      })
    } else {
      // unsuccessful fetch
      /** ********** */
      this.setState({status: 'Rejected'})
    }
  }

  renderData = () => {
    const {
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
    }
    if (status === 'Rejected') {
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
    }
    // return data
    console.log('Printing Data..')
    console.log(VaccinationByGenderData)
    return (
      <>
        <h1 className="cowin-dashboard-heading">Vaccination Coverage</h1>
        <VaccinationCoverage
          lastSevenDaysVaccinationData={lastSevenDaysVaccinationData}
        />
        <h1 className="cowin-dashboard-heading">Vaccination by gender</h1>
        <VaccinationByGender
          VaccinationByGenderData={VaccinationByGenderData}
        />
        <h1 className="cowin-dashboard-heading">Vaccination by age</h1>
        <VaccinationByAge VaccinationByAgeData={VaccinationByAgeData} />
      </>
    )
  }

  render() {
    // it re render while state is Rejected / Fulfilled
    // lets do while Rejected
    const {status} = this.state
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
      </div>
    )
  }
}

export default CowinDashboard
