import { useState } from 'react';

import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSidebar from './components/ProjectSidebar';

function App() {
  const [projectsState, setProjectsStates] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

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

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={ handleAddProject } />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={ handleStartAddProject } />;
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={ handleStartAddProject }
        projects={ projectsState.projects }
      />
      { content }
    </main>
  )
}

export default App
