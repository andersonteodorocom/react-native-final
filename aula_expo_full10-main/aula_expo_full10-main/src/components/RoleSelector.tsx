import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

interface RoleSelectorProps {
    availableRoles: Array<{ id: number; name: string; description?: string }>;
    selectedRoles: string[];
    onRolesChange: (roles: string[]) => void;
}

export default function RoleSelector({ availableRoles, selectedRoles, onRolesChange }: RoleSelectorProps) {
    
    function toggleRole(roleName: string) {
        if (selectedRoles.includes(roleName)) {
            onRolesChange(selectedRoles.filter(r => r !== roleName));
        } else {
            onRolesChange([...selectedRoles, roleName]);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Perfis de Acesso</Text>
            <ScrollView style={styles.scrollContainer}>
                {availableRoles.map(role => {
                    const isSelected = selectedRoles.includes(role.name);
                    return (
                        <TouchableOpacity
                            key={role.id}
                            style={[styles.roleItem, isSelected && styles.roleItemSelected]}
                            onPress={() => toggleRole(role.name)}
                        >
                            <View style={styles.checkbox}>
                                {isSelected && <View style={styles.checkboxChecked} />}
                            </View>
                            <View style={styles.roleTextContainer}>
                                <Text style={styles.roleName}>{role.name}</Text>
                                {role.description && (
                                    <Text style={styles.roleDescription}>{role.description}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginVertical: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '500',
    },
    scrollContainer: {
        maxHeight: 200,
    },
    roleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    roleItemSelected: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196F3',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#2196F3',
        borderRadius: 3,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: '#2196F3',
        borderRadius: 2,
    },
    roleTextContainer: {
        flex: 1,
    },
    roleName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    roleDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});
