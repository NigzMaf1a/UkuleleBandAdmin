export default function validateFields(
  name: string,
  phone: string,
  email: string,
  password: string,
  confirmPassword: string,
  gender: string,
  regType: string,
  location:string,
  accStatus:string,
): {
  name: string,
  phone: string,
  email: string,
  password: string,
  gender: string,
  regType: string,
  location:string,
  accStatus:string
} {
  if (!name || !phone || !email || !password || !confirmPassword || !gender || !location || !regType || !accStatus) {
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (!/^[a-zA-Z]+$/.test(name)) {
    throw new Error("Name fields must contain only letters");
  }

  if (!/^\d{10}$/.test(phone)) {
    throw new Error("Phone number must be 10 digits");
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    throw new Error("Password must be at least 8 characters long and contain both letters and numbers");
  }

  return {
    name,
    phone,
    email,
    password,
    gender,
    regType,
    location,
    accStatus
  };
}
