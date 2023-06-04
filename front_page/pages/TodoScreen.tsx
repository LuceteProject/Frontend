import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard, TextInput, Button, FlatList, Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from '../components/Task';

const Stack = createNativeStackNavigator();

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

const Screen = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoAll, setNewTodoAll] = useState('');
  const [newTodoTeam, setNewTodoTeam] = useState('');
  const [newTodoPersonal, setNewTodoPersonal] = useState('');
  const [category, setCategory] = useState('전체');

  const handleAddTodo = () => {
    let newTodo = '';
    if (category === '전체') {
      newTodo = newTodoAll;
      setNewTodoAll('');
    } else if (category === '팀') {
      newTodo = newTodoTeam;
      setNewTodoTeam('');
    } else if (category === '개인') {
      newTodo = newTodoPersonal;
      setNewTodoPersonal('');
    }

    if (newTodo) {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        category: category,
      };
      setTodos([...todos, newTodoItem]);
    }
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.itemContainer}>
      <Text
        style={[
          styles.itemText,
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>
      <Switch value={item.completed} onValueChange={() => handleToggleTodo(item.id)} />
      <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
        <Icon name="close" size={15} color="red" />
      </TouchableOpacity>
    </View>
  );

  const Main = () => {
    return (
      <View style={{margin: 5}}>
        <Text>전체</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="전체 항목을 입력하세요"
            value={newTodoAll}
            onChangeText={text => setNewTodoAll(text)}
            onSubmitEditing={handleAddTodo}
          />
          <Button title="추가" onPress={() => { handleAddTodo(); setCategory('전체'); }} />
        </View>
        <View>

          <FlatList
            data={todos.filter((todo) => todo.category === '전체')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text>팀</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="팀 항목을 입력하세요"
            value={newTodoTeam}
            onChangeText={text => setNewTodoTeam(text)}
            onSubmitEditing={handleAddTodo}
          />
          <Button title="추가" onPress={() => { handleAddTodo(); setCategory('팀'); }} />
        </View>
        <View>

          <FlatList
            data={todos.filter((todo) => todo.category === '팀')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Text>개인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="개인 항목을 입력하세요"
            value={newTodoPersonal}
            onChangeText={text => setNewTodoPersonal(text)}
            onSubmitEditing={handleAddTodo}
          />
          <Button title="추가" onPress={() => { handleAddTodo(); setCategory('개인'); }} />
        </View>
        <View>

          <FlatList
            data={todos.filter((todo) => todo.category === '개인')}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert("pressed!")}>
              <Icon name="notifications" size={30} color="#000" />
            </TouchableOpacity>
          )
        }}
      >
        <Stack.Screen
          name="TodoListTab"
          component={Main}
          options={{
            title: '투두리스트',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 5
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    flex: 1,
    textDecorationLine: 'none',
    fontSize: 16,
    marginHorizontal: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
