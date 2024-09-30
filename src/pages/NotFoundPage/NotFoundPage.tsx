import React from 'react';
import { Page } from '../../components/page/Page';
import classNames from 'classnames';

const NotFoundPage = () => {
  return (
    <Page noCard>
      <div className='text-center mt-5'>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist. :(</p>
      </div>
    </Page>
  );
};

export default NotFoundPage;