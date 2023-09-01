import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard, TextInput, Button, FlatList, Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchData } from '../utils/APIs';
import Task from '../components/Task';
import { Todo, TodoCategory } from "../types";
const Stack = createNativeStackNavigator();


const Screen = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoAll, setNewTodoAll] = useState('');
  const [newTodoTeam, setNewTodoTeam] = useState('');
  const [newTodoPersonal, setNewTodoPersonal] = useState('');
  const [category, setCategory] = useState('All');
  const [checked, setChecked] = useState(false);
  /* API variables */
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchTodoData = async () => {
      const userInfoJson = JSON.parse(await EncryptedStorage.getItem('user-info') || 'null');
      const userId = userInfoJson.user_id; //바꿔야함
      const response = await fetchData(`api/v1/todos/userID/${userId}`); //확인 필요
      setTodos(response);
      //console.log(response);
    };
    fetchTodoData();
    setLoading(false);
  }, []);
  const handleAddTodo = () => {
    let newTodo = '';
    if (category === 'All') {
      newTodo = newTodoAll;
      setNewTodoAll('');
    } else if (category === 'Team') {
      newTodo = newTodoTeam;
      setNewTodoTeam('');
    } else if (category === 'Personal') {
      newTodo = newTodoPersonal;
      setNewTodoPersonal('');
    }

    if (newTodo) {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        content: newTodo,
        completed: false,
        team_code: 0,
        user_id: 0
      };
      setTodos([...todos, newTodoItem]);
    }
  };

  const Checked = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, check: !todo.completed } : todo);
    setTodos(updatedTodos);
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

  /* Item 항목들 All, Team, Personal 인 경우에 따라 컴포넌트화 해서 파라미터로 구현하려고 함 (리팩토링) */
  const AllItem = ({ item }: { item: Todo }) => (
    <View>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            item.completed && styles.completedText,
          ]}
        >
          {item.content}
        </Text>

        <TouchableOpacity onPress={() => Checked(item.id)}>
          <View style={[styles.checkbox, item.completed && styles.checkedCheckbox_1]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Icon name="close" size={25} color="red" />
        </TouchableOpacity>

      </View>
      <View
        style={{
          borderBottomColor: '#B77DE4',
          borderBottomWidth: 1,
        }}
      />
    </View>

  );
  const TeamItem = ({ item }: { item: Todo }) => (
    <View>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            item.completed && styles.completedText,
          ]}
        >
          {item.content}
        </Text>

        <TouchableOpacity onPress={() => Checked(item.id)}>
          <View style={[styles.checkbox, item.completed && styles.checkedCheckbox_2]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Icon name="close" size={25} color="red" />
        </TouchableOpacity>

      </View>
      <View
        style={{
          borderBottomColor: '#CBD773',
          borderBottomWidth: 1,
        }}
      />
    </View>

  );
  const PersonalItem = ({ item }: { item: Todo }) => (
    <View>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            item.completed && styles.completedText,
          ]}
        >
          {item.content}
        </Text>

        <TouchableOpacity onPress={() => Checked(item.id)}>
          <View style={[styles.checkbox, item.completed && styles.checkedCheckbox_3]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Icon name="close" size={25} color="red" />
        </TouchableOpacity>

      </View>
      <View
        style={{
          borderBottomColor: '#CA6D68',
          borderBottomWidth: 1,
        }}
      />
    </View>

  );

  const Main = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ marginLeft: 10 }}>
          <View style={{ margin: 10 }}>
            <View style={{ height: 15 }}></View>
            {/* 전체 투두리스트 */}
            <View style={{ backgroundColor: '#B77DE4', borderRadius: 50, marginRight: 250, alignItems: 'center', marginBottom: 5, marginTop: 15 }}>
              <Text style={{ fontSize: 22, color: '#fff' }}>전체</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="전체 항목을 입력하세요"
                value={newTodoAll}
                onChangeText={text => setNewTodoAll(text)}
                onSubmitEditing={handleAddTodo}
              />

              <TouchableOpacity onPress={() => { setCategory('All'); handleAddTodo();  }}>
                <Icon name="add-circle" size={45} color="#B77DE4"
                //style={styles.floatingButtonStyle}
                />
              </TouchableOpacity>

            </View>
            <View>

              <FlatList
                data={todos ? todos.filter(todo => todo.team_code === 10) : []}
                renderItem={AllItem}
                keyExtractor={(item) => item.id}
              />
            </View>

            {/* 전체 투두리스트 */}
            <View style={{ backgroundColor: '#CBD773', borderRadius: 50, marginRight: 250, alignItems: 'center', marginBottom: 5, marginTop: 15 }}>
              <Text style={{ fontSize: 22, color: '#fff' }}>팀</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="팀 항목을 입력하세요"
                value={newTodoTeam}
                onChangeText={text => setNewTodoTeam(text)}
                onSubmitEditing={handleAddTodo}
              />
              <TouchableOpacity onPress={() => { handleAddTodo(); setCategory('Team'); }}>
                <Icon name="add-circle" size={45} color="#CBD773"
                //style={styles.floatingButtonStyle}
                />
              </TouchableOpacity>
            </View>
            <View>

              <FlatList
                data={todos ? todos.filter((todo) => todo.team_code === 1) : []}
                renderItem={TeamItem}
                keyExtractor={(item) => item.id}
              />
            </View>

            {/* 전체 투두리스트 */}
            <View style={{ backgroundColor: '#CA6D68', borderRadius: 50, marginRight: 250, alignItems: 'center', marginBottom: 5, marginTop: 15 }}>
              <Text style={{ fontSize: 22, color: '#fff' }}>개인</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="개인 항목을 입력하세요"
                value={newTodoPersonal}
                onChangeText={text => setNewTodoPersonal(text)}
                onSubmitEditing={handleAddTodo}
              />
              <TouchableOpacity onPress={() => { handleAddTodo(); setCategory('Personal'); }}>
                <Icon name="add-circle" size={45} color="#CA6D68"
                //style={styles.floatingButtonStyle}
                />
              </TouchableOpacity>
            </View>
            <View>

              <FlatList
                data={todos ? todos.filter((todo) => todo.team_code === 11) : []}
                renderItem={PersonalItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity
              // Notification icon - components 분리할 수 있으면 뺴기
              onPress={() => {
                navigation.push('Notification');
              }}>
              <Icon
                name="notifications"
                size={30}
                color="#000"
                style={{
                  // 둥근 원 테두리, 근데 배경 없으면 필요없을듯?
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}
              />
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
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  itemText: {
    flex: 1,
    textDecorationLine: 'none',
    marginVertical: 3,
    fontSize: 22,
    marginHorizontal: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  checkedCheckbox_1: {
    backgroundColor: '#BB7DE4',
    borderColor: '#BB7DE4',
  },
  checkedCheckbox_2: {
    backgroundColor: '#CBD773',
    borderColor: '#CBD773',
  },
  checkedCheckbox_3: {
    backgroundColor: '#CA6D68',
    borderColor: '#CA6D68',
  },

});
