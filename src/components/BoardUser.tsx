
import React, { useEffect, useState } from 'react';

import { getUserBoard } from '../services/user.service';
import EventBus from '../common/EventBus';

const BoardUser: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getUserBoard().then(
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

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
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

export default BoardUser