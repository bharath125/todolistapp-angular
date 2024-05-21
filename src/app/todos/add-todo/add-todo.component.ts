import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Todo } from "@shared/models/tasks.model";
import { TodoListService } from "@shared/todo-services/todo-list.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {}

  tasksList!: Todo[];

  ngOnInit(): void {
    this.todoListService.todoList$.subscribe((newList) => {
      this.tasksList = newList;
    });
  }

  addTaskForm = new FormGroup({
    taskname: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(25),
    ]),
  });

  onAddTask = () => {
    if (!this.addTaskForm.valid) {
      // console.log(this.addTaskForm.value);
      let newTodo = {
        name: this.addTaskForm.value.taskname,
        description: this.addTaskForm.value.description,
        status: false,
        id: 0,
      };
      this.todoListService.createTodoTask(newTodo).subscribe({
        next: (data: any) => {
          // console.log('todoTask', data.result);
          this.todoListService.todoList$.next([...this.tasksList, data.result]);
          console.log("add-todo", this.tasksList);
        },
      });
      this.addTaskForm.reset();
      this.router.navigate([""]);
    } else {
      window.alert("The Form is not Valid. Please try again!");
    }
  };
}
