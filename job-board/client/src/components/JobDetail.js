import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useJob } from '../graphql/hooks';
import { deleteJobById } from '../graphql/executeQueries';

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading } = useJob(jobId);

  const deleteJob = async (event) => {
    const job = await deleteJobById(jobId);
    console.log('Job Deleted: ', job);
  };

  if(loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <div>
        <h1 className="title">
          {job.title}
        </h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>
            {job.company.name}
          </Link>
        </h2>
        <div className="box">
          {job.description}
        </div>
        <div className="field">
          <div className="control">
            <Link className="button is-link" onClick={deleteJob} to="/">
              Delete Job
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default JobDetail;
