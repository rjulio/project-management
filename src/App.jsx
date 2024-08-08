import { useState } from 'react';

import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSidebar from './components/ProjectSidebar';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsStates] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleCancelAddProject() {
    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleStartAddProject() {
    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  function handleAddProject(projectData) {
    const newProject = { ...projectData, id: Math.random() };

    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [
          ...prevState.projects,
          newProject
        ]
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleDeleteProject() {
    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((proj) => proj.id !== prevState.selectedProjectId)
      };
    });
  }

  function handleAddTask(text) {
    setProjectsStates((prevState) => {
      const newTask = {
        text, 
        id: Math.random(),
        projectId: prevState.selectedProjectId
      };

      return {
        ...prevState,
        selectedProjectId: prevState.selectedProjectId,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsStates((prevState) => {
      return {
        ...prevState,
        selectedProjectId: prevState.selectedProjectId,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId);
  let content = (
    <SelectedProject 
      onDelete={ handleDeleteProject } 
      project={ selectedProject }
      onAddTask={ handleAddTask }
      onDeleteTask={ handleDeleteTask }
      tasks={ projectsState.tasks } />);

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={ handleAddProject } onCancel={ handleCancelAddProject } />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={ handleStartAddProject } />;
  } 

  return (
    <main className="h-screen py-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={ handleStartAddProject }
        projects={ projectsState.projects }
        onSelectProject={ handleSelectProject }
        selectedProjectId={ projectsState.selectedProjectId }
      />
      { content }
    </main>
  )
}

export default App
