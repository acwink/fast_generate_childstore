## acwink: 通过使用子模块State类型创建模块

此模块能够把对应的state中的字段，修改时的mutation方法创建出来。所以，此模块可用用来减少我们写 mutation 相关的常用函数。

### 安装

~~~npm
npm install fast_generate_childstore
~~~



### 使用

命令

~~~js
fastGCS createStore <types-path> <type-name> <save-path> <save-name>
~~~



当我们有如下类型的State子模块时

~~~tsx
// path ./types.ts
interface UserStore {
    username: string;
    age: number;
    phone: string;
    friends: string[];
    obj: any;
}
~~~

执行如下命令过后，我们会在 ./ 目录下 生成 UserStore.ts 文件。

~~~js
fastGCS createStore ./types.ts UserStore ./ UserStore
~~~



生成的内容如下

~~~js
// UserStore.ts
import { IRootState } from '@/store/types';
import { Module } from 'vuex';
import { UserStore } from './types.ts';

const UserStoreModule: Module<UserStore, IRootState> = {
  namespaced: true,
  state() {
    return {
      username:"",
      age:0,
      phone:"",
      friends:[],
      obj:null,

    };
  },
  mutations: {
    updatesername (state, username:string) {
      state.username = username;
    },
    updatege (state, age:number) {
      state.age = age;
    },
    updatehone (state, phone:string) {
      state.phone = phone;
    },
    updateriends (state, friends:string[]) {
      state.friends = friends;
    },
    updatebj (state, obj:any) {
      state.obj = obj;
    },

  },
  getters: {

  },
  actions: {
   
  }
};

export default UserStoreModule;

~~~

