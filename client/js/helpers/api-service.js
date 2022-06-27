const fetchTodos = async () => {
  const response = await fetch("http://localhost:1339/todos"); // GET
  const todos = await response.json();

  return todos;
};

const createTodo = async ({ title }) => {
  const response = await fetch("http://localhost:1339/todos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });

  const reponseData = await response.json();

  return reponseData;
};

const deleteDoto = async (id) => {
  await fetch(`http://localhost:1339/todos/${id}`, { method: "DELETE" });
};

const updateTodo = async ({ id, ...props }) => {
  const response = await fetch(`http://localhost:1339/todos/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const responseData = await response.json();

  return responseData;
};

const ApiService = {
  fetchTodos,
  createTodo,
  deleteDoto,
  updateTodo,
};

export default ApiService;
