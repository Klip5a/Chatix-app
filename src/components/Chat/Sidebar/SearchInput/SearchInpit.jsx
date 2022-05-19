import React, { useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import styles from '../Sidebar.module.scss';

const SearchInput = ({ setShow, setQuery }) => {
  const messagesData = [
    {
      id: 1,
      content: 'Здравствуйте, я столкнулся с проблемой ...',
      timestamp: '111',
      writtenBy: 'client'
    },
    {
      id: 2,
      content: 'Здравствуйте, Антон Антонович. Сейчас вам поможем',
      timestamp: 124,
      writtenBy: 'operator'
    },
    {
      id: 3,
      content: 'qqq',
      timestamp: 123,
      writtenBy: 'client'
    },
    {
      id: 4,
      content: 'hi',
      timestamp: 222,
      writtenBy: 'operator'
    },
    {
      id: 5,
      content: 'qwe',
      timestamp: 312,
      writtenBy: 'client'
    },
    {
      id: 6,
      content: 'www',
      timestamp: 321,
      writtenBy: 'operator'
    }
  ];

  const searchDialog = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;

    if (searchTerm !== '') {
      // console.log('searchTerm: ', searchTerm);
      const newContactList = Object.values(messagesData).filter((message) =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const debounceSearch = debounce(() => setQuery(newContactList), 500);
      debounceSearch();
      setShow(false); // dialog list hidden
    } else {
      setShow(true); // dialog list show
    }
  };

  return (
    <div className={styles['search-dialog']}>
      <input
        type="text"
        name="search"
        placeholder="Поиск диалога"
        onChange={searchDialog}
      />
    </div>
  );
};

SearchInput.propTypes = {
  setShow: PropTypes.func,
  setQuery: PropTypes.func
};

export default SearchInput;
