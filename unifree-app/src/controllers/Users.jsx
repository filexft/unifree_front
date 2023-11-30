import User from "../models/User";

function Users() {
  const User1 = User({
        username: "jojo69",
        type: "Étudiant",
        email: "jojo69@gmail.com",
        icon: "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg",
        password : "123",
        formationFollowed: ["Formation1", "Formation2"],
        likedFormation: ["Formation1"]
  });

  const UserList = [User1];

  return UserList;
}

export default Users;
