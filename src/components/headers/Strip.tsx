import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//components
import DynamicDiv from "../DynamicDiv";
import DynamicP from "../p/DynamicP";
import RoundedImage from "../images/RoundedImage";

//sections
import Profile from "../../sections/Profile";
import EditProfile from "../../sections/EditProfile";
import SwitchUser from "../../sections/SwitchUser";

//scripts
import Admin from "../../scripts/user/Admin";

//interface
import type User from "../../interfaces/user";

interface StripProps {
  title: string;
}

function Strip({ title }: StripProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showModal3, setShowModal3] = useState<boolean>(false);

  const [thisAdmin, setThisAdmin] = useState<Admin | null>(null);

  // FIX: userData can start as null
  const [userData, setUserData] = useState<User | null>(null);

  const [mode, setMode] = useState<"light" | "dark">("light");

  // FIX: removed unused dark state
  const [light, setLight] = useState<boolean>(true);

  const navigate = useNavigate();

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  function toggleModalTwo() {
    setShowModal2((prev) => !prev);
  }

  function toggleModalThree() {
    setShowModal3((prev) => !prev);
  }

  function toggleMode() {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    setLight(mode === "light");

    console.log(mode);
  }, [mode]);

  async function logOutUser() {
    localStorage.clear();

    toast.success("Log out successful!");

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    const userString = localStorage.getItem("user");

    const user: User | null = userString
      ? JSON.parse(userString)
      : null;

    console.log("Token:", token);
    console.log("User:", user);

    if (!token) {
      navigate("/login");
      return;
    }

    if (user && token) {
      const admin = new Admin(user.RegId, token);

      setThisAdmin(admin);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userString = localStorage.getItem("user");

      const user: User | null = userString
        ? JSON.parse(userString)
        : null;

      if (thisAdmin && user) {
        // FIX: remove incorrect User[] typing
        const loggedAdmin = await thisAdmin.loggedInAdmin(user.RegId);

        console.log("Logged in admin:", loggedAdmin);

        setUserData(loggedAdmin);
      }
    };

    fetchAdmin();
  }, [thisAdmin]);

  return (
    <>
      <DynamicDiv
        style={{
          color: "#FFFFFF",
          height: "70px",
          backgroundColor: "#15317E",
        }}
        className="d-flex flex-row justify-content-between align-items-center w-100 px-3"
      >
        <DynamicDiv
          className="d-flex flex-column justify-content-center align-items-center bg-white rounded-circle"
          onClick={toggleModal}
          style={{
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        >
          <RoundedImage
            style={{
              height: "40px",
              width: "40px",
              color: "white",
              backgroundColor: "white",
            }}
            src={"/account.svg"}
          />
        </DynamicDiv>

        <DynamicP text={title} className="tag" />

        <DynamicDiv
          className="d-flex flex-column justify-content-center align-items-center bg-white rounded-circle"
          onClick={toggleMode}
          style={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: light ? "white" : "black",
          }}
        >
          {light ? "Light" : "Dark"}
        </DynamicDiv>
      </DynamicDiv>

      {/* FIX: render only if userData exists */}
      {showModal && userData && (
        <Profile
          user={userData}
          callback1={toggleModal}
          callback2={toggleModalTwo}
          callback3={toggleModalThree}
          callback4={logOutUser}
        />
      )}

      {/* FIX: render only if userData exists */}
      {showModal2 && userData && (
        <EditProfile
          user={userData}
          callback1={toggleModalTwo}
        />
      )}

      {showModal3 && (
        <SwitchUser
          callback1={toggleModal}
          callback2={toggleModalThree}
        />
      )}
    </>
  );
}

export default Strip;