import Layout from '../components/layout'
import { TodoList } from '../components/todoList'

export const Home = (): JSX.Element => {
  return (
    <Layout home>
      <TodoList />
    </Layout>
  )
}

export default Home
