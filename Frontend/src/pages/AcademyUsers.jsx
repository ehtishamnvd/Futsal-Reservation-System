import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../academyy.css";
import * as CONSTANT from "../Constant/constant";

import { useLocation } from "react-router-dom/cjs/react-router-dom";

const StudentDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "studentname",
    direction: "ascending",
  });

  const [users, setUsers] = useState([]);

  const location = useLocation();
  const groundName = location.state?.groundName;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await CONSTANT.API.get(`/academy/users/${groundName}`).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  };

  // Sort function
  const sortedUsers = [...users].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Request a sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter users based on search term
  const filteredUsers = sortedUsers.filter((user) => {
    return (
      user.studentname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fathername && user.fathername.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.myacademy && user.myacademy.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Get sort direction indicator
  const getSortDirectionIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

 
  return (
    <section className="student-table-section">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="student-table-header">
              <h2 className="student-table-title">
                <i className="bi bi-mortarboard-fill me-2"></i>
               Academy Student Directory
              </h2>
              <div className="student-search-container">
                <div className="input-group">
                  {/* <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-search"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control student-search-input"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="student-empty-state text-center py-5">
            <i className="bi bi-emoji-frown student-empty-icon"></i>
            <h3>No Students Found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="student-table-stats mb-3">
              <p className="mb-0">
                Showing <span className="text-primary fw-bold">{filteredUsers.length}</span> of{" "}
                <span className="fw-bold">{users.length}</span> students
              </p>
            </div>

            <div className="table-responsive student-table-container">
              <table className="table student-data-table">
                <thead>
                  <tr>
                    <th onClick={() => requestSort("studentname")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Student Name {getSortDirectionIcon("studentname")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th onClick={() => requestSort("age")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Age {getSortDirectionIcon("age")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th onClick={() => requestSort("contact")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Contact {getSortDirectionIcon("contact")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th onClick={() => requestSort("email")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Email {getSortDirectionIcon("email")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th onClick={() => requestSort("fathername")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Father's Name {getSortDirectionIcon("fathername")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th onClick={() => requestSort("myacademy")} className="student-sortable-header">
                      <div className="d-flex align-items-center">
                        Academy {getSortDirectionIcon("myacademy")}
                        <i className="bi bi-arrow-down-up text-muted ms-1 sort-icon"></i>
                      </div>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((student, index) => (
                    <tr key={index} className="student-table-row">
                      <td className="student-name-cell">
                        <div className="d-flex align-items-center">
                          <div className="student-avatar">
                            {student.studentname.charAt(0).toUpperCase()}
                          </div>
                          <div className="ms-2">
                            <div className="fw-bold">{student.studentname}</div>
                            <div className="student-id text-muted small">ID: {index + 1000}</div>
                          </div>
                        </div>
                      </td>
                      <td>{student.age || "-"}</td>
                      <td>
                        {student.contact ? (
                          <span>
                            <i className="bi bi-telephone-fill text-success me-1"></i>
                            {student.contact}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {student.email ? (
                          <a href={`mailto:${student.email}`} className="student-email">
                            <i className="bi bi-envelope-fill me-1"></i>
                            {student.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{student.fathername || "-"}</td>
                      <td>
                        {student.myacademy && (
                          <span className="student-academy-badge">
                            {student.myacademy}
                          </span>
                        )}
                        {!student.myacademy && "-"}
                      </td>
                      <td>
                        <div className="student-actions">
                          <button className="btn btn-sm btn-primary me-1">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </>
        )}
      </div>
    </section>
  );
};

export default StudentDataTable;