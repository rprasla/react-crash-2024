import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./Layouts/MainLayout"
import JobPage from "./pages/JobPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPageOne, {jobLoader} from "./pages/JobPageOne"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"

//Add new job
const App = () => {
  const addJob = async(newJob) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/jobs`,{ 
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(newJob)
    });
    return
  }

  //Delete Job
  const deleteJob = async(id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${id}`,{ 
      method: 'DELETE',
    });
    return
  }

  const updateJob = async(job) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${job.id}`,{ 
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(job)
    });
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/jobs" element={<JobPage/>}></Route>
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}></Route>
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}></Route>
        <Route path="/jobs/:id" element={<JobPageOne deleteJob={deleteJob}/>} loader={jobLoader}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Route>
    )
  )
  return <RouterProvider router={router}></RouterProvider>
}

export default App
