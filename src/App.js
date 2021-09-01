import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import TagList from './TagList'
import { v4 as uuidv4} from 'uuid'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { flexbox } from '@material-ui/system';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  marginApp: {
    marginLeft: 380,
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  marginCard: {
    margin: 30,
  },
});

function App() {
  const [todos, setTodos] = useState([])
  const [tags, setTags] = useState([])

  const todoNameRef = useRef()
  const tagNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todoName.todo'
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []
  )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))}, [todos]
  )

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function toggleTag(id) {
    const newTag = [...tags]
    const tag = newTag.find(tag => tag.id === id)
    tag.complete = !tag.complete
    setTags(newTag)
  }
  function handleAddTodo(e) {
      const name = todoNameRef.current.value
      const tags = []
      if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false, tags: tags}]
      })

      todoNameRef.current.value = null
      tags = []
  }

  function handleAddTag(e) {
    const name = tagNameRef.current.value
    if(name === '') return
    setTags(prevTags => {
      return [...prevTags, {id: uuidv4(), name: name, complete: false}]
    })

    tagNameRef.current.value = null
}

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  function handleTagDeletion() {
  }
  return (
    <>
    <Card className={classes.root}>
    <CardContent >
      <div className={classes.title}>
          Title
        <input className={classes.marginApp} ref = {todoNameRef} type="text" />
        </div>
        <div className={classes.title}>
          Tags
        <input placeholder="Ex) Grocery, School, ..." className={classes.marginApp} ref = {tagNameRef} type="text" />
        <button onClick = {handleAddTag}>Create New Todo</button>
        <TagList tags={tags} toggleTag={toggleTag}/>
        </div>
     </CardContent>

    </Card>
    <Card className={classes.root}>
    <CardContent>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref = {todoNameRef} type="text" />
    <button onClick = {handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </CardContent>
    </Card>
    </>
  )
}

export default App;
