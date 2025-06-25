import {useState} from 'react';

const kDefaultFormState = {
    message:'',
};

// const kErrorState = {
//     message:true,
// };

const kErrorState = {
    message:'Message cannot be empty',
};


const NewCardForm = ({onPostCard}) => {
    const[formData, setFormData] = useState(kDefaultFormState);
    const [errors, setErrors] = useState(kErrorState);

    const handleSubmit = (event) => {
        console.log('submitted!');

        event.preventDefault();
        
        const trimmedMessage = formData.message.trim();

        // trim the title and owner before posting
        console.log("Posting:", { message: trimmedMessage});
        onPostCard({ message: trimmedMessage});

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
        // if 1 <= 1 length <= 40, error = false
        const trimmedLength = inputValue.trim().length;

        // if (trimmedLength >= 1 && trimmedLength <= 40) {
        //     setErrors((prev) => ({
        //         ...prev,
        //         [inputName]: false,  // no error
        //     }));
        // // } else if (trimmedLength < 1 || trimmedLength > 40) {
        // } else {
        //     setErrors((prev) => ({
        //         ...prev,
        //         [inputName]: true,  // error present
        //     }));
        // };


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
                {/* {errors[inputName] && (
                    <p className="error-text">
                        {`${inputName} can not be empty or more than 40 characters `}
                        // {`${inputName.charAt(0).toUpperCase() + inputName.slice(1)} is required`}
                    </p>
                )} */}

                {errors[inputName] && (
                    <p>{errors[inputName]}</p>
                )}

            </>
        );
    };

    return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <label htmlFor='input-title'>Task Title: </label> */}
        {makeControlledInput('message')}
      </div>
      <div className="button-wrapper">
        {/* <button disabled={!formData.message.trim() || errors.message}>Create</button> */}
        {/* <button disabled={errors.message}>Create</button> */}
        {/* <button disabled={!formData.message.trim()}>Create</button> */}

        <button disabled={errors.message}>Create</button>
      </div>
    </form>
  );
}


export default NewCardForm;