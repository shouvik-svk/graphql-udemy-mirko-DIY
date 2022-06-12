import JobList from './JobList';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ALL_JOBS } from '../graphql/queries';

function JobBoard() {
  const { data, loading, error}  = useQuery(QUERY_GET_ALL_JOBS, {
    fetchPolicy: 'network-only'
  });

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

  const { jobs } = data;
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
