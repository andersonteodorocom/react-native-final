import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, View } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'

type Props = {
    onUpdate: () => void
    onDelete: () => void
}

export default function RightActions({ onUpdate, onDelete }: Props) {
    return (
        <View style={styles.container}>
            <BaseButton style={styles.updateButton} onPress={onUpdate}>
                <Ionicons name="pencil" size={24} color="white" />
            </BaseButton>
            
            <BaseButton style={styles.deleteButton} onPress={onDelete}>
                <Ionicons name="trash" size={24} color="white" />
            </BaseButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: "row",
    },
    updateButton: {
        height: '100%',
        paddingHorizontal: 15,
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    deleteButton: {
        height: '100%',
        paddingHorizontal: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
})