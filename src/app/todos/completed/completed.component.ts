import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "@shared/models/tasks.model";
import { TodoListService } from "@shared/todo-services/todo-list.service";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.component.html",
  styleUrls: ["./completed.component.css"],
})
export class CompletedComponent implements OnInit {
  completedTasks: Todo[] = [];
  isLoading: boolean = true;

  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoListService.getTodoList().subscribe({
      next: (todos) => {
        this.completedTasks = todos.filter((each) => each.status === true);
        this.isLoading = false;
      },
    });
  }

  /*
    event handler to edit the task
  */
  onEditTask = (task: Todo) => {
    this.router.navigate([`todo-list/edit-task/${task.id}`]);
  };

  /*
    event handler for deleting the task
  */
  onDeleteTask = (id: number) => {
    this.todoListService.deleteTask(id);
  };

  onCheckboxTriggered(event: any) {
    const { checked, value } = event.target;
    console.log("value", value);
    console.log("checked", checked);
  }
}
