const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeAgentsArray() {
    return [
        {
        id: 1,
        first_name: "Test",
        last_name: "User 1",
        title: "Professional title",
        agent_phone: "123456790",
        agent_phone_type: "home",
        agent_email: "test@gmail.com",
        city: "Test City",
        state: "Test State",
        zip: "88888",
        office: "Test Office",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas congue quisque egestas diam in. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Volutpat diam ut venenatis tellus in metus. Eget sit amet tellus cras adipiscing enim. Sed faucibus turpis in eu mi bibendum neque egestas congue. Nec dui nunc mattis enim. Enim diam vulputate ut pharetra sit amet aliquam id diam. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Adipiscing enim eu turpis egestas. Eget velit aliquet sagittis id consectetur purus ut. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Nulla malesuada pellentesque elit eget gravida cum. Id consectetur purus ut faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Dictum fusce ut placerat orci nulla pellentesque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.",
        experience: "69",
        brokerage: "Test Office",
        slogan: "Test Slogan",
        date_created: "2020-01-14T05:07:42.608Z",
        date_modified: "2020-01-14T05:10:28.701Z",
        password: "testPass1!"
        },
        {
          id: 2,
          first_name: "Test",
          last_name: "User 2",
          title: "Professional title",
          agent_phone: "123456790",
          agent_phone_type: "home",
          agent_email: "test@gmail.com",
          city: "Test City",
          state: "Test State",
          zip: "88888",
          office: "Test Office",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas congue quisque egestas diam in. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Volutpat diam ut venenatis tellus in metus. Eget sit amet tellus cras adipiscing enim. Sed faucibus turpis in eu mi bibendum neque egestas congue. Nec dui nunc mattis enim. Enim diam vulputate ut pharetra sit amet aliquam id diam. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Adipiscing enim eu turpis egestas. Eget velit aliquet sagittis id consectetur purus ut. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Nulla malesuada pellentesque elit eget gravida cum. Id consectetur purus ut faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Dictum fusce ut placerat orci nulla pellentesque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.",
          experience: "50",
          brokerage: "Test Office",
          slogan: "Test Slogan",
        date_created: "2020-01-12T22:50:38.262Z",
        date_modified: "2020-01-13T04:21:54.984Z",
        password: "testPass1"
        },
        {
        id: 3,
        first_name: "Test",
        last_name: "User 3",
        title: "Professional title",
        agent_phone: "123456790",
        agent_phone_type: "home",
        agent_email: "test@gmail.com",
        city: "Test City",
        state: "Test State",
        zip: "88888",
        office: "Test Office",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas congue quisque egestas diam in. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Volutpat diam ut venenatis tellus in metus. Eget sit amet tellus cras adipiscing enim. Sed faucibus turpis in eu mi bibendum neque egestas congue. Nec dui nunc mattis enim. Enim diam vulputate ut pharetra sit amet aliquam id diam. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Adipiscing enim eu turpis egestas. Eget velit aliquet sagittis id consectetur purus ut. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Nulla malesuada pellentesque elit eget gravida cum. Id consectetur purus ut faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Dictum fusce ut placerat orci nulla pellentesque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.",
        experience: "28",
        brokerage: "Test Office",
        slogan: "Test Slogan",
        date_created: "2020-01-14T05:34:00.850Z",
        date_modified: "2020-01-14T06:58:43.810Z",
        password: "testPass1"
        },
    ]
}

function seedAgents(db, agents) {
    const preppedAgents = agents.map(agent => ({
      ...agent,
      password: bcrypt.hashSync(agent.password, 1)
    }))
    return db.into('agents').insert(preppedAgents)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('agents_id_seq', ?)`,
          [agents[agents.length - 1].id],
        )
      )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function cleanTables(db) {
    return db.destroy()
  }

module.exports = {
    makeAgentsArray,
    makeAuthHeader,

    seedAgents,
    cleanTables
}