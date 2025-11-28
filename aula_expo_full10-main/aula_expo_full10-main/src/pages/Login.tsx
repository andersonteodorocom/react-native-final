import React from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';

import * as service from '../services/auth.service';
import MyInput from '../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function App() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleLogin() {
        if (username === '') {
            Alert.alert('Login é requerido!');
            return;
        }

        service.login(username, password).then(success => {
            if (success) {
                navigation.navigate('home')
            } else {
                Alert.alert('Usuário/Senha inválido(a)!');
            }
        }).catch(error => {
            console.error('Erro ao efetuar login: ', error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página de Acesso</Text>

            <MyInput
                placeholder="Digite seu Login"
                label="Login" onChangeText={setUsername}
            />

            <MyInput
                placeholder="Digite sua Senha"
                label="Senha" onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button title="Entrar" onPress={handleLogin} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
})