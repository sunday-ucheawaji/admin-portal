import { toast } from 'react-toastify'
import validator from 'validator'

export const toastMessage = (message, type) => {
  const toastify = type === 'info' ? toast.info : toast.error
  toastify(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const validateEmail = (email) => {
  if (validator.isEmail(email)) {
    return true
  } else {
    return false
  }
}

export const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      isPassed: false,
      message: 'Password cannot be less than 6 characters',
    }
  }
  return {
    isPassed: true,
  }
}

export const validateOtp = (otp) => {
  if (otp.length !== 4) {
    return {
      isPassed: false,
      message: 'OTP must be 4 characters long',
    }
  }
  return {
    isPassed: true,
  }
}

export const validateName = (name) => {
  if (name.length > 2) {
    return true
  } else {
    return false
  }
}

export const validatePhoneNumber = (name) => {
  if (name.length > 9) {
    return true
  } else {
    return false
  }
}

export const validateGender = (gender) => {
  if (gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female') {
    return { isPassed: true }
  } else {
    return { isPassed: false, message: 'Please, enter a valid gender ' }
  }
}

export const uniqueFieldValues = (inputArray, field) => {
  const fieldSet = new Set()

  const result = inputArray?.reduce((accumulator, current) => {
    const fieldValue = current?.[field]

    if (!fieldSet?.has(fieldValue)) {
      fieldSet?.add(fieldValue)
      accumulator?.push({ text: fieldValue, value: fieldValue })
    }

    return accumulator
  }, [])

  return result
}

export const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
};