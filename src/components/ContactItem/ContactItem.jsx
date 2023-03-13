import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteContactById } from 'redux/operations';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.listItem} key={id}>
      {name}: {number}
      <button
        type="button"
        className={css.btnContactRemove}
        onClick={() => dispatch(deleteContactById(id))}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
