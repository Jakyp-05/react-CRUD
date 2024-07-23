import React, { ChangeEvent, FormEvent, useState } from "react";
import { IEmployee } from "./Employee.type";

type Props = {
  data: IEmployee;
  onBackButton: () => void;
  onUpdateHnd: (data: IEmployee) => void;
};

const EditEmployee: React.FC<Props> = (props) => {
  const { data, onBackButton, onUpdateHnd } = props;
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);

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
    const updatedData: IEmployee = {
      id: data.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    onUpdateHnd(updatedData);
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
          <input type="submit" value="Update Employee" />
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
