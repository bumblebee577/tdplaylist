import React from "react";
import Form from "../templates/Form";

class ChangePasswordForm extends Form {
  state = {
    data: {
      newPassword: "",
      confirmNewPassword: "",
      password: "",
    },
    errors: {},
  };
  render() {
    return (
      <div>
        <form className="formContent">
          {this.renderInput("newPassword", "New Password")}
          {this.renderInput("confirmNewPassword", "Confirm New Password")}
          {this.renderInput("password", "Current Password")}

          {this.renderBtn("submit", "Submit", "btn btn-primary m-2")}
          {this.renderBtn("cancel", "Cancel", "btn btn-secondary m-2")}
        </form>
      </div>
    );
  }
}

export default ChangePasswordForm;
