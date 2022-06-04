const PersonModel = require("./PersonModel");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("socket id: ", socket.id);

    // ADD
    socket.on("client:add_person", async (data) => {
      const person = await PersonModel.create(data);
      await person.save();
      io.emit("server:add_person", person);
    });

    // DELETE
    socket.on("client:delete_person", async (data) => {
      const person = await PersonModel.findByIdAndDelete(data._id);
      io.emit("server:delete_person", person);
    });

    // UPDATE
    socket.on("client:update_person", async (data) => {
      const person = await PersonModel.findById({ _id: data._id });
      person.name = data.name;
      person.age = data.age;
      await person.save();
      // console.log(person);
      io.emit("server:update_person", person);
    });

    socket.on("disconnect", () => {
      console.log("disconneted");
    });
  });
};

module.exports = {
  registerSocketServer,
};
