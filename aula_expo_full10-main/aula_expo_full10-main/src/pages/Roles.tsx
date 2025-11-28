import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

import * as roleService from '../services/role.service';
import ListItem from '../components/ListItem';
import { Role } from '../services/role.service';

export default function RolesPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [roles, setRoles] = React.useState<Array<Role>>([]);

    function fetchRoles() {
        roleService.getList().then(data => setRoles(data))
            .catch(error => console.error('Erro ao buscar roles:', error));
    }

    useFocusEffect(() => {
        fetchRoles();
    });

    React.useEffect(() => {
        navigation.setOptions({
            title: 'Perfis de Acesso',
            headerRight: () => <Button title='Novo' onPress={() => navigation.navigate('roleForm')} />
        });
    }, []);

    function update(role: Role) {
        navigation.navigate('roleForm', { role });
    }

    function remove(role: Role) {
        roleService.remove(role.id!).then(deleted => {
            if (deleted) fetchRoles();
        }).catch(error => console.error('Erro ao remover role:', error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfis de Acesso</Text>
            <Text style={styles.subtitle}>{roles.length} perfis cadastrados</Text>

            <View style={styles.listContainer}>
                <FlatList
                    data={roles}
                    keyExtractor={role => role.id!.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.description || ''}
                            onUpdate={() => update(item)}
                            onDelete={() => remove(item)}
                        />
                    )}
                />
            </View>
        </View>
    );
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
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        color: '#666',
    },
    listContainer: {
        width: '100%',
    },
});
