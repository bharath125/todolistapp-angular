import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  // { path: "", redirectTo: "/todos/todo-list", pathMatch: "full" },
  { path: "", redirectTo: "/app/todos", pathMatch: "full" },
  {
    path: "account",
    loadChildren: () =>
      import("account/account.module").then((m) => m.AccountModule), // Lazy load account module
    data: { preload: true },
  },
  {
    path: "todos",
    loadChildren: () => import("todo/todo.module").then((m) => m.TodoModule),
    data: { preload: true },
  },
  {
    path: "app",
    loadChildren: () => import("app/app.module").then((m) => m.AppModule), // Lazy load account module
    data: { preload: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RootRoutingModule {}
