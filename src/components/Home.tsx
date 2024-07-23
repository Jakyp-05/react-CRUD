import React, { useEffect, useState } from "react";
import "./Home.style.css";
import { IEmployee, PageEnum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const Home: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
  const [shownPage, setShownPage] = useState<PageEnum>(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState<IEmployee | null>(null);

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      try {
        const list = JSON.parse(listInString);
        if (Array.isArray(list)) {
          _setEmployeeList(list);
        } else {
          console.error("Stored data is not an array");
          window.localStorage.removeItem("EmployeeList");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        window.localStorage.removeItem("EmployeeList");
      }
    }
  }, []);

  const _setEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  const onAddEmployee = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const addEmployeeHnd = (data: IEmployee) => {
    const updateEmployeeList = [...employeeList, data];
    _setEmployeeList(updateEmployeeList);
  };

  const deleteEmployee = (data: IEmployee) => {
    const updateEmployeeList = employeeList.filter(
      (employee) => employee.id !== data.id
    );
    _setEmployeeList(updateEmployeeList);
  };

  const editEmployeeData = (data: IEmployee) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const updateData = (data: IEmployee) => {
    const updatedList = employeeList.map((employee) =>
      employee.id === data.id ? data : employee
    );
    _setEmployeeList(updatedList);
  };

  return (
    <>
      <article className="article-header">
        <header>
          <h2>React: Simple CRUD Application</h2>
        </header>
      </article>

      <section className="section-content">
        {shownPage === PageEnum.list && (
          <>
            <input
              type="button"
              value="Add Employee"
              onClick={onAddEmployee}
              className="add-employee-btn"
            />
            <EmployeeList
              list={employeeList}
              onDelete={deleteEmployee}
              onEdit={editEmployeeData}
            />
          </>
        )}

        {shownPage === PageEnum.add && (
          <AddEmployee
            onBackButton={showListPage}
            onSubmitClickHnd={addEmployeeHnd}
          />
        )}

        {shownPage === PageEnum.edit && dataToEdit && (
          <EditEmployee
            data={dataToEdit}
            onBackButton={showListPage}
            onUpdateHnd={updateData}
          />
        )}
      </section>
    </>
  );
};

export default Home;
