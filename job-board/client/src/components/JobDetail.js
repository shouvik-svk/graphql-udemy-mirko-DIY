import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useJob } from '../graphql/hooks';

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading } = useJob(jobId);

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
    </div>
  );
  }
}

export default JobDetail;
