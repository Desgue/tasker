
// Projects
const isProd = import.meta.env.PROD
const apiURL = isProd ?  'http://ttracker-api-production.up.railway.app' : 'http://localhost:8000'
const prodUrl = "https://ttracker-api-production.up.railway.app"
const devUrl = "http://localhost:8000"

export const getProjects = async(tokens) => {
	const url = prodUrl+'/projects'
	console.log(url)
	const response = await fetch(url, {
	  next: {
		revalidate: 60
	  },
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		"Authorization": `Bearer ${tokens.accessToken}`,
		"Authentication": `Bearer ${tokens.idToken}`,
		
	  }, 
	} )
	const data = await response.json()
	
	return data
  }

export const createProject = async (data, tokens) => {
    const url = prodUrl+"/projects"
	try{

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
			},
			body: JSON.stringify(data)
		})
		const result = await response.json()
		console.log("Created project")
		return result
	}
	catch{
		console.log('Error creating project')
		return null 
	}
  }

export const deleteProject = async (projectId, tokens) => {
    const url = prodUrl+'/projects/'+projectId
	try{

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
			},
		})
		if (response.ok ){
			console.log(`Project with id: ${id} has been deleted`)
        }
	}
	catch(e){
		console.log('Error deleting project')
		console.log(e)
				
	}
}

export const editProject = async (data, projectId, tokens) => {
	const url = prodUrl+'/projects/'+projectId
	try{
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
			},
			body: JSON.stringify(data)
		})
		try{
			const result = await response.json()
			console.log(result)
			return result
		}
		catch{
			console.log('Error parsing response')
			return null
	  }
	}
	catch{
		console.log('Error editing project')
	}
}
  


  // Tasks

const getTasks = async (projectId, tokens) => {
	const url = prodUrl+'/projects/'+projectId+'/tasks'
	const response = await fetch(url, {
	  next: {
		revalidate: 60
	  },
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		
	  }, 
	} )
	const data = await response.json()
	
	return data
  }


/* const createTask = async (data) => {
	const url = `http://localhost:8000/projects/${params.projectId}/tasks`
      const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        if (response.ok) {
            console.log('Task added successfully')
        }
}



const deleteTask = async () => {
	const url = `http://localhost:8000/projects/${params.projectId}/tasks/${task.id}`
	const response = await fetch(url, {
	  method: 'DELETE',
	  headers: {
		'Content-Type': 'application/json'
	  }
	})
	console.log(response)
	router.push(`/projects/${params.projectId}/tasks`)
	router.refresh()
	setShowDeletePopup(false)
  }

const updateTask = fetch(`http://localhost:8000/projects/${params.projectId}/tasks/${task.id}`, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
}).catch(err => console.log(err))
 */
