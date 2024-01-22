// import Table from "../../Components/Table/Table";
// import { faker } from "@faker-js/faker";

const DashUser = () => {
//   const generateMockUsers = () => {
//     const mockUsers = [];

//     for (let i = 0; i < 20; i++) {
//       const user = {
//         _id: i + 1,
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         role: i % 2 === 0 ? "Admin" : "Customer",
//         email: faker.internet.email(),
//         password: faker.internet.password(8),
//         phoneNumber: faker.phone.phoneNumber(),
//         image: faker.image.avatar(),
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.recent(),
//       };

//       mockUsers.push(user);
//     }
//     console.log(mockUsers);

//     return mockUsers;
//   };

//   const mockUsersWithIds = generateMockUsers();

  return (
    <>
     {/* <Table 
        isEdit={true}
        ForWhat='users'
        data={mockUsersWithIds}
      />
      <div>
        <h2>User List</h2>
        <ul>
          {mockUsersWithIds.map((user) => (
            <li key={user._id}>
              <p>ID: {user._id}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Image: {user.image}</p>
              <p>Created At: {user.createdAt.toString()}</p>
              <p>Updated At: {user.updatedAt.toString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>  */}
    </>
  );
};

export default DashUser;
