import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import MyInput from '../components/MyInput';
import * as roleService from '../services/role.service';
import { Role } from '../services/role.service';

export default function RoleFormPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();

    let role: Role | null = null;
    const params = route.params as { role?: Role };
    if (params && params.role) role = params.role;

    const [name, setName] = React.useState(role ? role.name : '');
    const [description, setDescription] = React.useState(role ? role.description || '' : '');

    React.useEffect(() => {
        navigation.setOptions({ 
            title: role ? 'Editar Perfil' : 'Novo Perfil' 
        });
    }, []);

    function save() {
        if (name.trim() === '') {
            alert('Nome do perfil é obrigatório!');
            return;
        }

        if (role) {
            const editRole: Role = { 
                id: role.id, 
                name: name.trim(), 
                description: description.trim() 
            };

            roleService.update(editRole).then(() => {
                navigation.goBack();
            }).catch(error => {
                console.error('Erro ao alterar perfil:', error);
                alert('Erro ao alterar perfil');
            });
        } else {
            const newRole: Role = { 
                name: name.trim(), 
                description: description.trim() 
            };

            roleService.create(newRole).then(() => {
                navigation.goBack();
            }).catch(error => {
                console.error('Erro ao criar perfil:', error);
                alert('Erro ao criar perfil');
            });
        }
    }

    return (
        <View style={styles.container}>
            <MyInput 
                label="Nome do Perfil" 
                value={name} 
                onChangeText={setName} 
            />
            <MyInput 
                label="Descrição" 
                value={description} 
                onChangeText={setDescription} 
                multiline
            />

            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={save} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
});
