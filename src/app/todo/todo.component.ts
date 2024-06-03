import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import axios from 'axios';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {



  getUserData(id: string) {
    return axios.get(`https://finalexam-p1tj.onrender.com/todo/${id}`);

  }



  
  itemName = new FormControl('', Validators.required);
  todoList: any[] = [];

  async pushItemToList(){
    const itemName = this.itemName.value;
    console.log(itemName);
    try {
      const response = await axios.post('https://finalexam-p1tj.onrender.com/todo', { itemName });


      this.itemName.reset();
      this.todoList.push(response.data); 
      console.log(response.data);
    } catch(error) {
      console.log('Error', error);
    }
  }


  async loadTodoList(id: string) {
    try {
      
      const response = await axios.get(`https://finalexam-p1tj.onrender.com/${id}`);
      this.todoList = response.data;
      
    } catch(error) {
      console.log('Error loading todo list:', error);
    }
  }
 

  async updateItem(item: any) {
    const updatedItemName = prompt('Enter the updated item name:', item.itemName);
    if (!updatedItemName) return; 
  
    try {
      const response = await axios.put(`https://finalexam-p1tj.onrender.com/update/${item.id}`, { itemName: updatedItemName });
      const updatedItemIndex = this.todoList.findIndex(todo => todo.id === item.id);
      if (updatedItemIndex !== -1) {
        this.todoList[updatedItemIndex].itemName = response.data.itemName; 
      }
    } catch(error) {
      console.log('Error updating item:', error);
    }
  }
  async deleteItem(itemId: any) { 
    try {
      await axios.delete(`https://finalexam-p1tj.onrender.com/todo/${itemId}`);
      // After successful deletion, remove the item from todoList
      this.todoList = this.todoList.filter(item => item.id !== itemId);
    } catch(error) {
      console.log('Error deleting item:', error);
    }
  }
}
