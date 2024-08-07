import Button from './Button';

export default function ProjectSidebar({ 
	onStartAddProject, 
	onSelectProject, 
	projects,
	selectedProjectId
}) {

	function renderButton(project) {
		let cssClasses = `
			w-full px-2 py-1 my-1
			text-left hover:text-stone-200
			rounded-sm hover:bg-stone-800
		`;
		if (project.id === selectedProjectId) {
			cssClasses += ' bg-stone-800 text-stone-200';
		} else {
			cssClasses += ' text-stone-400';
		}

		return (
			<button 
				className={ cssClasses }
				onClick={ () => onSelectProject(project.id) }>
				{ project.title }
			</button>
		)
	}

	return (
		<aside className={`
			w-1/3 md:w-72 px-8 py-16 
			bg-stone-900 text-stone-50 
			rounded-r-xl
		`}>
			<h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
				Your projects
			</h2>
			<div>
				<Button onClick={ onStartAddProject }>
					+ Add Project
				</Button>
			</div>
			<ul className="mt-8">
				{ projects?.map((proj) => {
					return (
						<li key={ proj.id }>
							{ renderButton(proj) }
						</li>
					)
				}) }
			</ul>
		</aside>
	);
}