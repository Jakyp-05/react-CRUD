import React, { useState } from "react";
import "./EmployeeList.style.css";
import { IEmployee } from "./Employee.type";
import EmployeeModal from "./EmployeeModal";

type Props = {
  list: IEmployee[];
  onDelete: (data: IEmployee) => void;
  onEdit: (data: IEmployee) => void;
};

const EmployeeList: React.FC<Props> = (props) => {
  const { list, onDelete, onEdit } = props;
  const [showModal, setShowModal] = useState(false);
  const [dataToShow, setDataToShow] = useState<IEmployee | null>(null);

  const viewModal = (data: IEmployee) => {
    setDataToShow(data);
    setShowModal(true);
  };

  const onCloseView = () => {
    setShowModal(false);
  };

  return (
    <div>
      <article>
        <h2 className="list-header">Employee list</h2>
      </article>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {list.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.email}</td>
              <td>
                <div>
                  <input
                    type="button"
                    value="View"
                    onClick={() => viewModal(employee)}
                  />
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => onEdit(employee)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => onDelete(employee)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      {showModal && dataToShow !== null && (
        <EmployeeModal onClose={onCloseView} data={dataToShow} />
      )}
    </div>
  );
};

export default EmployeeList;
