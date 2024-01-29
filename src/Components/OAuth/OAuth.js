import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import googleG from "../../Assets/G.png";
import useApi from "../../Hooks/UseApi";
import LoadingButton from "@mui/lab/LoadingButton";

const  OAuth = ()  => {
  const {apiCall , loading } = useApi()
  const {fetchUserData , setUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const response = await apiCall({
        url : `${process.env.REACT_APP_BACKEND_ENDPOINT}user/google`,
        method : 'post',
        data :         {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      }
      );
      setUser(response)
      await fetchUserData()
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <>
    {loading ? (
      <LoadingButton>
        
      </LoadingButton>
    ): (
      <Button
      variant="outlined"
      onClick={handleGoogleClick}
      startIcon={<img src={googleG} alt="googleImage"/>}
      sx={{
        color: "black",
      }}
    >
      Login with Google
    </Button>
    )}
    </>
  );
}

export default OAuth