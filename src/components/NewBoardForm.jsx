import {useState} from 'react';
import PropTypes from 'prop-types';
import "../styles/NewBoardForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faMinus as minusSign} from '@fortawesome/free-solid-svg-icons';
import { faMinus as minusSign, faPlus as plusSign } from '@fortawesome/free-solid-svg-icons';

const kDefaultFormState = {
    title:'',
    owner:'',
};

const kErrorState = {
    title:true,
    owner:true, 
};


const NewBoardForm = ({onPostBoard}) => {
    const[formData, setFormData] = useState(kDefaultFormState);
    const [errors, setErrors] = useState(kErrorState);
    const [formVisible, setFormVisible] = useState(true);

    const handleSubmit = (event) => {
        console.log('submitted!');

        event.preventDefault();
        
        const trimmedTitle = formData.title.trim();
        const trimmedOwner = formData.owner.trim();

        // trim the title and owner before posting
        console.log("Posting:", { title: trimmedTitle, owner: trimmedOwner });
        onPostBoard({ title: trimmedTitle, owner: trimmedOwner });

        setFormData(kDefaultFormState);
        setErrors(kErrorState);
    };

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setFormData(formData => {
            return {...formData, [inputName]: inputValue};
        });

        // Clear error if value becomes valid (non-empty after trimming)
        if (inputValue.trim()) {
            setErrors((prev) => ({
            ...prev,
            [inputName]: false,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [inputName]: true,
            }));
        }
    };

    const makeControlledInput = (inputName) => {
        return (
            <>
                <input
                    onChange={handleChange}
                    type='text'
                    id={`input-${inputName}`}
                    name={inputName}
                    value={formData[inputName]}
                    placeholder={inputName}
                />
                {/* {errors[inputName] && (
                    <p className="error-text">
                        {`${inputName.charAt(0).toUpperCase() + inputName.slice(1)} can not be empty`}
                    </p>
                )} */}

            </>
        );
    };

    return (
    <form className='board-form' onSubmit={handleSubmit}>
        <div className='form-header'>New Board
        {/* <div><FontAwesomeIcon icon={minusSign} /></div> */}
        <FontAwesomeIcon icon={formVisible ? minusSign : plusSign} onClick={() => setFormVisible(!formVisible)}/>
        </div>
        {formVisible && (
          <>
      <div className='form-field'>
        {makeControlledInput('title')}
      </div>
      <div className = 'form-field' >
        {makeControlledInput('owner')}
      </div>
      {(errors.title || errors.owner) && (
    <div className="form-errors">
      {errors.title && (
        <p className="error-text">Title cannot be empty</p>
      )}
      {errors.owner && (
        <p className="error-text">Owner cannot be empty</p>
      )}
    </div>
  )}
      <div className="button-wrapper">
        <button disabled={errors.title || errors.owner}>CREATE</button>
      </div>
      </>
    )}
    </form>
  );
}

NewBoardForm.propTypes = {
  onPostBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;