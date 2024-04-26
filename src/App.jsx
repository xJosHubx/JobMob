import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Router,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/pages/HomePage";
import JobsPage from "./components/pages/JobsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import JobPage, { jobLoader } from "./components/pages/JobPage";
import AddJobPage from "./components/pages/AddJobPage";
import EditJobPage from "./components/pages/EditJobPage";

const App = () => {
    // Add New Job
    const addJob = async (newJob) => {
        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newJob),
        });
        return;
    };

    //Delete Job
    const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: "DELETE",
        });
        return;
    };

    //Update Job
    const updateJob = async (job) => {
        const res = await fetch(`/api/jobs/${job.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        });
        return;
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route
                    path="/add-job"
                    element={<AddJobPage addJobSubmit={addJob} />}
                />
                <Route
                    path="/edit-job/:id"
                    element={<EditJobPage updateJobSubmit={updateJob} />}
                    loader={jobLoader}
                />
                <Route
                    path="/jobs/:id"
                    element={<JobPage deleteJob={deleteJob} />}
                    loader={jobLoader}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
};

export default App;
