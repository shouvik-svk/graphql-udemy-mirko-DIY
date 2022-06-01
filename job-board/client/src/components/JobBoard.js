import JobList from './JobList';
import { getAllJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllJobs()
      .then((jobs) => setJobs(jobs))
      .catch((error) => setError(true));
  }, []);

  if(error) {
    return (
      <div>
        <h1 className='title'>
          An error occurred
        </h1>
      </div>
    )
  }
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
