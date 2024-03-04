import React, { useEffect, useState } from "react";
import usersListImg from "../../../assets/images/usersListImg.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";

export default function UsersList({ title, description, headerBg }) {
  const [userLists, setUserLists] = useState([]);
  const baseUrlImg = "https://upskilling-egypt.com/";
  const getuserList = async (data) => {
    let token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=3`,
        {
          data,
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data.data);
      setUserLists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserList();
  }, []);

  return (
    <>
      <Header
        title={`Users List`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        headerBg={usersListImg}
      />

      <div className="m-3 p-2">
        <h4>Users Table Details</h4>
        <p className="text-muted">You can check all details</p>
      </div>

      <div className="table-container my-3">
        {userLists.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Country</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {userLists.map((userlist) => (
                  <tr key={userlist.id}>
                    <td>{userlist.id}</td>
                    <td scope="row">{userlist.userName}</td>
                    <td>
                      {userlist.imagePath ? (
                        <img
                          className="w-25"
                          src={`${baseUrlImg}${userlist.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img src={noData} className="w-25" />
                      )}
                    </td>
                    <td>{userlist.email}</td>
                    <td>{userlist.phoneNumber}</td>
                    <td>{userlist.country}</td>
                    <td>
                      {/* <UpateCategory categoryName={userlist.name} categoryId={userlist.id} getCategoriesList={getCategoriesList}/>
                      <DeleteCategory categoryId={userlist.id} deleteCategoryById={deleteCategoryById}/> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <img src={noData} alt="" />
            <h4 className="my-3">No Data !</h4>
            <p>
              are you sure you want to delete this item ? if you are sure just{" "}
              <br /> click on delete it
            </p>
          </div>
        )}
      </div>
    </>
  );
}
