import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/NewCardForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faMinus as minusSign} from '@fortawesome/free-solid-svg-icons';
import { faMinus as minusSign, faPlus as plusSign } from '@fortawesome/free-solid-svg-icons';

const kDefaultFormState = {
  message: '',
};

const kErrorState = {
  message: 'Message cannot be empty',
};


const NewCardForm = ({ onPostCard }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [errors, setErrors] = useState(kErrorState);

  const [formVisible, setFormVisible] = useState(true); 

  const handleSubmit = (event) => {
    console.log('submitted!');

    event.preventDefault();
    
    const trimmedMessage = formData.message.trim();

    // trim the title and owner before posting
    console.log("Posting:", { message: trimmedMessage});
    onPostCard({ message: trimmedMessage});

    setFormData(kDefaultFormState);
    setErrors(kErrorState);
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData(formData => {
        return {...formData, [inputName]: inputValue};
    });

    const trimmedLength = inputValue.trim().length;

    if (trimmedLength === 0) {
      setErrors((prev) => ({
        ...prev,
        [inputName]: 'Message cannot be empty',
      }));
    } else if (trimmedLength > 40) {

      setErrors((prev) => ({
        ...prev,
        [inputName]: 'Message cannot exceed 40 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [inputName]: null, // no error
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
      </>
    );
  };

    return (
      <form className='card-form' onSubmit={handleSubmit}>
        <div className='form-header'>
          New Card
          {/* <div><FontAwesomeIcon icon={minusSign} /></div> */}
          <div><FontAwesomeIcon icon={formVisible ? minusSign : plusSign} onClick={() => setFormVisible(!formVisible)}/></div>
        </div>

      {formVisible && (
        <>
          <div className='form-field'>
            {makeControlledInput('message')}
          </div>
          {errors.message && (
            <div className='form-errors'>
                <p className='error-text'>{errors.message}</p>
            </div>
          )}
          <div className="button-wrapper">
            <button disabled={errors.message}>CREATE</button>
          </div>
        </>
      )}
      </form>
  );
}

NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
};

export default NewCardForm;