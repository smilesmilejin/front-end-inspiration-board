import {useState} from 'react';

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

    const handleSubmit = (event) => {
        console.log('submitted!');

        event.preventDefault();
        
        const trimmedTitle = formData.title.trim();
        const trimmedOwner = formData.owner.trim();

        // trim the title and owner before posting
        console.log("Posting:", { title: trimmedTitle, owner: trimmedOwner });
        onPostBoard({ title: trimmedTitle, owner: trimmedOwner });

        // onPostBoard(formData);

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
                {errors[inputName] && (
                    <p className="error-text">
                        {/* {`${inputName} can not be empty`} */}
                        {`${inputName.charAt(0).toUpperCase() + inputName.slice(1)} can not be empty`}
                    </p>
                )}

            </>
        );
    };

    return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <label htmlFor='input-title'>Task Title: </label> */}
        {makeControlledInput('title')}
      </div>
      <div className = 'form-field'>
        {/* <label htmlFor='input-description'>Description (Optional): </label> */}
        {makeControlledInput('owner')}
      </div>
      <div className="button-wrapper">
        {/* <button disabled={!formData.title.trim() || !formData.owner.trim()}>Create</button> */}
        <button disabled={errors.title || errors.owner}>Create</button>
      </div>
    </form>
  );
}


export default NewBoardForm;