import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "@shared/models/tasks.model";
import { TodoListService } from "@shared/todo-services/todo-list.service";

@Component({
  selector: "app-in-progress",
  templateUrl: "./in-progress.component.html",
  styleUrls: ["./in-progress.component.css"],
})
export class InProgressComponent implements OnInit {
  inProgressTasks: Todo[] = [];
  isLoading: boolean = true;

  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoListService.getTodoList().subscribe({
      next: (todos) => {
        this.inProgressTasks = todos.filter((each) => each.status === false);
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
    // this.checkboxForm.patchValue({ status: event.target.checked });
  }
}
