import React, { useCallback, useEffect, useState } from "react";
import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./UsersPage.module.scss";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);
    fetchUsers();
  };

  return (
    <Page title="Users">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
            Create User
          </Button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 ">
          <div>
            <Button
              color="secondary"
              className="w-100 mb-3"
              onClick={() => setViewType("card")}
            >
              Card View
            </Button>
          </div>
          <div>
            <Button
              color="secondary"
              className="w-100 mb-3"
              onClick={() => setViewType("table")}
            >
              Table View
            </Button>
          </div>
        </div>

      </div>
      {viewType === "card" ? (
        <div className="row">
          {users.map(({ id, name, image }) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1" key={id}>
              <Link
                to={`/user/${id}`}
                className={classNames("card", classes.UserCard)}
              >
                <img
                  src={image}
                  alt={`user #${id}`}
                  className={classNames("card-img-top", classes.UserImage)}
                />
                <div className="card-body">
                  <h5>{name}</h5>
                </div>
                <Button
                  className={classes.DeleteIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteUser(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, image }) => (
              <tr key={id}>
                <td className="align-middle">{id}</td>
                <td className="align-middle">{name}</td>
                <td className="align-middle">
                  <img
                    src={image}
                    alt={`user #${id}`}
                    className={classes.UserImage}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td className="align-middle">
                    <Button
                    className={classNames(classes.DeleteIcon)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteUser(id);
                    }}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Page>
  );
};

export default UsersPage;