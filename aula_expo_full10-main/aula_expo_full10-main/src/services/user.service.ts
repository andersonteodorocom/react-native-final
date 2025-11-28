import * as repo from '../services/auth.repo'
import { User } from "../model";

const URL = 'http://192.168.15.146:3030/users';

async function getHeaders() {
    const session = await repo.getSession();

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`,
    };
}

export async function getList() {
    const response = await fetch(URL, {
        method: 'GET',
        headers: await getHeaders(),
    })

    if (response.ok) {
        return await response.json() as User[];
    }
    throw new Error(await response.text())
}

export async function getById(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: await getHeaders(),
    })

    if (response.ok) {
        return await response.json() as User;
    }
    throw new Error(await response.text())
}

export async function create(user: User) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(user),
    })

    if (response.ok) {
        return await response.json() as User;
    }
    throw new Error(await response.text())
}

export async function update(user: User) {
    const response = await fetch(`${URL}/${user.id}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(user),
    })

    if (response.ok) {
        return await response.json() as User;
    }
    throw new Error(await response.text())
}

export async function remove(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: await getHeaders(),
    })

    if (response.ok) {
        return await response.json() as boolean;
    }
    throw new Error(await response.text())
}
