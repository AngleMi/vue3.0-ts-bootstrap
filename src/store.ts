import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsBycid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'zhimin' }
    }
  }
})

export default store
