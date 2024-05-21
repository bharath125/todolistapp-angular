import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "@shared/models/tasks.model";
import { TodoListService } from "@shared/todo-services/todo-list.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit {
  tasks: Todo[] = [];
  searchInputValue: string = "";
  value!: boolean;
  checkBoxValue!: boolean;
  isLoading: boolean = true;
  currentButtonId!: number;

  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.todoListService.todoList$.subscribe((newList) => {
    //   console.log('newList', newList);
    //   this.tasks = newList;
    // });

    this.todoListService.getTodoList().subscribe({
      next: (todoList: any) => {
        // this.todoListService.todoList$.next(todoList);
        this.tasks = todoList;
        this.isLoading = false;
      },
      error: (response) => {
        console.log("Error while fethcing Todolist", response);
        this.isLoading = false;
      },
    });
  }

  /*
    event handler to add the task
  */
  onAddTodo = () => {
    this.router.navigate(["todos/add-task"]);
    this.todoListService.getTodoList().subscribe({
      next: (eachTask: any) => {
        this.tasks = [eachTask, ...this.tasks];
        this.isLoading = false;
      },
    });
  };

  /*
    event handler to edit the task
  */
  onEditTask = (task: Todo) => {
    this.router.navigate([`todos/edit-task/${task.id}`]);
  };

  /*
    event handler for deleting the task
  */
  onDeleteTask = (id: number) => {
    this.currentButtonId = id;
    this.todoListService.deleteTask(id);
    this.tasks = this.tasks.filter((each) => each.id !== id);
  };

  /*   
    event handler for search button
  */
  onSearchTodo = (event: any) => {
    // console.log('this.searchInputValue', this.searchInputValue.toLowerCase());
    if (this.searchInputValue !== "") {
      this.tasks = this.tasks.filter((each) =>
        each.name?.toLowerCase().includes(this.searchInputValue.toLowerCase())
      );
    } else {
      this.todoListService.getTodoList().subscribe({
        next: (each) => {
          this.tasks = each;
          this.isLoading = false;
        },
      });
    }
  };

  onCheckboxTriggered(event: any, task: Todo) {
    const { checked } = event.target;
    let updatedStatus = {
      ...task,
      status: checked,
    };
    this.isLoading = true;
    this.todoListService.updateTodoTask(task.id, updatedStatus).subscribe({
      next: (updated: any) => {
        // console.log('updated', updated.result);
        let newTask = this.tasks.filter((each) => each.id !== task.id);
        this.tasks = [updated.result, ...newTask];
        this.isLoading = false;
      },
    });
  }

  onClearSearch() {
    this.searchInputValue = "";
    this.isLoading = true;
    this.todoListService.getTodoList().subscribe({
      next: (each) => {
        this.tasks = each;
        this.isLoading = false;
      },
    });
  }
}
