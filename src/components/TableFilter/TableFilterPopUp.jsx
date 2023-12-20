import { useEffect, useState, useRef } from 'react';
import { IconContext } from 'react-icons';
import { CgSearch } from 'react-icons/cg';
import { RiCloseCircleFill } from 'react-icons/ri';

export const TableFilterPopUp = ({ data, onClose, onChangeValue, isSearch }) => {
  const [find, setFind] = useState('');
  const [displayData, setDisplayData] = useState(null);
  const inputElement = useRef();

  const isParentElementsHaveClass = (elem, targetClass) => {
    let parent = elem;
    while (true) {
      if (parent.classList.contains(targetClass)) return true;
      parent = parent.parentElement;
      if (!parent) break;
    }
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (inputElement.current) {
        inputElement.current.focus();
        clearInterval(interval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (!isParentElementsHaveClass(event.target, 'table_filter_pop_up')) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    // let input = document.querySelector('.table_filter_pop_up_find_input');
    // console.log(input);
    // input.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    console.log('data >>> ', data);
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    console.log(find);
    if (find.length > 0) {
      setDisplayData(data.filter(item => item.title.toLowerCase().includes(find.toLowerCase())));
    } else {
      setDisplayData(data);
    }
  }, [data, find]);

  useEffect(() => {
    console.log('inputElement >>> ', inputElement);
    if (inputElement.curren) inputElement.current.focus();
  }, []);

  const handleChangeFind = e => {
    setFind(e.target.value);
  };

  const handleClick = id => {
    console.log(id);
    onChangeValue(id);
    onClose();
  };

  return (
    <>
      {displayData && (
        <div className="table_filter_pop_up">
          {isSearch && (
            <div className="table_filter_pop_up_find_wrapper">
              <div className="table_filter_pop_up_find">
                <IconContext.Provider value={{ color: 'rgb(183, 189, 198)', size: '20px' }}>
                  <div className="table_filter_pop_up_find_logo">
                    <CgSearch />
                  </div>
                </IconContext.Provider>
                <input
                  type="text"
                  className="table_filter_pop_up_find_input"
                  onChange={handleChangeFind}
                  ref={inputElement}
                />
                <IconContext.Provider value={{ color: 'rgb(183, 189, 198)', size: '20px' }}>
                  <div className="table_filter_pop_up_find_logo" onClick={onClose}>
                    <RiCloseCircleFill />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          )}
          <ul className="table_filter_pop_up_list">
            {displayData.map(item => (
              <li key={item.id} className="table_filter_pop_up_list_item" onClick={() => handleClick(item.id)}>
                <div className="table_filter_pop_up_list_item_wrapper">{item.title}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
