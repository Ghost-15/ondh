import {View, Text, TextInput, StyleSheet, ImageBackground, Pressable, FlatList} from 'react-native';
import icon from "../assets/images/icon.png"
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const app = () => {
    const [todos, setTodos] = useState(MENU_ITEMS.sort((a,b) => b.id - a.id));
    const [text, setText] = useState('')

    const addTodo = () => {
        if (text.trim()){
            const newId = text.length > 0 ? todos[0].id + 1 : 1;
            setTodos([{id: newId, title: text, complete: false}, ...todos])
            setText('')
        }
    }
    const toggleTodo = (id) => {
        setTodos(todos.map(
            todo => todo.id === id ? { ...todo, complete: !todo.complete } : todo
        ))
    }
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const renderItem = ({ item }) => (
        <View style={styles.todoItem}>
            <Text
                style={[styles.todoText, item.complete && styles.completeText]}
                onPress={ () => toggleTodo(item.id) }>
                {item.title}
            </Text>
            <Pressable onPress={ () => removeTodo(item.id)}>
                <MaterialCommunityIcons name="delete-circle" size={36} color="red" />
            </Pressable>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="add new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={addTodo} style={styles.addButtom}>
                    <Text style={styles.addButtomText}>Add</Text>
                </Pressable>
            </View>

            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={todos => todos.id}
                contentContainerStyle={{ flexGrow: 1 }}/>
        </SafeAreaView>
    );
}

export default app;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
        // flexDirection: "column",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        width: '100%',
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        minWidth: 0,
        color: 'white',
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
    },
    completeText: {
        textDecorationLine: "underline",
        color: 'gray',
    },
    addButtom: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    addButtomText: {
        fontSize: 18,
        color: 'black',
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 120
    },
    link: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 4
    },
    button: {
      height: 60,
      width: 150,
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.75)',
      padding: 6,
      marginBottom: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4
    }
})


//     <View style={styles.container}>
//     <ImageBackground
// source={icon}
// resizeMode="cover"
// style={styles.image}
//     >
//     <Text style={styles.title}>App</Text>
//
// <Link href="/app/contact" style={{ marginHorizontal: 'auto'}} asChild>
//     <Pressable style={styles.button}>
//         <Text style={styles.buttonText}>Contact</Text>
//     </Pressable>
// </Link>
// <Link href="/app/menu.jsx" style={{ marginHorizontal: 'auto'}} asChild>
//     <Pressable style={styles.button}>
//         <Text style={styles.buttonText}>Menu</Text>
//     </Pressable>
// </Link>
//
// </ImageBackground>
// </View>