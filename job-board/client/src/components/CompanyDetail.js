import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompanyById } from '../graphql/queries';

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyById(companyId).then((company) => setCompany(company));
  }, [companyId]);

  if(!company) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;
