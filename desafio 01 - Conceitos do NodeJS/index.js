const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let requestCount = 0;

/*MIDDLEWARES*/

//Verifica se projeto Não Existe
function checkProjectNotExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(data => data.id == id);

  if (!project) {
    return res
      .status(400)
      .json({ error: "Oopss, este projeto não foi encontrado!" });
  }

  return next();
}

//Verifica se projeto Existe
function checkProjectExists(req, res, next) {
  const { id } = req.body;
  const project = projects.find(data => data.id == id);

  if (project) {
    return res.status(400).json({ error: `Projeto ${id} já existente.` });
  }

  return next();
}

//Mostra o número de erquisições
function logOfRequests(req, res, next) {
  requestCount++;

  console.log(`Requisições: ${requestCount}; Método: ${req.method}`);

  return next();
}

server.use(logOfRequests);

//Rotas
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", checkProjectExists, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectNotExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(data => data.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectNotExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(data => data.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectNotExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(data => data.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
