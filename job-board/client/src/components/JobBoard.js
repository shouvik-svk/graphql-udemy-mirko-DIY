import JobList from './JobList';
import { useJobs } from '../graphql/hooks';

function JobBoard() {
  const { jobs, loading, error}  = useJobs();

  if(loading) {
    return (
      <div>
        <h1 className='title'>
          Loading...
        </h1>
      </div>
    )
  }

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
