
import React, { useEffect, useState } from 'react'
import { getAdminBoard } from '../services/user.service';
import eventBus from '../common/EventBus';

const BoardAdmin: React.FC = () => {

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if(error.response && error.response.status === 401 ) {
          eventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (

    <div className='container mt-5'>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <h3>{content}</h3>
        </div>
      </div>
    </div>
  )
}

export default BoardAdmin