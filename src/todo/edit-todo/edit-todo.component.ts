import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "@shared/models/tasks.model";
import { TodoListService } from "@shared/todo-services/todo-list.service";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.component.html",
  styleUrls: ["./edit-todo.component.css"],
})
export class EditTodoComponent implements OnInit {
  newTodoTask!: Todo;
  tasksList!: Todo[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoListService: TodoListService,
    private router: Router
  ) {}

  editTaskForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(10)]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(25),
    ]),
    status: new FormControl(),
  });

  ngOnInit(): void {
    let paramsId: number;

    this.todoListService.todoList$.subscribe((newList) => {
      this.tasksList = newList;
    });

    this.activatedRoute.params.subscribe((params) => {
      paramsId = params["id"];
      if (paramsId) {
        this.todoListService.getOneTodo(paramsId).subscribe({
          next: (todoTask) => {
            this.newTodoTask = todoTask;
            if (todoTask) {
              this.editTaskForm.patchValue(todoTask);
            }
          },
        });
      }
    });

    if (this.newTodoTask) {
      this.editTaskForm.patchValue(this.newTodoTask);
    }

    // this.todoListService.getTodoList().subscribe({
    //   next: (todoList) => {
    //     let todo = todoList.find((each) => each.id === paramsId);
    //     if (todo) {
    //       this.editTaskForm.patchValue(todo);
    //     }
    //   },
    // });
  }

  onUpdateTask = () => {
    if (!this.editTaskForm.valid) {
      let updatedTask = {
        ...this.editTaskForm.value,
        id: this.newTodoTask.id,
      };
      this.todoListService
        .updateTodoTask(this.newTodoTask.id, updatedTask)
        .subscribe({
          next: (updatedTask: any) => {
            // console.log('edit component', updatedTask);
            let updatedTaskList = this.tasksList.filter(
              (each) => each.id !== this.newTodoTask.id
            );
            this.todoListService.todoList$.next([
              updatedTask.result,
              ...updatedTaskList,
            ]);
          },
        });
      this.router.navigate([""]);
    }
  };
}
