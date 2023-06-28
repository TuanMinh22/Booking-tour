const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

let users = {
  admin: { id: 1, socketId: null },
  customers: []
};

const addUser = (userId, socketId, isAdmin) => {
  if (isAdmin) {
    users.admin.socketId = socketId;
  } else {
    const existingUser = users.customers.find((user) => user.id === userId);
    if (!existingUser) {
      users.customers.push({ userId, socketId });
    }
  }
};


const getUser = (userId, isAdmin) => {
  if (isAdmin) {
    return users.admin;
  } else {
    return users.customers.find((user) => user.id === userId);
  }
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId, isAdmin) => {
    addUser(userId, socket.id, isAdmin);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const admin = getUser(senderId === 1 ? senderId : receiverId, true);
    const customer = getUser(senderId === 1 ? receiverId : senderId, false);
    console.log(admin)
    if (admin && customer) {
      // Tạo tin nhắn mới trong cơ sở dữ liệu
      const newMessage = {
        Admin_ID: admin.id,
        Customer_ID: customer.id,
        text,
      };

      // Gửi tin nhắn đến admin
      if (senderId === 1) {
        io.to(admin.socketId).emit("getMessage", newMessage);
      } else {
        io.to(customer.socketId).emit("getMessage", newMessage);
      }
    } else {
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    // removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
