import { getUserByUsername, getUserById, getUserIndexById, getUsers, addUser } from "../db/conexao.js"

class UserRepository {

  create({ username, password, nome = null, city, unit, is24Hour, title }) {
    return addUser({
      credentials: {
        username,
        password,
      },
      data: {
        username,
        nome: nome || username,
        city,
        unit,
        is24Hour: is24Hour || true,
        title,
        alarms: [],
        settings: {
          overrideLang: null,
          hideSec: true,
          useNeutralTheme: false
        }
      },
    })
  }

  findAll() {
    return getUsers()
  }

  findById(id) {
    return getUserById(id)
  }

  findByUsername(username) {
    return getUserByUsername(username)
  }

  updateAttribute(id, attribute, data) {
    const userIndex = getUserIndexById(id)
    const users = getUsers()
    const prevData = users[userIndex].data

    if (attribute === 'alarms') {
      prevData.alarms.push(data.id)
    }

    return users[userIndex]

  }

  insertAlarm(id, alarmId) {

    console.log(id, alarmId)
    const user = getUserById(id)
    user.data.alarms.push(alarmId)

    return user.data
  }

  update(id, rawData) {
    const userIndex = getUserIndexById(id)
    const users = getUsers()
    const prevData = users[userIndex].data

    users[userIndex].data = {
      ...prevData,
      ...rawData
    }
    return users[userIndex]
  }

  delete(id) {
    const userIndex = getUserIndexById(id)
    getUsers().splice(userIndex, 1)
  }
}

export default new UserRepository()