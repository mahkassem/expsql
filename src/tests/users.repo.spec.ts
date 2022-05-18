import {
    createUser,
    getAllUsers,
    getUserById
} from '../entities/users/users.repo'
import { User } from '../entities/users/user.model'

let testUser: User = {
    name: 'test',
    color: 'red',
    email: 'test@test.com',
    password: 'test'
}

describe('UsersRepo', () => {
    it('Should create a new user', async () => {
        const user = await createUser(testUser)
        testUser.id = user.id as number
        expect(user).toEqual(testUser)
    })

    it('Should get user by Id', async () => {
        const user = await getUserById(testUser.id as number)
        expect(user).toEqual(testUser)
    })

    it('Should get all users', async () => {
        const users = await getAllUsers()
        expect(users.length).toBeGreaterThan(0)
    })

    // test update user

    // test delete user
})
