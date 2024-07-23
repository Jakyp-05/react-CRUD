import React from "react";
import "./EmployeeModal.style.css";
import { IEmployee } from "./Employee.type";

type Props = {
  onClose: () => void;
  data: IEmployee;
};

const EmployeeModal: React.FC<Props> = (props) => {
  const { onClose, data } = props;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h3>Employee Data</h3>
          <div>
            <div>
              <label>First Name : {data.firstName}</label>
            </div>
            <div>
              <label>Last Namw : {data.lastName}</label>
            </div>
            <div>
              <label>Email Add. : {data.email}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
