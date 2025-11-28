import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AbstractRepository } from "src/abstractions/abstract.repository"
import { AbstractService } from "src/abstractions/abstract.service"

import { Role } from "./role.entity"
import { RoleRepository } from "./role.repository"
import { UserRepository } from "../user/user.repository"

@Injectable()
export class RoleService extends AbstractService<Role> {

    constructor(
        private readonly repository: RoleRepository,
        private readonly userRepository: UserRepository
    ) {
        super()
    }

    getRepository() {
        return this.repository
    }

    public async remove(id: number) {
        const role = await this.repository.findByPk(id)
        
        if (role) {
            // Remove a role de todos os usuários
            const users = await this.userRepository.findAll()
            for (const user of users) {
                if (user.roles && user.roles.includes(role.name)) {
                    user.roles = user.roles.filter(r => r !== role.name)
                }
            }
        }

        return super.remove(id)
    }

}