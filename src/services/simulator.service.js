import { axiosInstanceBearer, axiosInstanceBearer2 } from "./instances"

export const getFinantialData = () => {
  return axiosInstanceBearer.get("finantial_table")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error fetching financial data:", error)
      throw error
    })
}

export const AddprincipalDebtor = (data) => {
  return axiosInstanceBearer2.post("person/add/principal_debtor", data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error adding principal debtor:", error)
      throw error
    })
}

export const AddCodeudor = (data) => {
  return axiosInstanceBearer2.post("person/add/joint_debtor", data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error adding co-debtor:", error)
      throw error
    })
}