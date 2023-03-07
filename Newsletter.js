import React, { useEffect, useState } from "react";
import AddUser from "../components/AddUser"
import User from "../components/User";
import "../App.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {  //this is where i fetch my mock data from jsonplaceholder 
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const onAdd = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id) => {    // delete option on newsletter page 
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    console.log(users);
  return (
    <div className="App">

            <div className='ABoutUsPicture'>
            <img style={{ width:1500, height: 1000 }}src="https://studyfinds.org/wp-content/uploads/2019/03/caffeine-coffee-coffee-beans-606545.jpg" alt="coffee" />
            </div>
      <h3> <br/> Follow our newsletter</h3>
      <br />
      <AddUser onAdd={onAdd} />
      <div>
        {users.map((user) => (
          <User
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            onDelete={onDelete}
          />
        ))}
            <br></br>
            <br></br>
      <div className='bio_bottom'>
                <h4>© 2020 Michael's CoffeeShop, LLC. All rights reserved. </h4>
                </div>
        </div>
    </div>
  );
};
export default App;
