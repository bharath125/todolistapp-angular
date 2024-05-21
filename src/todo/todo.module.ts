import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodoRoutingModule } from "./todo-routing.module";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoComponent } from "./todo.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoListService } from "@shared/todo-services/todo-list.service";
import { EditTodoComponent } from "./edit-todo/edit-todo.component";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { InProgressComponent } from "./in-progress/in-progress.component";
import { CompletedComponent } from "./completed/completed.component";

@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
    EditTodoComponent,
    AddTodoComponent,
    InProgressComponent,
    CompletedComponent,
  ],
  imports: [CommonModule, TodoRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [TodoListService],
})
export class TodoModule {}
