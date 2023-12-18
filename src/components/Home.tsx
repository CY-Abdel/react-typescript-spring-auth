import React, { useEffect, useState } from 'react'

// importer le service userService methode all
import { getPublicContent } from '../services/user.service';

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPublicContent().then(
      (res) => {
        setContent(res.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <>
      <div className='container mt-5'>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container py-5">
            <h3>{content}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home