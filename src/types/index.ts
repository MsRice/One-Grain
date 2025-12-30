import type { User as FirebaseUser} from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export interface Task {
    id: string
    title: string
    area: Area
    description?: string
    todos?: Todo[]
    tags?: string[]
    dueDate?: Date
    dateCreate: Date
    status: boolean
}
export type NewTask = Omit<Task, 'id'>
export interface FirestoreTask {
    title: string
    area: Area
    description?: string
    todos: Todo[]
    tags?: string[]
    dueDate?: Timestamp | null
    dateCreate: Timestamp
    userId: string
    status: boolean
}

export interface Todo{
    id: string
    item: string
    completed: boolean
}
export interface Area{
    name: string
    color: string
}

export type ModalContextType = {
  isSidebarOpen: boolean;
  toggleSidebarModal: (isSidebarOpen: boolean) => void;
  isFormOpen: boolean;
  toggleFormModal: (isFormOpen: boolean) => void;
  
}

export interface ModalProviderProps {
    children: React.ReactNode
}

export interface Credentials {
    email: string,
    password: string,
}


export interface AuthContextType {
    user : FirebaseUser | null,
    login: (userData: Credentials) => Promise<void>,
    register: (userData: Credentials) => Promise<void>,
    logout: () => Promise<void>
}

export interface AuthenticationProviderProps {
  children: React.ReactNode
}
export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
    openTasks: Record<string , boolean>
    toggleTaskView: (taskId:string) => void
  
  
}

export interface ThemeProviderProps {
    children: React.ReactNode
}

export interface TaskUIProps {
    task: Task;
}

export type TasksContextType = {
    taskList: Task[] | null
    userAreas: Area[] | null
    deleteTask:(taskId:string) => void
    updateStatus:(taskId:string) => void
    addTask: (task: NewTask) => void
    addUserArea: (area: Area) => void
    addTodo : (taskId: string, text: string) => void
    toggleTodo : (taskId: string, todoId: string) => void
    deleteTodo : (taskId: string, todoId: string) => void
    editTodo : (taskId: string, todoId: string, text: string) => void
}

export interface TasksProviderProps {
    children: React.ReactNode
}