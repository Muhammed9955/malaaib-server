module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  phone
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "يحب ملئ حقل اسم المسخدم";
    // errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "يجب ملئ حقل البريد الاكتروني";
    // errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "  البريد الاكتروني غير صالح";
      // errors.email = "Email must be a valid email address";
    }
  }
  if (phone.length < 1) {
    errors.phone = "رقم الموبايل غير صحيح";
    // errors.phone = "Phone number must not be empty";
  } else {
    const regEx = /^[0-9]{11}$/;
    if (!phone.match(regEx)) {
      errors.phone = "رقم الموبايل غير صالح";
      // errors.phone = "Phone number must be a valid phone Number";
    }
  }
  if (password === "") {
    errors.password = "يجب ملئ حقل كلمة المرور";
    // errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.password = "يجب ملئ حقل كلمةالمرور";
    // errors.confirmPassword = "Passwords must match";
  }
  if (confirmPassword === "") {
    errors.confirmPassword = "يجب ملئ حقل تأكيد كلمة المرور";
    // errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "يجب ملئ حقل تأكيد كلمةالمرور";
    // errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validatePlayGroundInput = (
  name,
  city,
  location,
  price,
  contactNumber,
  amenities,
  avaliable_hours_start,
  avaliable_hours_end,
  playground_Images
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "يجب ملئ حقل اسم الملعب";
    // errors.name = "name must not be empty";
  }
  if (city.trim() === "") {
    errors.city = "يجب ملئ حقل المدينة";
    // errors.location = "location must not be empty";
  }
  if (location.trim() === "") {
    errors.location = "يجب ملئ حقل الموقع";
    // errors.location = "location must not be empty";
  }
  if (price.trim() === "") {
    errors.price = "يجب ملئ حقل السعر";
    // errors.price = "price must not be empty";
  }
  if (avaliable_hours_start.trim() === "") {
    errors.avaliable_hours_start = "يجب ملئ حقل  وقت بدأ العمل";
    // errors.price = "price must not be empty";
  }
  if (avaliable_hours_end.trim() === "") {
    errors.avaliable_hours_end = "يجب ملئ حقل وقت انتهاء العمل";
    // errors.price = "price must not be empty";
  }
  if (contactNumber.length < 1) {
    errors.contactNumber = "يجب ملئ حقل رقم التواصل";
    // errors.contactNumber = "contactNumber number must not be empty";
  } else {
    const regEx = /^[0-9]{11}$/;
    if (!contactNumber.match(regEx)) {
      errors.contactNumber = "يجب ان يكون رقم الموبايل صحيح من 11 رقم";
      // errors.contactNumber = "contactNumber number must be a valid phone Number";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "يجب ملئ حقل البريد الاكتروني";
    // errors.email = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "يجب ملئ حقل كلمة المرور";
    // errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
