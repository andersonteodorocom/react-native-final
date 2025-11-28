import * as repo from './auth.repo';

const URL = 'http://192.168.15.146:3030/roles';

export interface Role {
    id?: number;
    name: string;
    description?: string;
}

async function getHeaders() {
    const session = await repo.getSession();

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`,
    };
}

export async function getList(): Promise<Role[]> {
    const response = await fetch(URL, {
        method: 'GET',
        headers: await getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar roles');
    }

    return response.json();
}

export async function getById(id: number): Promise<Role> {
    const response = await fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: await getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar role');
    }

    return response.json();
}

export async function create(role: Role): Promise<Role> {
    const response = await fetch(URL, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(role),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar role');
    }

    return response.json();
}

export async function update(role: Role): Promise<Role> {
    const response = await fetch(`${URL}/${role.id}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(role),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar role');
    }

    return response.json();
}

export async function remove(id: number): Promise<boolean> {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: await getHeaders(),
    });

    return response.ok;
}
