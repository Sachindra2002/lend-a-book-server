// app.post("/users", async (req, res) => {
//     const {
//       email,
//       firstName,
//       lastName,
//       dob,
//       age,
//       phoneNumber,
//       image,
//       isVerified,
//       isBanned,
//       password,
//       userRole,
//     } = req.body;
  
//     try {
//       const user = await User.create({
//         email,
//         firstName,
//         lastName,
//         dob,
//         age,
//         phoneNumber,
//         image,
//         isVerified,
//         isBanned,
//         password,
//         userRole,
//       });
  
//       return res.json(user);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   });
  
//   app.get("/users", async (req, res) => {
//     try {
//       const users = await User.findAll();
//       return res.json(users);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   });
  
//   app.get("/users/:email", async (req, res) => {
//     const email = req.params.email;
//     try {
//       const user = await User.findOne({
//         where: {
//           email,
//         },
//       });
//       return res.json(user);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   });