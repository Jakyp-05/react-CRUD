import React, { ChangeEvent, FormEvent, useState } from "react";
import "./EmployeeForm.style.css";
import { IEmployee } from "./Employee.type";

type Props = {
  onBackButton: () => void;
  onSubmitClickHnd: (data: IEmployee) => void;
};

const AddEmployee: React.FC<Props> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { onBackButton, onSubmitClickHnd } = props;

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmitBtnHnd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IEmployee = {
      id: new Date().toJSON().toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    onSubmitClickHnd(data);
    onBackButton();
  };

  return (
    <div className="form-container">
      <div>
        <h2>Add Employee</h2>
      </div>
      <form onSubmit={onSubmitBtnHnd}>
        <div>
          <label>First Name : </label>
          <input type="text" value={firstName} onChange={onFirstNameChange} />
        </div>
        <div>
          <label>Last Name : </label>
          <input type="text" value={lastName} onChange={onLastNameChange} />
        </div>
        <div>
          <label>Email Add : </label>
          <input type="text" value={email} onChange={onEmailChange} />
        </div>
        <div>
          <input type="button" value="Back" onClick={onBackButton} />
          <input type="submit" value="Add Employee" />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
