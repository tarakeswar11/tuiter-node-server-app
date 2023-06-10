import people from './users.js'
import * as usersDao from "./users-dao.js";

let users = people
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    const newUser = usersDao.updateUser(userId, updates)
    req.session['currentUser'] = newUser;
    console.log(users);
    res.sendStatus(200);
}


const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr => usr._id !== userId);
    res.sendStatus(200);
}


const createUser = (req, res) => {
    let newUser = req.body;
    newUser ["_id"] = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
    console.log(users);
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

const findUsers = (req, res) => {
    const users = usersDao.findAllUsers();
    res.json(users)
}

export default UserController