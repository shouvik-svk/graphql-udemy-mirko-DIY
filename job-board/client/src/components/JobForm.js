import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAccessToken } from '../auth';
import { MUTATION_CREATE_JOB } from '../graphql/mutations';
import { QUERY_GET_JOB_BY_ID } from '../graphql/queries';

function JobForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mutate] = useMutation(MUTATION_CREATE_JOB);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: { job }} = await mutate({
      variables: { createJobInput: { title, description}},
      context: {
        headers: { 'Authorization': `Bearer ${getAccessToken()}`}
      },
      update: (cache, { data: { job }}) => {
        cache.writeQuery({
          query: QUERY_GET_JOB_BY_ID,
          variables: { id: job.id },
          data: { job }
        })
      }
    })
    console.log('Job Created: ', job);
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
