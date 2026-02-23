// import { useEffect } from "react";
// import { useAppDispatch } from "../../core/redux/store";
// import { logoutUser } from "../../core/redux/apis/auth";
// import { useNavigate } from "react-router-dom";

// const SideLogout = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const refreshToken = localStorage.getItem("refreshToken") || "";

//     dispatch(
//       logoutUser(refreshToken, () => {
//         navigate("/signin");
//       }) as any
//     );
//   }, [dispatch, navigate]);

//   return null;
// };

// export default SideLogout;

import { useEffect } from "react";
import { useAppDispatch } from "../../core/redux/store";
import { logoutUser } from "../../core/redux/apis/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SideLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const result = await Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      });

      if (result.isConfirmed) {
        const refreshToken = localStorage.getItem("refreshToken") || "";

        dispatch(
          logoutUser(refreshToken, () => {
            Swal.fire({
              title: "Logged out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              navigate("/signin");
            });
          }) as any
        );
      } else {
        navigate(-1);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null;
};

export default SideLogout;