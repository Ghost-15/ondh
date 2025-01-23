import {View, Text, TextInput, StyleSheet, ImageBackground, Pressable, FlatList} from 'react-native';
import icon from "../assets/images/icon.png"
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/themeContext";
import { data } from "@/constants/Data";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {Octicons} from "@expo/vector-icons";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const app = () => {
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('')
    const [loaded, error] = useFonts({Inter_500Medium})
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const  jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null
                if(storageTodos && storageTodos.length) {
                    setTodos(storageTodos.sort((a,b) => b.id - a.id))
                } else  {
                    setTodos(data.sort((a,b) => b.id - a.id))
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const storeData = async () => {
            try {
                const  jsonValue = JSON.stringify(todos)
                await AsyncStorage.setItem("TodoApp", jsonValue)
            } catch (e) {
                console.error(e)
            }
        }
        storeData()
    }, [todos])

    if(!loaded && !error){
        return null
    }

    const styles = createStyles(theme, colorScheme)

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
    const handlePress = (id) => {
        router.push('/todos/'+id)
    }
    const renderItem = ({ item }) => (
        <View style={styles.todoItem}>
            <Pressable
                onPress={ () => handlePress(item.id) }
                onLongPress={ () => toggleTodo(item.id) }>
                <Text
                    style={[styles.todoText, item.complete && styles.completeText]}>
                    {item.title}
                </Text>
            </Pressable>
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
                    // maxLength={30}
                    placeholder="add new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={addTodo} style={styles.addButtom}>
                    <Text style={styles.addButtomText}>Add</Text>
                </Pressable>
                <Pressable onPress={ () => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                style={{ marginLeft: 10 }}>
                    {
                        colorScheme === 'dark'
                        ? <Octicons name="moon" size={36} color={theme.text}
                        selectable={undefined} style={{ width: 36 }} />
                        : <Octicons name="sun" size={36} color={theme.text}
                        selectable={undefined} style={{ width: 36 }} />
                    }
                </Pressable>
            </View>

            <Animated.FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={todos => todos.id}
                contentContainerStyle={{ flexGrow: 1 }}
                itemLayoutAnimation={LinearTransition}
                keyboardDismissMode="on-drag"
            />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'}/>
        </SafeAreaView>
    );
}

export default app;

function createStyles(theme, colorScheme) {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background
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
            fontFamily: 'Inter_500Medium',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            minWidth: 0,
            color: theme.text,
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
            color: theme.text,
        },
        completeText: {
            textDecorationLine: "line-through",
            color: 'gray',
        },
        addButtom: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        addButtomText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
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
}


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