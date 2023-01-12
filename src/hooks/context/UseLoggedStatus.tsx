import React, { useState, useContext, useEffect } from "react";
import { UserAccountContext } from "../../providers/UserAccount";
import Button from "@mui/material/Button";
const Status = () => {
  const { getSession, logout } = useContext(UserAccountContext);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsLogged(true);
      console.log("La session est " + session);
    });
  }, []);
  console.log("isLogged" + isLogged);
  return (
    <div>
      {isLogged ? (
        <Button variant='outlined' onClick={logout}>
          Logout
        </Button>
      ) : (
        "Pas connecté"
      )}
    </div>
  );
};
export default Status;
