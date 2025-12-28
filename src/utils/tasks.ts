import type { Task } from "../types";

export const tasks: Task[] = [
  { 
    id: 1, 
    title: "Submit Final Project", 
    area:{
        name: 'School',
        color:'#EEB211',
    },
    description: "An introduction to building user interfaces with React and component-based architecture." ,
    todos:[
        {
          id: 1,
          item:'Write final Test',
          completed: false
        },
        {
          id: 2,
          item:'Push to GitHub',
          completed: false
        },
        {
          id: 3,
          item:'Submit on Canvas',
          completed: false
        },
    ],
    tags:[],
    dueDate: new Date("2025-12-31T18:00:00Z"),
    dateCreate: new Date("2025-12-23T18:00:00Z")
},
  { 
    id: 2, 
    title: "Getting Started with React", 
    area:{
        name: 'Tasks',
        color:'#007BFF',
    },
    description: "An introduction to building user interfaces with React and component-based architecture." ,
    todos:[],
    tags:[],
    dueDate: new Date("2025-12-30T18:00:00Z"),
    dateCreate: new Date("2025-12-21T18:00:00Z")
}

];
