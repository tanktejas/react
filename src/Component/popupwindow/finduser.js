import { useAuth0 } from "@auth0/auth0-react";

function Finduser(props) {
  const { user } = useAuth0();
  console.log(
    props.name({
      userdetail: user.email,
    })
  );
  //   props.name({ 
  //     userdetail: user.email,
  //   });

  return (
    <>
      <h6>sd</h6>
    </>
  );
}

export default Finduser;
