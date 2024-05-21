import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from "./todo.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { InProgressComponent } from "./in-progress/in-progress.component";
import { CompletedComponent } from "./completed/completed.component";
import { EditTodoComponent } from "./edit-todo/edit-todo.component";

const routes: Routes = [
  {
    path: "",
    component: TodoComponent,
    children: [
      {
        path: "todo-list",
        component: TodoListComponent,
      },
      {
        path: "add-task",
        component: AddTodoComponent,
      },
      {
        path: "in-progress",
        component: InProgressComponent,
      },
      {
        path: "completed",
        component: CompletedComponent,
      },
      {
        path: "edit-task/:id",
        component: EditTodoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
