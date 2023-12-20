import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { CgSearch } from 'react-icons/cg';
import { RiCloseCircleFill } from 'react-icons/ri';
import { IoMdCheckbox } from 'react-icons/io';

export const TableFilterPopUpCheckBox = ({ onClose, onChangeValue, isOnlyMerchantAds }) => {
  useEffect(() => {
    console.log('TableFilterPopUpCheckBox');
  }, []);

  const handleCheck = e => {
    console.log('handleCheck ', e.target.checked);
    onChangeValue(e.target.checked);
  };

  const isParentElementsHaveClass = (elem, targetClass) => {
    let parent = elem;
    while (true) {
      if (parent.classList.contains(targetClass)) return true;
      parent = parent.parentElement;
      if (!parent) break;
    }
    return false;
  };

  // const onChange = e => {
  //   console.log()
  // }

  useEffect(() => {
    const handleClickOutside = event => {
      if (!isParentElementsHaveClass(event.target, 'table_filter_pop_up_checkbox')) onClose();
    };

    console.log('-- Mount TableFilterPopUp ---');
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // const [find, setFind] = useState('');
  // const [displayData, setDisplayData] = useState(null);

  // useEffect(() => {
  //   console.log('-- Mount TableFilterPopUp ---')
  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [])

  // const handleClickOutside = (event) => {
  //   console.log('handleClickOutside ', event);

  //   // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
  //   //   console.log('handleClick ', event.target);
  //   //   // this.props.onOutside();
  //   // }
  // }

  // useEffect(() => {
  //   console.log('data >>> ', data);
  //   setDisplayData(data);
  // }, [data]);

  // useEffect(() => {
  //   console.log(find);
  //   if (find.length > 0) {
  //     setDisplayData(data.filter(item => item.title.toLowerCase().includes(find.toLowerCase())));
  //   } else {
  //     setDisplayData(data);
  //   }
  // }, [data, find]);

  // const handleChangeFind = e => {
  //   setFind(e.target.value);
  // };

  // const handleClick = id => {
  //   console.log(id);
  //   onChangeValue(id);
  //   onClose();
  // };

  return (
    <div className="table_filter_pop_up_checkbox">
      <div className="table_filter_pop_up_checkbox_wrapper">
        <label className="table_filter_pop_up_checkbox_label">
          <div className="table_filter_pop_up_checkbox_element">
            <input
              type="checkbox"
              className="table_filter_pop_up_checkbox_cb visually-hidden"
              name="merchantCheck"
              onChange={handleCheck}
              checked={isOnlyMerchantAds}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              data-indeterminate="false"
              class="table_filter_pop_up_checkbox_label_logo"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.035 16.812l-.001.002 2.121 2.121.002-.002 2.121-2.12 9.19-9.192-2.12-2.121-9.191 9.19-3.536-3.534-2.121 2.12 3.535 3.536z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          Only show Merchant Ads
        </label>
      </div>
    </div>
  );
};

{
  /* <div className="table_filter_pop_up_checkbox_element">
            <IconContext.Provider value={{ color: 'rgb(240, 185, 11)', size: '15' }}>
               <div className="table_filter_pop_up_checkbox_element">
              <IoMdCheckbox />
               </div>
            </IconContext.Provider>
          </div> */
}
