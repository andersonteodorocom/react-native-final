import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";

import * as service from '../services/user.service';
import * as roleService from '../services/role.service';
import MyInput from '../components/MyInput';
import RoleSelector from '../components/RoleSelector';
import { User } from "../model";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    let user: User | null = null
    const params = route.params as { user?: User }
    if (params && params.user) user = params.user

    const [name, setName] = React.useState(user ? user.name : '')
    const [username, setUsername] = React.useState(user ? user.username : '')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>(user?.roles || [])
    const [availableRoles, setAvailableRoles] = React.useState<Array<any>>([])

    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
        
        roleService.getList().then(roles => {
            setAvailableRoles(roles)
        }).catch(error => {
            console.error('Erro ao buscar roles:', error)
        })
    }, [])

    function save() {
        if (name === '') {
            alert('Nome é requerido!');
            return;
        }
        if (user) {
            const editUser: User = { 
                id: user.id, 
                username, 
                name,
                roles: selectedRoles
            }

            service.update(editUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao alterar o usuário: ', error)
            })

        } else {
            if (username === '') {
                alert('Login é requerido!');
                return;
            }
            if (password === '') {
                alert('Senha é requerida!');
                return;
            }
            if (password !== confirmPassword) {
                alert('Senhas não conferem!');
                return;
            }
        
            const newUser: User = { 
                username, 
                name, 
                password,
                roles: selectedRoles
            }

            service.create(newUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao criar usuário: ', error)
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MyInput label="Login" value={username} onChangeText={setUsername} readOnly={!!user} />
            <MyInput label="Nome" value={name} onChangeText={setName} />

            { !user && (
                <>
                    <MyInput label="Senha" onChangeText={setPassword} secureTextEntry />
                    <MyInput label="Confirmar Senha" onChangeText={setConfirmPassword} secureTextEntry />
                </>
            ) }

            <RoleSelector 
                availableRoles={availableRoles}
                selectedRoles={selectedRoles}
                onRolesChange={setSelectedRoles}
            />

            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={save} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
});