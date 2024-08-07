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
  }

  function handleDeleteTask() {}

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId);
  let content = (
    <SelectedProject 
      onDelete={ handleDeleteProject } 
      project={ selectedProject }
      onAddTask={ handleAddTask }
      onDeleteTask={ handleDeleteTask } />);

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={ handleAddProject } onCancel={ handleCancelAddProject } />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={ handleStartAddProject } />;
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={ handleStartAddProject }
        projects={ projectsState.projects }
        onSelectProject={ handleSelectProject }
      />
      { content }
    </main>
  )
}

export default App
