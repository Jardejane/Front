import jwt_decode from "jwt-decode";

export const getDoctorIdFromToken = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const doctorId = decodedToken.id;
  return doctorId;
};
