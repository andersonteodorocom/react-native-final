import React from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'

import * as userService from '../services/user.service'
import * as authRepo from '../services/auth.repo'
import ListItem from '../components/ListItem'
import { User } from '../model'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [users, setUsers] = React.useState<Array<User>>([])

    function fetchUsers() {
        userService.getList().then(data => setUsers(data))
    }

    useFocusEffect(() => {
        fetchUsers()
    })

    React.useEffect(() => {
        authRepo.getSession().then(session => {
            if (!session) navigation.goBack()

            navigation.setOptions({
                title: session ? `Olá ${session.name}` : 'Página Inicial',
            })
        })

        navigation.setOptions({
            headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()} />,
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Button title='Perfis' onPress={() => navigation.navigate('roles')} />
                    <Button title='Add' onPress={() => navigation.navigate('user')} />
                </View>
            )
        })
    }, [])

    function update(user: User) {
        navigation.navigate('user', { user })
    }

    function remove(user: User) {
        userService.remove(user.id!).then(deleted => {
            if (deleted) fetchUsers()
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listagem de Usuários</Text>
            <Text>{users.length} usuários cadastrados.</Text>

            <View>
                <FlatList
                    data={users}
                    keyExtractor={user => user.id!.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={`${item.username}${item.roles && item.roles.length > 0 ? ' • ' + item.roles.join(', ') : ''}`}
                            onUpdate={() => update(item)}
                            onDelete={() => remove(item)}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
})