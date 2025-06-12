import { axiosInstanceBearer2, axiosInstanceBearerCity } from "./instances";

export const getCities = async () => {
  try {
    const response = await axiosInstanceBearerCity.get("/City");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

//Esto devuelve una url de truora
export const validationOtp = async (data) => {
  try {
    const response = await axiosInstanceBearerCity.post("/signature/start_validation/otp", data);
    return response.data;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
}

export const validationFaceId = async (data) => {
  try {
    const response = await axiosInstanceBearer2.post("/signature/start_validation/fid", data);
    return response.data;
  } catch (error) {
    console.error("Error validating Face ID:", error);
    throw error;
  }
}

export const validationSignature = async (data) => {
  try {
    const response = await axiosInstanceBearer2.get(`/signature/check_validation/truora_dp`, {
      params: {
        process_id: data,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error validating signature:", error);
    throw error;
  }
}

export const validationSignatureOTP = async (data) => {
  try {
    const response = await axiosInstanceBearer2.get(`/signature/check_validation/truora_otp_dp`, {
      params: {
        process_id: data,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error validating signature OTP:", error);
    throw error;
  }
}

export const approveRemediable = async (data) => {
  try {
    const response = await axiosInstanceBearer2.post("/request/approve_remedial", data);
    return response.data;
  }
  catch (error) {
    console.error("Error approving remediable signature:", error);
    throw error;
  }
}

export const rejectRemediable = async (data) => {
  try {
    const response = await axiosInstanceBearer2.post("/request/decline_remedial", data);
    return response.data;
  }
  catch (error) {
    console.error("Error rejecting remediable signature:", error);
    throw error;
  }
}