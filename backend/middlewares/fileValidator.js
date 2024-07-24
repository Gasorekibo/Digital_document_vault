const uploadDocCtrl = {
    user: {
      notEmpty: {
        errorMessage: "User should not be empty",
      }
    },
    filename: {
      notEmpty: {
        errorMessage: "Filename should not be empty",
      },
      isString: {
        errorMessage: "Filename should be a string",
      },
    },
    category: {
      notEmpty: {
        errorMessage: "Category should not be empty",
      },
      isEmail: {
        errorMessage: "Category should be a valid email",
      },
    },
    file: {
      notEmpty: {
        errorMessage: "File should not be empty",
      },
      isString: {
        errorMessage: "File should be a string",
      }
  }
}
  export {
    uploadDocCtrl
  }